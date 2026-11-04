'use client'

import { useEffect, useState } from 'react'

// "on this page", like learning.anthnydas.com: the home page's sections in a rail in the right
// margin on wide screens. the section being read is the last heading above a line a quarter of
// the way down the viewport
const sections = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'work', label: 'work' },
  { id: 'log', label: 'log' },
]

const PageToc = () => {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    let queued = false
    const update = () => {
      queued = false
      const line = window.innerHeight * 0.25
      let index = -1
      targets.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) index = i
      })
      // the last sections can't scroll up to the line, so the bottom of the page means the last one
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (bottom && index >= 0) index = targets.length - 1
      setCurrent(index >= 0 ? targets[index].id : null)
    }
    const schedule = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <nav
      aria-label="on this page"
      className="fixed right-[3%] top-1/2 z-40 hidden w-36 -translate-y-1/2 xl:block"
    >
      <p className="mb-2 text-sm text-neutral-500">on this page</p>
      <ol className="space-y-1 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={current === section.id ? 'location' : undefined}
              className={
                current === section.id
                  ? 'text-cyan-400'
                  : 'text-neutral-400 hover:text-white'
              }
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default PageToc
