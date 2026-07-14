import Items from "@/components/Items"
import type { Metadata } from "next"
import { author, siteDescription, siteUrl, socials } from "@/lib/site"

export const metadata: Metadata = {
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: author,
  url: siteUrl,
  jobTitle: "Software Engineer",
  description: siteDescription,
  sameAs: [socials.github, socials.linkedin],
}

export default function Home() {
  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="sr-only">{author}</h1>
      <Items />
    </main>
  )
}
