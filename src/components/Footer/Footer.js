import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
      © <img src="/openpath-logo.svg" alt="Openpath" className={styles.logo} /> 2022
      </footer>
    </>
  )
}
