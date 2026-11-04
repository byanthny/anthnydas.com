import styles from './peeks.module.css'

// each markdown line types in a beat after the one above it
const markdown = [
  { line: '# hello', delay: '-5s' },
  { line: 'a *small* theme', delay: '-4.6s' },
  { line: '- one', delay: '-4.2s' },
  { line: '- two', delay: '-3.8s' },
]

// yugo, the hugo theme: markdown in, a page out
const YugoArt = () => (
  <span className={`${styles.art} ${styles.yugo}`}>
    <span className={styles.pane}>
      <span className={styles.file}>content/hello.md</span>
      {markdown.map(({ line, delay }) => (
        <code key={line} className={styles.md} style={{ animationDelay: delay }}>
          {line}
        </code>
      ))}
    </span>
    <span className={styles.arrow}>&rarr;</span>
    <span className={styles.pane}>
      <span className={styles.file}>/hello/</span>
      <span className={`${styles.out} ${styles.title}`} style={{ animationDelay: '-5s' }}>
        hello
      </span>
      <span className={`${styles.out} ${styles.para}`} style={{ animationDelay: '-4.7s' }}>
        a <em>small</em> theme
      </span>
      <span className={`${styles.out} ${styles.item}`} style={{ animationDelay: '-4.4s' }}>
        one
      </span>
      <span className={`${styles.out} ${styles.item}`} style={{ animationDelay: '-4.4s' }}>
        two
      </span>
    </span>
  </span>
)

export default YugoArt
