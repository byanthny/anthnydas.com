export interface EntryMetadata {
  title: string
  date: string
  description: string
  project?: string
  tags?: string[]
  draft?: boolean
}

export interface Entry extends EntryMetadata {
  slug: string
}
