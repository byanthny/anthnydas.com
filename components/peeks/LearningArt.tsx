'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './peeks.module.css'

// learning's first page is merge sort, so its peek sorts twelve bars. the first order is fixed
// so the server and the browser draw the same bars
const START = [7, 3, 10, 1, 12, 5, 8, 2, 11, 4, 9, 6]
const N = START.length

type Frame = { bars: number[]; hot: number[] }

// merge sort, recorded: a frame for every comparison and one for every merged run
const mergeSortFrames = (start: number[]): Frame[] => {
  const a = start.slice()
  const frames: Frame[] = []
  const sort = (lo: number, hi: number) => {
    if (hi - lo < 2) return
    const mid = (lo + hi) >> 1
    sort(lo, mid)
    sort(mid, hi)
    const merged: number[] = []
    let i = lo
    let j = mid
    while (i < mid && j < hi) {
      frames.push({ bars: a.slice(), hot: [i, j] })
      merged.push(a[i] <= a[j] ? a[i++] : a[j++])
    }
    while (i < mid) merged.push(a[i++])
    while (j < hi) merged.push(a[j++])
    merged.forEach((value, k) => {
      a[lo + k] = value
    })
    frames.push({ bars: a.slice(), hot: merged.map((_, k) => lo + k) })
  }
  sort(0, a.length)
  return frames
}

const shuffled = () => {
  const bars = Array.from({ length: N }, (_, i) => i + 1)
  for (let i = bars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[bars[i], bars[j]] = [bars[j], bars[i]]
  }
  return bars
}

const LearningArt = () => {
  const ref = useRef<HTMLSpanElement>(null)
  const [frame, setFrame] = useState<Frame>({ bars: START, hot: [] })

  useEffect(() => {
    // the card opens on hover or focus of the link it hangs off: the .group around both
    const host = ref.current?.closest('.group')
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: ReturnType<typeof setTimeout> | undefined
    let frames: Frame[] = []
    let next = 0
    let running = false

    const tick = () => {
      if (!running) return
      if (next < frames.length) {
        setFrame(frames[next++])
        timer = setTimeout(tick, 150)
      } else {
        // rest on the sorted bars, then shuffle and sort again
        setFrame({ bars: frames[frames.length - 1].bars, hot: [] })
        timer = setTimeout(sortAgain, 1500)
      }
    }
    const sortAgain = () => {
      const bars = shuffled()
      frames = mergeSortFrames(bars)
      next = 0
      setFrame({ bars, hot: [] })
      timer = setTimeout(tick, 400)
    }
    const start = () => {
      if (running) return
      running = true
      sortAgain()
    }
    const stop = () => {
      running = false
      clearTimeout(timer)
    }

    host.addEventListener('mouseenter', start)
    host.addEventListener('focusin', start)
    host.addEventListener('mouseleave', stop)
    host.addEventListener('focusout', stop)
    return () => {
      stop()
      host.removeEventListener('mouseenter', start)
      host.removeEventListener('focusin', start)
      host.removeEventListener('mouseleave', stop)
      host.removeEventListener('focusout', stop)
    }
  }, [])

  return (
    <span ref={ref} className={styles.art}>
      <span className={styles.bars}>
        {frame.bars.map((value, i) => (
          <span
            key={i}
            className={frame.hot.includes(i) ? styles.hot : undefined}
            style={{ height: `${(value / N) * 100}%` }}
          />
        ))}
      </span>
      <span className={styles.tag}>merge sort</span>
    </span>
  )
}

export default LearningArt
