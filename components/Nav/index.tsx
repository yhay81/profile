import Link from "next/link";

import styles from "./Nav.module.scss";

const Nav: React.FC = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link className={styles.title} href="/">
        <span className={styles.prompt}>❯</span>

        <span className={styles.name}>Yusuke Hayashi</span>
      </Link>
    </nav>
  </header>
);

export { Nav };
