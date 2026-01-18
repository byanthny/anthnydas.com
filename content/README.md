# Content Directory

This directory contains MDX log entries for the website.

## Writing Log Entries

Create `.mdx` files in this directory with the following structure:

```mdx
export const metadata = {
  title: "Your Entry Title",
  date: "2026-01-18",
  description: "Brief description of the entry",
  project: "project-slug", // Optional: links entry to a project on homepage
  tags: ["tag1", "tag2"]   // Optional: for future filtering
}

# Your Entry Title

Your markdown content here...
```

## Metadata Fields

- **title** (required): The title of your entry
- **date** (required): Date in YYYY-MM-DD format
- **description** (required): Brief description shown in lists
- **project** (optional): Project identifier to link entry to homepage projects
- **tags** (optional): Array of tags for categorization

## Project Identifiers

To link entries to projects on the homepage, use these project values:

- `macropad-rp2040` - RP2040 Macropad project
- `dotfiles` - .dotfiles repository
- `tonysshrimpshack` - tonysshrimpshack.com
- `sweettearankings` - sweettearankings.com

## MDX Features

You can use all markdown features plus React components:

- **Markdown**: headings, lists, links, images, code blocks
- **React Components**: Import and use React components in your content
- **Custom Components**: Use custom components defined in `mdx-components.tsx`

## File Naming

Use descriptive slugs for filenames (no date prefix needed):
- `welcome.mdx`
- `macropad-setup.mdx`
- `rust-embedded-journey.mdx`

The slug becomes the URL: `/log/[filename-without-mdx]`
