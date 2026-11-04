import { ImageResponse } from "next/og"

// Dynamically generated favicon: the mark, a cyan dot and a white "ad" on black.
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
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            marginTop: 3,
            marginRight: 2,
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
