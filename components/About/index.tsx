import Image from "next/future/image";
import { RevealWrapper } from "next-reveal";

import Me from "../../public/me.webp";
import styles from "./About.module.scss";

const About: React.FC = () => (
  <RevealWrapper>
    <section className={styles.aboutSection} id="about">
      <h2 className={styles.title}>About Me</h2>

      <div className={styles.inner}>
        <div className={styles.pic}>
          <div className={styles.wrapper}>
            <div className={styles.img}>
              <Image alt="Yusuke Hayashi" loading="lazy" src={Me} />
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.hello}>
            <p>Hello! My name is Yusuke and I enjoy developping Softwares.</p>
          </div>
          <h3>Experiences</h3>
          <ul className={styles.list}>
            <li>
              <a href="https://quickwork.jp/">
                Executive Dev Manager @ QuickWork 2021~2022
              </a>
            </li>
            <li>
              <a href="https://sony.com/">
                Software Engineer @ SONY, SIE 2018~2021
              </a>
            </li>
            <li>
              <a href="https://us.mullenlowe.com/">
                Database Administrator @ NAOJ 2016~2017
              </a>
            </li>
          </ul>
          <h3>Education</h3>
          <ul className={styles.list}>
            <li>The Open University of Japan (B.A.)</li>
            <li>The University of Tokyo</li>
            <li>Code Chrysalis</li>
          </ul>
          <h3>Skills</h3>
          <ul className={styles.list}>
            <li>Python</li>
            <li>TypeScript, React, Next.js</li>
            <li>AWS</li>
            <li>Agile Development</li>
          </ul>
        </div>
      </div>
    </section>
  </RevealWrapper>
);

export { About };
