import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1>404 — page not found</h1>
      <p className="text-neutral-400 mt-2">
        nothing lives at this address.
      </p>
      <Link href="/" className="text-cyan-400 hover:underline mt-8 inline-block">
        ← back home
      </Link>
    </div>
  )
}
