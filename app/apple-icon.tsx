import { ImageResponse } from "next/og"

// Apple touch icon (home-screen): white monogram on black.
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
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        ad
      </div>
    ),
    { ...size }
  )
}
