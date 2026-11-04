import type { ReactNode } from 'react'

type Props = {
  // the link (or word) the card hangs off
  trigger: ReactNode
  // what the card shows: screenshots, a drawn loop
  children: ReactNode
}

// a small card under a link, shown on hover or keyboard focus. css only, and only on wide
// screens that can hover, so phones and tablets get the plain link and no clutter. the card is
// decoration (aria-hidden): the link carries the meaning
const HoverCard = ({ trigger, children }: Props) => (
  <span className="group relative inline-block">
    {trigger}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max gap-2 rounded-lg border border-neutral-700/50 bg-neutral-900/95 p-2 opacity-0 shadow-xl shadow-black/50 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:[@media(hover:hover)]:flex"
    >
      {children}
    </span>
  </span>
)

export default HoverCard
