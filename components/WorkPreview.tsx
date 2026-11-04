import Image from 'next/image'
import HoverCard from './HoverCard'

type Props = {
  href: string
  label: string
  // the folder under public/work and the shots in it (16:9 jpgs, the first screen of each page)
  site: string
  shots: string[]
}

// a link to past work with a small card of screenshots, the site as it looked when i shipped it
// (captured 10/2026)
const WorkPreview = ({ href, label, site, shots }: Props) => (
  <HoverCard trigger={<a href={href}>{label}</a>}>
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
  </HoverCard>
)

export default WorkPreview
