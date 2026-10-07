'use client'

import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h1>something went wrong</h1>
      <p className="text-neutral-400 mt-2">
        {error.digest ? `error id: ${error.digest}` : 'an unexpected error occurred.'}
      </p>
      <div className="mt-8 flex gap-6">
        <button onClick={() => reset()} className="text-cyan-400 hover:underline">
          try again
        </button>
        <Link href="/" className="text-cyan-400 hover:underline">
          ← back home
        </Link>
      </div>
    </div>
  )
}
