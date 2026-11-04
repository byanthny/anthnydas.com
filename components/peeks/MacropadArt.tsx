import type { CSSProperties } from 'react'
import styles from './peeks.module.css'

// the twelve keys light in a diagonal wave: each number is the key's step in the wave
const wave = [0, 1, 2, 1, 2, 3, 2, 3, 4, 3, 4, 5]

// the rp2040 macropad, drawn: a 3x4 key grid, the screen and the knob, next to a little rust.
// a drawing, not adafruit's product photo
const MacropadArt = () => (
  <span className={`${styles.art} ${styles.pad}`}>
    <span className={styles.board}>
      <span className={styles.top}>
        <span className={styles.oled}>key 5</span>
        <span className={styles.knob} />
      </span>
      <span className={styles.keys}>
        {wave.map((step, i) => (
          <i key={i} style={{ '--d': step } as CSSProperties} />
        ))}
      </span>
    </span>
    <span className={styles.code}>
      {'loop {\n  let key = pad.scan();\n  '}
      <b>leds[key].glow();</b>
      {'\n}'}
    </span>
  </span>
)

export default MacropadArt
