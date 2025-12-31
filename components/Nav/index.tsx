import Link from "next/link";

import styles from "./Nav.module.scss";

const Nav: React.FC = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link className={styles.title} href="/">
        <span className={styles.prompt}>❯</span>

        <h1>Yusuke Hayashi</h1>
      </Link>
    </nav>
  </header>
);

export { Nav };
