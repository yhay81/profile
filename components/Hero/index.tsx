"use client";

import { TypeAnimation } from "react-type-animation";

import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./Hero.module.scss";

const WAIT_TIME = 500;
const HERO_KICKER_TEXT =
  "Hello, I'm Yusuke — a software engineer in Tokyo.";

const Hero: React.FC = () => {
  const shouldAnimate = !useReducedMotion();

  return (
    <section className={styles.heroSection}>
      {shouldAnimate ? (
        <TypeAnimation
          sequence={["Hello, ", WAIT_TIME, HERO_KICKER_TEXT]}
          speed={70}
          wrapper="p"
          className={styles.kicker}
        />
      ) : (
        <p className={styles.kicker}>{HERO_KICKER_TEXT}</p>
      )}

      <h1 className={styles.title}>Yusuke Hayashi</h1>

      <h2 className={styles.subtitle}>Software Engineer / Developer</h2>

      <p className={styles.summary}>
        I build reliable, user-focused products across web, cloud, and teams. I
        enjoy turning complex ideas into clear, maintainable software.
      </p>

      <div className={styles.cta}>
        <a className={styles.primary} href="#contact">
          Contact
        </a>

        <a className={styles.secondary} href="#about">
          About Me
        </a>
      </div>

      <a className={styles.arrow} href="#about" aria-label="Scroll to About">
        <span className={styles.arrowLabel}>Scroll</span>
      </a>
    </section>
  );
};

export { Hero };
