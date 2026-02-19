-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "bodyCode" TEXT;

-- CreateIndex
CREATE INDEX "courses_course_status_sectionOrder_lessonOrder_idx" ON "courses"("course", "status", "sectionOrder", "lessonOrder");

-- CreateIndex
CREATE INDEX "courses_slug_idx" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "posts_status_publishedDate_idx" ON "posts"("status", "publishedDate");

-- CreateIndex
CREATE INDEX "posts_slug_idx" ON "posts"("slug");
