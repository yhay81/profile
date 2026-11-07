// The site navigates with native cross-document View Transitions rather than
// Astro's client router, so this module runs once per document load. Astro's
// router events such as `astro:page-load` are never dispatched here.
const ROOT_SELECTOR = "[data-work-catalog]";
const GROUP_SELECTOR = "details.catalogGroup";

function hashTarget(root: HTMLElement) {
  let id: string;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    // Malformed percent-encoding cannot name an element.
    return null;
  }

  const target = id ? document.getElementById(id) : null;
  return target && root.contains(target) ? target : null;
}

function alignTarget(target: HTMLElement) {
  // Align after the opened collection has been laid out. Browsers that reveal
  // fragment targets inside closed <details> natively still skip this scroll.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  });
}

function enhanceWorkCatalog(root: HTMLElement) {
  const groups = root.querySelectorAll<HTMLDetailsElement>(GROUP_SELECTOR);
  if (groups.length === 0) return;

  const revealHashTarget = () => {
    const target = hashTarget(root);
    if (!target) return;

    const group = target.closest<HTMLDetailsElement>(GROUP_SELECTOR);
    if (group) group.open = true;

    alignTarget(target);
  };

  for (const group of groups) {
    group.addEventListener("toggle", () => {
      if (!group.open) return;

      // Keep a fragment that already points into this collection, including
      // one the browser revealed natively. Otherwise make the opened
      // collection shareable without adding a history entry.
      const target = hashTarget(root);
      if (target && group.contains(target)) return;

      window.history.replaceState(null, "", `#${group.id}`);
    });
  }

  window.addEventListener("hashchange", revealHashTarget);
  revealHashTarget();
}

for (const root of document.querySelectorAll<HTMLElement>(ROOT_SELECTOR)) {
  enhanceWorkCatalog(root);
}
