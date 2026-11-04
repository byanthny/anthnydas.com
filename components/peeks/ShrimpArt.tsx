import styles from './peeks.module.css'

// a cherry shrimp, side on, facing right
const Shrimp = () => (
  <svg viewBox="0 0 44 26" aria-hidden="true" focusable="false">
    <path d="M33 10.5c4-5 7.5-7 10.5-8" fill="none" stroke="#e8553f" strokeWidth=".8" strokeLinecap="round" />
    <path d="M33 11.5c3.5-2 7-2.2 10.5-1.4" fill="none" stroke="#e8553f" strokeWidth=".8" strokeLinecap="round" />
    <path d="M7.5 14.5C10 8.5 18 6 26 6.6c3.8.3 6.9 2 8 4.3-1 2.4-4.6 4-9.5 4.6-6 .7-11 1-14.5 3.5z" fill="#e8553f" />
    <path d="M34 10.2l4.2-.6-3.8 1.9z" fill="#e8553f" />
    <path d="M8.5 15.2 1.5 11.5l1.3 4.4-1.3 4.6z" fill="#e8553f" />
    <path d="M13 9.4c1.2 2.6 1.3 5 .8 7.4M17.5 7.7c1.2 2.8 1.2 5.4.7 7.8M22 6.9c1.1 2.8 1.1 5.6.6 8" fill="none" stroke="#b23a29" strokeWidth=".7" />
    <circle cx="30.6" cy="9.4" r="1.15" fill="#111111" />
    <path d="M15 16.6l-1.2 4.4M18.5 16.2l-.7 4.6M22 15.8l-.2 4.6M25.5 15.3l.4 4.3" fill="none" stroke="#e8553f" strokeWidth=".7" strokeLinecap="round" />
  </svg>
)

const Plant = ({ className }: { className: string }) => (
  <svg className={className} width="30" height="54" viewBox="0 0 40 70" aria-hidden="true" focusable="false">
    <path d="M20 70C19 50 14 36 8 24" stroke="#2f7a4b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M20 70c1-18 6-34 13-46" stroke="#3d9a5f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M20 70c0-22-1-40 1-62" stroke="#2f7a4b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <ellipse cx="9" cy="26" rx="5" ry="2.4" transform="rotate(-40 9 26)" fill="#3d9a5f" />
    <ellipse cx="31" cy="27" rx="5" ry="2.4" transform="rotate(40 31 27)" fill="#2f7a4b" />
    <ellipse cx="21" cy="10" rx="2.4" ry="5" fill="#3d9a5f" />
  </svg>
)

// where each bubble rises and how far into its climb it starts
const bubbles = [
  { left: '40%', delay: '-1s' },
  { left: '62%', delay: '-2.4s' },
  { left: '78%', delay: '-0.3s' },
]

// the shrimp shack: a cherry shrimp patrols a planted tank
const ShrimpArt = () => (
  <span className={`${styles.art} ${styles.tank}`}>
    <Plant className={`${styles.plant} ${styles.plantLeft}`} />
    <Plant className={`${styles.plant} ${styles.plantRight}`} />
    <span className={styles.swim}>
      <Shrimp />
    </span>
    {bubbles.map((bubble) => (
      <span
        key={bubble.left}
        className={styles.bubble}
        style={{ left: bubble.left, animationDelay: bubble.delay }}
      />
    ))}
    <span className={styles.gravel} />
  </span>
)

export default ShrimpArt
