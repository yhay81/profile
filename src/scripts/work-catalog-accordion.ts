const ROOT_SELECTOR = "[data-work-catalog]";
const GROUP_SELECTOR = "details.catalogGroup";

function hashTarget(root: HTMLElement) {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const target = hash ? document.getElementById(hash) : null;

  return target && root.contains(target) ? target : null;
}

function groupForTarget(target: HTMLElement) {
  return target.matches(GROUP_SELECTOR)
    ? (target as HTMLDetailsElement)
    : target.closest<HTMLDetailsElement>(GROUP_SELECTOR);
}

function alignTarget(target: HTMLElement) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  });
}

function enhanceWorkCatalog(root: HTMLElement) {
  if (root.dataset.workCatalogReady === "true") return;

  const groups = [...root.querySelectorAll<HTMLDetailsElement>(GROUP_SELECTOR)];
  if (groups.length === 0) return;

  const hashOpenedGroups = new WeakSet<HTMLDetailsElement>();

  const revealHashTarget = () => {
    const target = hashTarget(root);
    if (!target) return;

    const group = groupForTarget(target);
    if (group && !group.open) {
      hashOpenedGroups.add(group);
      group.open = true;
    }

    alignTarget(target);
  };

  groups.forEach((group) => {
    group.addEventListener("toggle", () => {
      if (hashOpenedGroups.delete(group) || !group.open) return;
      window.history.replaceState(null, "", `#${group.id}`);
    });
  });

  const abortController = new AbortController();
  window.addEventListener("hashchange", revealHashTarget, {
    signal: abortController.signal,
  });
  document.addEventListener(
    "astro:before-swap",
    () => abortController.abort(),
    { once: true, signal: abortController.signal },
  );

  root.dataset.workCatalogReady = "true";
  revealHashTarget();
}

function enhanceWorkCatalogs() {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
    enhanceWorkCatalog(root);
  });
}

document.addEventListener("astro:page-load", enhanceWorkCatalogs);
