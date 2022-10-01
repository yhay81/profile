import { Icon } from "@components";
import { RevealWrapper } from "next-reveal";

import styles from "./Contact.module.scss";

const Contact: React.FC = () => (
  <RevealWrapper>
    <section className={styles.contactSection} id="contact">
      <h2 className={styles.title}>Contact</h2>

      <p className={styles.text}>
        Whether you have a question or just want to say hi, I&apos;ll try my
        best to get back to you!
      </p>

      <a
        aria-label="Mail"
        className={styles.link}
        href="mailto:yusuke8h@gmail.com"
      >
        <Icon name="Mail" />
        Email
      </a>

      <a
        aria-label="Linkedin"
        className={styles.link}
        href="https://www.linkedin.com/in/yhay81/"
      >
        <Icon name="Linkedin" />
        LinkedIn
      </a>

      <a
        aria-label="Twitter"
        className={styles.link}
        href="https://twitter.com/yhay81"
      >
        <Icon name="Twitter" />
        Twitter
      </a>
    </section>
  </RevealWrapper>
);

export { Contact };
