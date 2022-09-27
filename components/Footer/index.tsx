import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.credit} tabIndex={-1}>
        <a href="https://github.com/yhay81/profile">
          <div>© 2022 Yusuke Hayashi</div>
        </a>
      </div>
    </footer>
  );
};

export { Footer };
