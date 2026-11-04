# DESIGN.md

How anthnydas.com looks, written down so other sites (learning.anthnydas.com and whatever
comes next) can point here instead of copying a design system. It describes the site as it
is. When the site changes, this file changes in the same pull request.

Values are given as Tailwind v3 classes with their hex values, so a Tailwind v4 site or plain
CSS can match them. Tailwind v4 moved its palette to oklch, so its `cyan-400` is close to
`#22d3ee` but not the same. Use the hex when the match matters.

## The short version

- Black page, white text, cyan links. One accent color and no gradients.
- Lowercase, plain copy, one line per fact.
- System fonts and local images. Nothing loads from another origin except Vercel Analytics.
- Everything works at 375px wide. Hover can add things, but nothing lives only behind a hover.
- Motion is small and quick, and `prefers-reduced-motion` turns it off.

## Color

| role | Tailwind | value | where |
| --- | --- | --- | --- |
| page | `bg-black` | `#000000` | the body |
| text | `text-white` | `#ffffff` | copy, the name |
| link | `text-cyan-400` | `#22d3ee` | every link (set on `a` in `globals.css`), `summary` toggles, the current rail entry |
| nav links | `text-neutral-300`, `hover:text-white` | `#d4d4d4` | the nav's right side |
| quiet | `text-neutral-400` | `#a3a3a3` | asides in parentheses, dates, rail links, the share card's tagline |
| quieter | `text-neutral-500` | `#737373` | small labels ("on this page") |
| surface | `bg-neutral-900/50`, `bg-neutral-900/95` | `#171717` at 50% / 95% | the nav bar / hover cards |
| outline | `border-neutral-700/50` | `#404040` at 50%, 1px | the nav bar and hover cards |

## Type

- One font stack, Tailwind's default sans:
  `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
  No web fonts.
- Body copy is 16px with a 1.5 line height.
- `.heading` (in `globals.css`) is the one step up: `text-lg`, 18px on a 28px line. The name is
  `.heading` in bold. The buckets (projects, work, log) are `.heading` with
  `underline underline-offset-4`. Groups inside a bucket (`now:`, `current:`, `past:`) are
  italic at body size.
- The nav name is `text-lg font-bold`. The rail is `text-sm` (14px on 20px).
- The home page has a single `h1`, the name, for screen readers only. Its sections are list
  items, not headings.
- Log entries: the title is `text-4xl font-bold`, the date is `text-sm text-neutral-400`, and
  the body is `prose prose-invert` with cyan links, `max-w-2xl`, line height 1.6.

## Spacing and the content edge

- The nav and the content share one side padding: `px-5` (20px) on phones, then
  `sm:px-[10%]`, `md:px-[16%]` and `lg:px-[20%]`. Change both together.
- Inside that edge, the nav bar pads its text by `px-6 py-3` (24px / 12px) and the content by
  `px-6 sm:px-8` (24px / 32px). On phones, copy starts where the nav's text starts. From `sm`
  up it sits about 8px further in.
- The content starts at `pt-20` (80px), below the fixed nav. Section anchors use
  `scroll-mt-24` (96px) so a jump doesn't land under the nav.
- Every `ul` gets `pl-4 pt-2 pb-3`: a 16px indent, 8px above and 12px below. Spacing comes from
  nesting, not from margins on items.

## The nav

`fixed top-0 w-full z-50` with `pt-3` (12px) above it. The bar is
`bg-neutral-900/50 backdrop-blur-md rounded-lg border border-neutral-700/50 px-6 py-3`, with
the name on the left (bold, white) and the links on the right (`gap-3`).

## The nested-list layout

- The whole home page is one `<ul>`. Each top-level item is a section: the name (about),
  projects, work, log and site info.
- Inside a section: an italic group label, then items. An item reads `link: one-line
  description`, and its details (stack, version, members) go in a nested list below it.
- Status goes in brackets after the name: `[soon]`, `[unfinished]`, `[no public repo]`.
- Inline rows (resume · email · github · linkedin) are separated by a middle dot (`&middot;`).
- A side note goes in parentheses in `text-neutral-400`.
- Long or old groups fold into `<details>`. The `summary` is cyan, has no triangle, reads
  ` +` when closed and ` -` when open, and keeps the item's bullet.

## The "on this page" rail

- Only at `xl` (1280px and up): `fixed right-[3%] top-1/2 -translate-y-1/2 w-36`, `text-sm`.
  Below `xl` it's `hidden`, so phones and tablets never see it.
- A `text-neutral-500` label, then the top-level sections in page order. Links are
  `text-neutral-400 hover:text-white`. The current one is `text-cyan-400` and carries
  `aria-current="location"`.
- The current section is the last one whose top is above a line 25% down the viewport. At the
  bottom of the page it's the last section.
- Jumps scroll smoothly (`scroll-behavior: smooth`), and jump instantly under reduced motion.
- It follows learning.anthnydas.com's rail. The home page has one; log pages don't.

## Hover previews (`components/WorkPreview.tsx`)

- A link with a small card of screenshots that appears under it on hover or keyboard focus.
- The card exists only on `lg` screens that can hover (`lg:[@media(hover:hover)]:flex`).
  Everywhere else it's `hidden` and the link is a plain link. Any hint that mentions hovering
  is hidden the same way.
- The card is decoration: `aria-hidden="true"`, images with `alt=""`, `pointer-events-none`.
  The link carries the meaning.
- Look: `absolute left-0 top-full mt-2 z-40`,
  `rounded-lg border border-neutral-700/50 bg-neutral-900/95 p-2 shadow-xl shadow-black/50`,
  shots `rounded` with `gap-2`.
- Shots are 16:9 jpgs of each page's first screen in `public/work/<site>/`, drawn at 176×99,
  captured once and dated in the component.
- It fades in with `transition-opacity duration-150` (`motion-reduce:transition-none`). CSS
  only, no JavaScript.

## Motion

- Small and quick: fades and short transitions of 150-200ms. No bounces or springs, and nothing
  moves on its own when the page loads.
- Every transition has a reduced-motion fallback: `motion-reduce:transition-none` on the
  element, or a `@media (prefers-reduced-motion: reduce)` rule in `globals.css`.
- CSS first. This site loads no animation library.

## Marks and images

- The mark is a bold white "ad" on black, drawn by `app/icon.tsx` (32px, 6px corners) and
  `app/apple-icon.tsx` (180px).
- The share card (`app/opengraph-image.tsx`) is black with the name in 120px bold, the tagline
  in `#a3a3a3` and a 160×8 `#22d3ee` bar.
- There is no icon set. Links are words.
- Only marks the site's owner owns appear as images. Schools, employers and clients are named
  in text, not shown by logo.

## Using this on another site

To read as part of the same family, a site needs the black page, `#22d3ee` links, the neutral
greys above, the system font stack and the nav bar's look (the 50% outline, the blur and 8px
corners). Its layout, type scale and components are its own call. When a site settles a
pattern worth sharing, add it here.
