import { getEntryMetadata, getEntrySlugs } from '@/lib/log'
import type { EntryMetadata } from '@/types/log'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const metadata = await getEntryMetadata(slug)
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Dynamic import of MDX file (Vercel's recommended approach)
  const { default: Entry, metadata } = await import(`../../../content/${slug}.mdx`)

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <article>
        <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
        <time className="text-neutral-400 text-sm">{metadata.date}</time>
        <div className="mt-8">
          <Entry />
        </div>
      </article>
      <a href="/log" className="text-cyan-400 hover:underline mt-8 inline-block">
        ← Back to log
      </a>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getEntrySlugs()
  return slugs.map((slug) => ({ slug }))
}
