import Image from 'next/image'
import { shortUrl } from '../ShortLink'

type Props = {
  href: string
  // a 16:9 jpg of the site's first screen in public/projects (captured 11/2026). take a new
  // one when the site's homepage changes
  shot: string
}

// a project with a site shows the site: its homepage and where it lives
const SiteCard = ({ href, shot }: Props) => (
  <span className="flex w-80 flex-col gap-2">
    <Image src={shot} alt="" width={320} height={180} className="rounded" />
    <span className="font-mono text-xs text-neutral-400">{shortUrl(href)}</span>
  </span>
)

export default SiteCard
