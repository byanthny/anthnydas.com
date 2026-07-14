import { ImageResponse } from "next/og"
import { getEntryMetadata, getEntrySlugs } from "@/lib/log"
import { siteName } from "@/lib/site"

export const alt = "Log entry"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Pre-render an OG card for every log entry at build time.
export function generateStaticParams() {
  return getEntrySlugs().map((slug) => ({ slug }))
}

export default async function EntryOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let title = siteName
  let date = ""
  try {
    const meta = getEntryMetadata(slug)
    title = meta.title
    date = meta.date
  } catch {
    // Fall back to the site name if the entry can't be read.
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#a3a3a3" }}>
          {siteName} / log
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: "-2px" }}>
            {title}
          </div>
          {date ? (
            <div style={{ fontSize: 36, color: "#22d3ee", marginTop: 24 }}>
              {date}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  )
}
