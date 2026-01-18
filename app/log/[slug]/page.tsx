import { getEntry, getEntryMetadata, getEntrySlugs } from '@/lib/log'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const metadata = getEntryMetadata(slug)
    return {
      title: metadata.title,
      description: metadata.description,
    }
  } catch {
    return {
      title: 'Entry Not Found',
      description: 'The requested log entry does not exist.',
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

  const { title, date, content } = entry

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <article>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <time className="text-neutral-400 text-sm">{date}</time>
        <div className="mt-8 pl-4 prose prose-invert prose-cyan max-w-none">
          {await MDXRemote({ source: content })}
        </div>
      </article>
      <a href="/log" className="text-cyan-400 hover:underline mt-8 inline-block">
        ← back to log
      </a>
    </div>
  )
}

export function generateStaticParams() {
  const slugs = getEntrySlugs()
  return slugs.map((slug) => ({ slug }))
}
