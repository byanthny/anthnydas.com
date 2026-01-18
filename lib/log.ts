import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { EntryMetadata, Entry } from '@/types/log'

const contentDir = path.join(process.cwd(), 'content')

// New interface for internal use with parsed content
interface MDXFile extends EntryMetadata {
  slug: string
  content: string
}

/**
 * Read and parse a single MDX file
 */
function readMDXFile(slug: string): MDXFile {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContent)

  return {
    slug,
    content,
    ...(data as EntryMetadata),
  }
}

/**
 * Get all entry slugs from the content directory
 */
export function getEntrySlugs(): string[] {
  const files = fs.readdirSync(contentDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

/**
 * Get a single entry by slug (with content for rendering)
 */
export function getEntry(slug: string): MDXFile {
  return readMDXFile(slug)
}

/**
 * Get metadata for a single entry
 */
export function getEntryMetadata(slug: string): EntryMetadata {
  const { content, slug: _, ...metadata } = readMDXFile(slug)
  return metadata
}

/**
 * Get all entries with metadata, sorted by date descending
 * Note: Returns Entry[] without content for listing pages
 */
export function getAllEntries(): Entry[] {
  const slugs = getEntrySlugs()
  const entries = slugs.map(slug => {
    const { content, ...entry } = readMDXFile(slug)
    return entry
  })

  // Sort by date descending
  return entries.sort((a, b) =>
    a.date > b.date ? -1 : 1
  )
}

/**
 * Get entries filtered by project
 */
export function getEntriesByProject(project: string): Entry[] {
  const entries = getAllEntries()
  return entries.filter((entry) => entry.project === project)
}
