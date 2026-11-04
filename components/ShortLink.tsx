import type { ComponentProps } from 'react'
import { siteUrl } from '@/lib/site'

const site = siteUrl.replace(/^https?:\/\//, '')

// where a link goes, short: no https://, www. or trailing slash. an email link is its
// address, and a link on this site gets the domain in front
export const shortUrl = (href: string) => {
  if (href.startsWith('mailto:')) return href.slice('mailto:'.length)
  if (href.startsWith('/')) return `${site}${href}`
  return href.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

type Props = ComponentProps<'a'> & { href: string }

// a link that shows its short url in a small chip under it on hover or keyboard focus
// (globals.css, a[data-url])
const ShortLink = ({ href, ...rest }: Props) => (
  <a href={href} data-url={shortUrl(href)} {...rest} />
)

export default ShortLink
