"use client";

import { Icon } from "@components";
import { PROFILE_EMAIL, PROFILE_SOCIAL_LINKS } from "@lib";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Contact.module.scss";

const COPY_STATUS_DELAY_MS = 1600;

const Contact: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "done" | "error">(
    "idle",
  );
  const resetTimerRef = useRef<number | NodeJS.Timeout | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const startResetTimer = useCallback(
    (callback: () => void) => {
      clearResetTimer();
      resetTimerRef.current = window.setTimeout(() => {
        callback();
        resetTimerRef.current = null;
      }, COPY_STATUS_DELAY_MS);
    },
    [clearResetTimer],
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      if (typeof navigator.clipboard?.writeText !== "function") {
        throw new Error("clipboard unavailable");
      }

      await navigator.clipboard.writeText(PROFILE_EMAIL);
      setCopyStatus("done");
      startResetTimer(() => {
        setCopyStatus("idle");
      });
      return;
    } catch {
      setCopyStatus("error");
      startResetTimer(() => setCopyStatus("idle"));
    }
  }, [startResetTimer]);

  useEffect(() => {
    return clearResetTimer;
  }, [clearResetTimer]);

  return (
    <section className={styles.contactSection} id="contact">
      <p className={styles.sectionLabel}>
        <span className={styles.sectionNo}>02</span>
        <span className={styles.sectionText}>Contact</span>
      </p>

      <h2 className={styles.title}>Contact</h2>

      <p className={styles.text}>
        Whether you have a question or just want to say hi, I&apos;ll try my
        best to get back to you.
      </p>

      <div className={styles.emailBlock}>
        <a className={styles.emailCard} href={`mailto:${PROFILE_EMAIL}`}>
          <Icon ariaId="contact-mail" name="Mail" />
          <span className={styles.emailText}>
            <span className={styles.emailAddress}>{PROFILE_EMAIL}</span>
            <span className={styles.emailLabel}>
              Preferred: first contact by email
            </span>
          </span>
        </a>

        <button
          className={`${styles.copyButton} ${
            copyStatus === "error" ? styles.copyButtonError : ""
          }`}
          onClick={handleCopyEmail}
          type="button"
        >
          <Icon ariaId="contact-copy-mail" name="Mail" />
          {copyStatus === "done"
            ? "Copied"
            : copyStatus === "error"
              ? "Copy failed"
              : "Copy"}
        </button>
      </div>

      <p
        aria-atomic="true"
        aria-live="polite"
        className={styles.copyStatus}
        role="status"
      >
        {copyStatus === "done"
          ? "Copied"
          : copyStatus === "error"
            ? "Copy failed"
            : ""}
      </p>

      <div className={styles.links}>
        {PROFILE_SOCIAL_LINKS.map((link) => (
          <a
            className={styles.link}
            href={link.url}
            key={link.id}
            rel={link.external ? "noopener noreferrer" : undefined}
            target={link.external ? "_blank" : undefined}
          >
            <Icon
              ariaId={`contact-${link.name.toLowerCase()}`}
              name={link.icon}
            />
            <span className={styles.linkText}>
              <span className={styles.linkName}>{link.name}</span>
              <span className={styles.linkDescription}>{link.description}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export { Contact };
