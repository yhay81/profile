import { Icon } from "@components";
import { PROFILE_EMAIL, PROFILE_SOCIAL_LINKS } from "@lib";

import styles from "./Side.module.scss";

const Side: React.FC = () => (
  <aside className={styles.sideElement}>
    <ul className={styles.socialList}>
      {PROFILE_SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <a
            aria-label={link.name}
            className={styles.socialLink}
            href={link.url}
            rel={link.external ? "noopener noreferrer" : undefined}
            target={link.external ? "_blank" : undefined}
          >
            <Icon ariaId={link.id} name={link.icon} />
            <span className={styles.socialLabel}>{link.name}</span>
          </a>
        </li>
      ))}
    </ul>

    <div className={styles.linkWrapper}>
      <a className={styles.emailLink} href={`mailto:${PROFILE_EMAIL}`}>
        {PROFILE_EMAIL}
      </a>
    </div>
  </aside>
);

export { Side };
