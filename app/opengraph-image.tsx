import { ImageResponse } from "next/og"
import { siteName, tagline } from "@/lib/site"

// Default social share card. Root-level, so it cascades to every route
// (/, /log, …) unless a nested segment provides its own opengraph-image.
export const alt = `${siteName} — ${tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: "-4px" }}>
          {siteName}
        </div>
        <div style={{ fontSize: 44, color: "#a3a3a3", marginTop: 8 }}>
          {tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 160,
            height: 8,
            backgroundColor: "#22d3ee",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
