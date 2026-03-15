"use client";

import { TypeAnimation } from "react-type-animation";

import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./Hero.module.scss";

const WAIT_TIME = 500;
const HERO_KICKER_TEXT = "Hello, I'm Yusuke — a software engineer in Tokyo.";
const HERO_ROTATION_TEXTS = [
  "I build AI-first products from concept to production.",
  "I align teams, workflow, and architecture for real adoption.",
  "I turn complex problems into reliable systems.",
] as const;
const HERO_STATS = [
  {
    title: "Focus",
    value: "AI / Web / Cloud",
  },
  {
    title: "Experience",
    value: "10+ Years",
  },
  {
    title: "Mindset",
    value: "Pragmatic and practical",
  },
] as const;

const TYPE_SEQUENCE: (string | number)[] = HERO_ROTATION_TEXTS.flatMap(
  (text, index) => [index === 0 ? `${text} ` : text, WAIT_TIME * 5],
);

const Hero: React.FC = () => {
  const shouldAnimate = !useReducedMotion();

  return (
    <section className={styles.heroSection}>
      {shouldAnimate ? (
        <TypeAnimation
          className={styles.kicker}
          repeat={Infinity}
          sequence={TYPE_SEQUENCE}
          speed={70}
          wrapper="p"
        />
      ) : (
        <p className={styles.kicker}>{HERO_KICKER_TEXT}</p>
      )}

      <p className={styles.strapline}>
        I build reliable software and guide teams into shipping it.
      </p>

      <h1 className={styles.title}>Yusuke Hayashi</h1>

      <h2 className={styles.subtitle}>Software Engineer / Developer</h2>

      <p className={styles.summary}>
        I build reliable, user-focused products across web, cloud, and teams. I
        enjoy turning complex ideas into clear, maintainable software.
      </p>

      <div className={styles.metrics}>
        {HERO_STATS.map((item) => (
          <div className={styles.metric} key={item.title}>
            <span className={styles.metricLabel}>{item.title}</span>
            <span className={styles.metricValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <a className={styles.primary} href="#contact">
          Contact
        </a>

        <a className={styles.secondary} href="#about">
          About Me
        </a>
      </div>

      <a aria-label="Scroll to About" className={styles.arrow} href="#about">
        <span className={styles.arrowLabel}>Scroll</span>
      </a>
    </section>
  );
};

export { Hero };
