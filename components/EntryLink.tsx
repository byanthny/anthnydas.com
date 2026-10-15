import type { Entry } from '@/types/log'

interface EntryLinkProps {
  entry: Entry
}

export default function EntryLink({ entry }: EntryLinkProps) {
  return (
    <li>
      <a href={`/log/${entry.slug}`} className="hover:underline">
        {entry.date}: {entry.title}
      </a>
      {entry.description && ` - ${entry.description}`}
    </li>
  )
}
