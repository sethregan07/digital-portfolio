import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import { compile } from '@mdx-js/mdx'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

// Helper function to calculate reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Helper function to extract headings
function extractHeadings(text: string) {
  const slugger = new GithubSlugger()
  const regXHeader = /\n\n(#{1,6})\s+(.+)/g
  const headings = Array.from(text.matchAll(regXHeader)).map((match) => {
    const flag = match[1]
    const content = match[2]
    return {
      heading: flag?.length,
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    }
  })
  return headings
}

// Helper function to parse MDX into structured blocks
function parseMDXToBlocks(content: string): any[] {
  const lines = content.split('\n')
  const blocks: any[] = []
  let currentParagraph = ''
  let inList = false
  let listItems: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Headings
    if (line.startsWith('#')) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph.trim() })
        currentParagraph = ''
      }
      if (inList) {
        blocks.push({ type: 'list', items: listItems })
        listItems = []
        inList = false
      }

      const level = line.match(/^#+/)?.[0].length || 1
      const headingContent = line.replace(/^#+\s*/, '')
      blocks.push({ type: 'heading', level, content: headingContent })
      continue
    }

    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph.trim() })
        currentParagraph = ''
      }
      if (!inList) {
        inList = true
        listItems = []
      }
      listItems.push(line.replace(/^[-*]\s*/, ''))
      continue
    }

    // Empty line - end current paragraph or list
    if (line === '') {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph.trim() })
        currentParagraph = ''
      }
      if (inList) {
        blocks.push({ type: 'list', items: listItems })
        listItems = []
        inList = false
      }
      continue
    }

    // Regular paragraph
    if (currentParagraph) {
      currentParagraph += ' ' + line
    } else {
      currentParagraph = line
    }
  }

  // Clean up remaining content
  if (currentParagraph) {
    blocks.push({ type: 'paragraph', content: currentParagraph.trim() })
  }
  if (inList) {
    blocks.push({ type: 'list', items: listItems })
  }

  return blocks
}

// Helper function to compile MDX to HTML
async function compileMDX(content: string): Promise<string> {
  try {
    console.log('Compiling MDX content, length:', content.length)
    // Use remark to convert markdown to HTML
    const result = await remark()
      .use(remarkHtml)
      .process(content)
    const html = result.toString()
    console.log('Compiled HTML length:', html.length)
    console.log('HTML preview:', html.substring(0, 200))
    return html
  } catch (error) {
    console.error('Error compiling MDX:', error)
    console.error('Falling back to raw content')
    return content // fallback to raw content
  }
}

async function main() {
  console.log('🌱 Starting seed...')

  // Seed Pages
  const pagesDir = path.join(process.cwd(), 'content/pages')
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.mdx'))

  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const slug = file.replace(/\.mdx$/, '')

    await prisma.page.upsert({
      where: { slug },
      update: {},
      create: {
        title: data.title,
        description: data.description,
        lastUpdatedDate: data.lastUpdatedDate ? new Date(data.lastUpdatedDate) : null,
        status: data.status,
        slug,
        body: content,
      },
    })
  }

  console.log(`✅ Seeded ${pageFiles.length} pages`)

  // Seed Posts
  const postsDir = path.join(process.cwd(), 'content/posts')
  const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'))

  for (const file of postFiles) {
    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const slug = file.replace(/\.mdx$/, '')
    const headings = extractHeadings(content)
    const readTimeMinutes = calculateReadingTime(content)

    // Handle tags
    const tags = data.tags || []
    const slugger = new GithubSlugger()
    const tagSlugs = tags.map((tag: string) => slugger.slug(tag))

    // Handle author
    let authorId = null
    if (data.author) {
      const author = await prisma.author.upsert({
        where: { id: `${data.author.name}-${data.author.image || ''}` },
        update: {},
        create: {
          name: data.author.name,
          image: data.author.image,
        },
      })
      authorId = author.id
    }

    // Handle series
    let seriesId = null
    if (data.series) {
      const series = await prisma.series.upsert({
        where: { id: `${data.series.title}-${data.series.order}` },
        update: {},
        create: {
          title: data.series.title,
          order: data.series.order,
        },
      })
      seriesId = series.id
    }

    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        title: data.title,
        description: data.description,
        publishedDate: new Date(data.publishedDate),
        lastUpdatedDate: data.lastUpdatedDate ? new Date(data.lastUpdatedDate) : null,
        tags,
        status: data.status,
        slug,
        tagSlugs,
        readTimeMinutes,
        headings,
        body: content,
        authorId,
        seriesId,
      },
    })
  }

  console.log(`✅ Seeded ${postFiles.length} posts`)

  // Seed Courses
  const coursesDir = path.join(process.cwd(), 'content/courses')
  const courseDirs = fs.readdirSync(coursesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  let totalCourses = 0

  for (const courseDir of courseDirs) {
    const coursePath = path.join(coursesDir, courseDir)
    const courseFiles = fs.readdirSync(coursePath).filter(file => file.endsWith('.mdx') && !file.includes('template'))

    for (const file of courseFiles) {
      const filePath = path.join(coursePath, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      // Skip files with invalid data
      if (!data.title || typeof data.sectionOrder !== 'number' || typeof data.lessonOrder !== 'number') {
        console.log(`⚠️  Skipping ${file} - invalid data`)
        continue
      }

      const slug = file.replace(/\.mdx$/, '')
      const headings = extractHeadings(content)
      const readTimeMinutes = data.estimatedReadTime || calculateReadingTime(content)
      const compiledBody = await compileMDX(content)
      const contentBlocks = parseMDXToBlocks(content)

      await prisma.course.upsert({
        where: { slug },
        update: {
          title: data.title,
          description: data.description,
          section: data.section,
          sectionOrder: data.sectionOrder,
          lessonOrder: data.lessonOrder,
          course: courseDir,
          status: data.status,
          estimatedReadTime: data.estimatedReadTime,
          resources: data.resources || [],
          readTimeMinutes,
          headings,
          body: content, // Store raw MDX
          bodyCode: compiledBody, // Store compiled HTML
          contentBlocks, // Store structured content
        },
        create: {
          title: data.title,
          description: data.description,
          section: data.section,
          sectionOrder: data.sectionOrder,
          lessonOrder: data.lessonOrder,
          course: courseDir,
          status: data.status,
          estimatedReadTime: data.estimatedReadTime,
          resources: data.resources || [],
          slug,
          readTimeMinutes,
          headings,
          body: content, // Store raw MDX
          bodyCode: compiledBody, // Store compiled HTML
          contentBlocks, // Store structured content
        },
      })

      totalCourses++
    }
  }

  console.log(`✅ Seeded ${totalCourses} courses`)
  console.log('🌱 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })