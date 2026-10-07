import { getEntry, getEntryMetadata, getEntrySlugs } from '@/lib/log'
import { author, siteName, siteUrl } from '@/lib/site'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const metadata = getEntryMetadata(slug)
    const url = `/log/${slug}`
    return {
      title: metadata.title,
      description: metadata.description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: 'article',
        title: metadata.title,
        description: metadata.description,
        url,
        siteName,
        publishedTime: metadata.date,
        authors: [author],
        tags: metadata.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
      },
    }
  } catch {
    return {
      title: 'Entry Not Found',
      description: 'The requested log entry does not exist.',
      robots: { index: false, follow: false },
    }
  }
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Get entry from filesystem
  let entry
  try {
    entry = getEntry(slug)
  } catch {
    notFound()
  }

  const { title, date, description, content } = entry

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: `${siteUrl}/log/${slug}`,
    author: {
      '@type': 'Person',
      name: author,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/log/${slug}`,
    },
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <time className="text-neutral-400 text-sm" dateTime={date}>
          {date}
        </time>
        <div className="mt-8 pl-4 prose prose-invert prose-cyan max-w-none">
          {await MDXRemote({ source: content })}
        </div>
      </article>
      <Link href="/log" className="text-cyan-400 hover:underline mt-8 inline-block">
        ← back to log
      </Link>
    </div>
  )
}

export function generateStaticParams() {
  const slugs = getEntrySlugs()
  return slugs.map((slug) => ({ slug }))
}
