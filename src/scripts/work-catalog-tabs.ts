const ROOT_SELECTOR = "[data-work-catalog-tabs]";
const TAB_SELECTOR = "[data-catalog-tab]";
const PANEL_SELECTOR = "[data-catalog-panel]";

function panelFromHash(root: HTMLElement, panels: HTMLElement[]) {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const target = hash ? document.getElementById(hash) : null;
  const panel = target?.matches(PANEL_SELECTOR)
    ? target
    : target?.closest<HTMLElement>(PANEL_SELECTOR);

  return panel && root.contains(panel) ? panels.indexOf(panel) : -1;
}

function alignHashTarget(root: HTMLElement) {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const target = hash ? document.getElementById(hash) : null;

  if (!target || !root.contains(target)) return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  });
}

function enhanceWorkCatalog(root: HTMLElement) {
  if (root.dataset.workTabsReady === "true") return;

  const tabList = root.querySelector<HTMLOListElement>(
    "[data-catalog-tab-list]",
  );
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>(TAB_SELECTOR)];
  const panels = [...root.querySelectorAll<HTMLElement>(PANEL_SELECTOR)];

  if (!tabList || tabs.length === 0 || tabs.length !== panels.length) return;

  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", "Work collections");
  tabList.querySelectorAll(":scope > li").forEach((item) => {
    item.setAttribute("role", "presentation");
  });

  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[index].id);
  });

  panels.forEach((panel, index) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabs[index].id);
  });

  const activate = (
    index: number,
    options: { focus?: boolean; updateHash?: boolean } = {},
  ) => {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== index;
    });

    const tab = tabs[index];
    const panel = panels[index];

    tab.scrollIntoView({ block: "nearest", inline: "nearest" });

    if (options.focus) {
      tab.focus();
    }

    if (options.updateHash) {
      window.history.replaceState(null, "", `#${panel.id}`);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      activate(index, { updateHash: true });
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex: number;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(nextIndex, { focus: true, updateHash: true });
    });
  });

  const abortController = new AbortController();
  window.addEventListener(
    "hashchange",
    () => {
      const index = panelFromHash(root, panels);
      if (index >= 0) {
        activate(index);
        alignHashTarget(root);
      }
    },
    { signal: abortController.signal },
  );
  document.addEventListener(
    "astro:before-swap",
    () => abortController.abort(),
    { once: true, signal: abortController.signal },
  );

  root.dataset.workTabsReady = "true";
  const initialIndex = panelFromHash(root, panels);
  activate(initialIndex >= 0 ? initialIndex : 0);
  if (initialIndex >= 0) alignHashTarget(root);
}

function enhanceWorkCatalogs() {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
    enhanceWorkCatalog(root);
  });
}

document.addEventListener("astro:page-load", enhanceWorkCatalogs);
enhanceWorkCatalogs();
