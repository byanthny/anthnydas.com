import fs from 'fs'
import path from 'path'
import type { EntryMetadata } from '@/types/log'

const contentDir = path.join(process.cwd(), 'content')

export function getEntrySlugs(): string[] {
  const files = fs.readdirSync(contentDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export async function getEntryMetadata(slug: string): Promise<EntryMetadata> {
  const { metadata } = await import(`@/content/${slug}.mdx`)
  return metadata
}

export async function getAllEntries() {
  const slugs = getEntrySlugs()
  const entries = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      ...(await getEntryMetadata(slug)),
    }))
  )
  // Sort by date descending
  return entries.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getEntriesByProject(project: string) {
  const entries = await getAllEntries()
  return entries.filter((entry) => entry.project === project)
}
