"use client";

import Image from "next/image";
import { RevealWrapper } from "next-reveal";

import Me from "../../public/me.webp";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./About.module.scss";

const About: React.FC = () => {
  const shouldAnimate = !useReducedMotion();

  const content = (
    <section className={styles.aboutSection} id="about">
      <h2 className={styles.title}>About Me</h2>

      <div className={styles.inner}>
        <div className={styles.pic}>
          <div className={styles.wrapper}>
            <Image alt="Yusuke Hayashi" className={styles.img} src={Me} />
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.hello}>
            <p>
              Software Engineer focused on shipping AI-enabled business
              applications that get adopted in production. I support teams from
              workflow definition to production rollout across web, cloud, and
              AI.
            </p>
          </div>

          <h3>Experiences</h3>

          <ul className={styles.list}>
            <li>
              <a href="https://www.haya.company/">haya Inc.</a> (Founder /
              Consultant) 2025~
            </li>

            <li>LayerX (Contract: GenAI feature delivery) 2024~2025</li>

            <li>Executive Dev Manager @ QuickWork 2021~2022</li>

            <li>Software Engineer @ Sony / SIE 2018~2021</li>
          </ul>

          <h3>Education</h3>

          <ul className={styles.list}>
            <li>The Open University of Japan (B.A.)</li>

            <li>The University of Tokyo (Integrated Science)</li>
          </ul>

          <h3>Skills</h3>

          <ul className={styles.list}>
            <li>AI-enabled product delivery (LLM / RAG, evaluation)</li>

            <li>Workflow design &amp; system integration</li>

            <li>Architecture &amp; production rollout</li>
          </ul>
        </div>
      </div>
    </section>
  );

  return shouldAnimate ? <RevealWrapper>{content}</RevealWrapper> : content;
};

export { About };
