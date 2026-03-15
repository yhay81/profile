"use client";

import Image from "next/image";

import Me from "../../public/me.webp";
import styles from "./About.module.scss";

const EXPERIENCE = [
  {
    period: "2025~",
    periodStartIso: "2025-01-01",
    role: "Founder / AI Adoption Consultant",
    company: "haya Inc.",
    description:
      "Leading AI adoption consulting for teams and founders by planning, piloting, and scaling GenAI solutions.",
  },
	  {
	    period: "2025~2026",
	    periodStartIso: "2025-01-01",
	    periodEndIso: "2026-12-31",
	    role: "Contract Engineer",
	    company: "GenerativeX",
	    description:
	      "Supported consulting initiatives by providing engineering execution support for AI adoption and practical rollout planning.",
	  },
	  {
	    period: "2024~2025",
	    periodStartIso: "2024-01-01",
	    periodEndIso: "2025-12-31",
	    role: "Contract Engineer",
	    company: "LayerX",
    description:
      "Delivered GenAI features with production-safe rollout practices and measurable quality metrics.",
  },
	  {
	    period: "2021~2022",
	    periodStartIso: "2021-01-01",
	    periodEndIso: "2022-12-31",
	    role: "Executive Dev Manager",
	    company: "QuickWork",
    description:
      "Led feature prioritization, delivery quality, and cloud-native architecture alignment.",
  },
  {
    period: "2018~2021",
    periodStartIso: "2018-01-01",
    role: "Software Engineer",
    company: "Sony / SIE",
    description:
      "Designed and maintained scalable services with a strong emphasis on reliability and user value.",
  },
] as const;

const EDUCATION = [
  "The Open University of Japan (B.A.)",
  "The University of Tokyo (Integrated Science)",
] as const;

const SKILLS = [
  {
    name: "AI",
    items: [
      "LLM integration",
      "RAG pipelines",
      "AI evaluation",
      "Prompt design",
    ],
  },
  {
    name: "Engineering",
    items: [
      "TypeScript / React / Next.js",
      "Node.js / SQL / API design",
      "Cloud infrastructure",
    ],
  },
  {
    name: "Product Delivery",
    items: ["Workflow design", "Team enablement", "Production rollout"],
  },
] as const;

const About: React.FC = () => (
  <section className={styles.aboutSection} id="about">
    <p className={styles.sectionLabel}>
      <span className={styles.sectionNo}>01</span>
      <span className={styles.sectionText}>About</span>
    </p>

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
            applications that get adopted in production. At haya, I also run
            AI-adoption consulting: from workflow redesign to rollout and
            adoption support across teams.
          </p>
        </div>

        <h3>Experiences</h3>

        <ol className={styles.timeline}>
          {EXPERIENCE.map((item) => (
            <li
              className={styles.timelineItem}
              key={`${item.period}-${item.company}`}
            >
              <time
                className={styles.timelinePeriod}
                dateTime={item.periodStartIso}
              >
                {item.period}
              </time>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineRole}>
                  {item.role} <span>@ {item.company}</span>
                </h4>
                <p className={styles.timelineText}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3>Education</h3>

        <ul className={styles.list}>
          {EDUCATION.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3>Skills</h3>

        <div className={styles.skillGrid}>
          {SKILLS.map((group) => (
            <section className={styles.skillBlock} key={group.name}>
              <h4 className={styles.skillTitle}>{group.name}</h4>

              <ul className={`${styles.list} ${styles.chipList}`}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export { About };
