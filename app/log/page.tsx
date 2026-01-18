import EntryLink from '@/components/EntryLink'
import { getAllEntries } from '@/lib/log'

export default async function LogPage() {
  const entries = await getAllEntries()

  return (
      <ul className="list-disc">
        {entries.map((entry) => (
          <EntryLink key={entry.slug} entry={entry} />
        ))}
      </ul>
  )
}
