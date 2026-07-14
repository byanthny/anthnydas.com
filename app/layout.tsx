import NavBar from "@/components/NavBar"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import {
  author,
  keywords,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords,
  authors: [{ name: author, url: siteUrl }],
  creator: author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavBar />
        <div className="px-[25%] pt-20">

        {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
