import { ImageResponse } from "next/og"

// Dynamically generated favicon: white monogram on black.
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        ad
      </div>
    ),
    { ...size }
  )
}
