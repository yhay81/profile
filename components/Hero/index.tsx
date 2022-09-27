import { TypeAnimation } from "react-type-animation";

import styles from "./Hero.module.scss";

const WAIT_TIME = 500;

const Hero: React.FC = () => (
  <section className={styles.heroSection}>
    <TypeAnimation
      sequence={[
        "Hello, ",
        WAIT_TIME,
        "Hello, this is Yusuke Hayashi's profile page.",
      ]}
      speed={70}
      wrapper="h2"
    />
    <a className={styles.arrow} href="#about">
      arrow
    </a>
  </section>
);

export { Hero };
