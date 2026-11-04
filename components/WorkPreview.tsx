import Image from 'next/image'

type Props = {
  href: string
  label: string
  // the folder under public/work and the shots in it (16:9 jpgs, the first screen of each page)
  site: string
  shots: string[]
}

// a link to past work with a small card of screenshots, the site as it looked when i shipped it
// (captured 10/2026). css only: the card shows on hover or keyboard focus, on wide screens that
// can hover, so phones and tablets get the plain link and no clutter
const WorkPreview = ({ href, label, site, shots }: Props) => (
  <span className="group relative inline-block">
    <a href={href}>{label}</a>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max gap-2 rounded-lg border border-neutral-700/50 bg-neutral-900/95 p-2 opacity-0 shadow-xl shadow-black/50 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:[@media(hover:hover)]:flex"
    >
      {shots.map((shot) => (
        <Image
          key={shot}
          src={`/work/${site}/${shot}.jpg`}
          alt=""
          width={176}
          height={99}
          className="rounded"
        />
      ))}
    </span>
  </span>
)

export default WorkPreview
