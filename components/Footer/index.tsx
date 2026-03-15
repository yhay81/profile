import { COPYRIGHT_START_YEAR, PROFILE_NAME, PROFILE_REPOSITORY } from "@lib";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const yearText =
    currentYear === COPYRIGHT_START_YEAR
      ? `${currentYear}`
      : `${COPYRIGHT_START_YEAR}–${currentYear}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.credit} tabIndex={-1}>
        <a href={PROFILE_REPOSITORY}>
          <div>
            © {yearText} {PROFILE_NAME}
          </div>
        </a>
      </div>
    </footer>
  );
};

export { Footer };
