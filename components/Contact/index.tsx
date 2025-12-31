"use client";

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

      <a className={styles.link} href="mailto:yusuke8h@gmail.com">
        <Icon ariaId="contact-mail" name="Mail" />
        Email
      </a>

      <a className={styles.link} href="https://www.linkedin.com/in/yhay81/">
        <Icon ariaId="contact-linkedin" name="Linkedin" />
        LinkedIn
      </a>

      <a className={styles.link} href="https://twitter.com/yhay81">
        <Icon ariaId="contact-twitter" name="Twitter" />
        Twitter
      </a>
    </section>
  </RevealWrapper>
);

export { Contact };
