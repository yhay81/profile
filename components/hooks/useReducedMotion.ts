"use client";

import { useEffect, useState } from "react";

const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
};

export { useReducedMotion };
