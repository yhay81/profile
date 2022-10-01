import { Icon } from "@components";

import styles from "./Side.module.scss";

const SOCIAL_MEDIA: Readonly<
  { readonly url: string; readonly name: string }[]
> = [
  {
    name: "GitHub",
    url: "https://github.com/yhay81",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yhay81",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/yhay81",
  },
  {
    name: "Zenn",
    url: "https://zenn.dev/yhay81",
  },
];

const EMAIL = "yusuke8h@gmail.com";

const Side: React.FC = () => (
  <aside className={styles.sideElement}>
    <ul className={styles.socialList}>
      {SOCIAL_MEDIA.map(({ url, name }) => (
        <li key={name}>
          <a aria-label={name} href={url} rel="noreferrer" target="_blank">
            <Icon name={name} />
          </a>
        </li>
      ))}
    </ul>
    <div className={styles.linkWrapper}>
      <a className={styles.emailLink} href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
    </div>
  </aside>
);

export { Side };
