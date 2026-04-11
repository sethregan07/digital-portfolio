import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "Originalform — A thinking system for people building something independent";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
          borderTop: "3px solid #c8c0b0",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "22px", fontWeight: 600, color: "#e8e3d9", letterSpacing: "-0.02em" }}>
            Originalform
          </span>
          <span style={{ fontSize: "12px", color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            originalform.org
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "880px" }}>
          <p
            style={{
              fontSize: "50px",
              fontWeight: 700,
              lineHeight: 1.06,
              color: "#e8e3d9",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            The bottleneck is not information. It is the assumptions running underneath your decisions.
          </p>
          <p
            style={{
              fontSize: "19px",
              color: "#777",
              lineHeight: 1.5,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            A thinking system for people building something independent.
          </p>
        </div>

        {/* Bottom tags */}
        <div style={{ display: "flex", gap: "28px" }}>
          {["8-Stage System", "47 Essays", "Free Course", "Notion Templates"].map((item) => (
            <span
              key={item}
              style={{
                fontSize: "11px",
                color: "#444",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
