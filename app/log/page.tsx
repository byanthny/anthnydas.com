import EntryLink from '@/components/EntryLink'
import { getAllEntries } from '@/lib/log'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'log',
  description: 'Dev log — notes on projects and building things by Anthony Das.',
  alternates: {
    canonical: '/log',
  },
  openGraph: {
    type: 'website',
    title: 'log',
    description: 'Dev log — notes on projects and building things by Anthony Das.',
    url: '/log',
  },
}

export default async function LogPage() {
  const entries = await getAllEntries()

  return (
    <>
      <h1 className="sr-only">Log</h1>
      <ul className="list-disc">
        {entries.map((entry) => (
          <EntryLink key={entry.slug} entry={entry} />
        ))}
      </ul>
    </>
  )
}
