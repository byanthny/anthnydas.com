import styles from './peeks.module.css'

// stow, sketched: a note lands and a pull request merges. a drawing, not its real ui, until it
// launches
const StowArt = () => (
  <span className={styles.art}>
    <span className={styles.win}>
      <i />
      <i />
      <i />
      <span>stow</span>
    </span>
    <span className={styles.cols}>
      <span>
        <b>notes</b>
        <span className={`${styles.card} ${styles.landing}`}>
          <span className={styles.heading} />
          <span className={`${styles.line} ${styles.typing}`} />
        </span>
        <span className={styles.card}>
          <span className={styles.heading} />
          <span className={styles.line} />
          <span className={`${styles.line} ${styles.short}`} />
        </span>
      </span>
      <span>
        <b>pull requests</b>
        <span className={`${styles.card} ${styles.pr}`}>
          <span className={`${styles.state} ${styles.merging}`} />
          <span className={styles.line} />
        </span>
        <span className={`${styles.card} ${styles.pr}`}>
          <span className={styles.state} />
          <span className={`${styles.line} ${styles.short}`} />
        </span>
      </span>
    </span>
  </span>
)

export default StowArt
