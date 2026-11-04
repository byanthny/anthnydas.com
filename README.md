# anthnydas.com

Personal site of Anthony Das — projects, info, and a dev log.

Built with [Next.js](https://nextjs.org/) (App Router) + [Tailwind CSS](https://tailwindcss.com/),
deployed on [Vercel](https://vercel.com/). Log entries are MDX files under [`content/`](./content).
The look (colors, type, spacing, the list layout, hover previews, motion) is written down in
[`DESIGN.md`](./DESIGN.md) for other sites to point to.

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Build

```bash
pnpm build
pnpm start
```

## Dev log

Add an entry by dropping an `.mdx` file in [`content/`](./content) with frontmatter — see
[`content/README.md`](./content/README.md) for the schema.
