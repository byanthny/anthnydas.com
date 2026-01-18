export interface EntryMetadata {
  title: string
  date: string
  description: string
  project?: string
  tags?: string[]
}

export interface Entry extends EntryMetadata {
  slug: string
}
