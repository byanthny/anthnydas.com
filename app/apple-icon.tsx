import { ImageResponse } from "next/og"

// Apple touch icon (home-screen): the mark, a cyan dot and a white "ad" on black.
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            marginTop: 16,
            marginRight: 12,
            borderRadius: 9999,
            backgroundColor: "#22d3ee",
          }}
        />
        ad
      </div>
    ),
    { ...size }
  )
}
