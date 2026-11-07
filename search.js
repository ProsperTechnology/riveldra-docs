(() => {
  const menu = document.getElementById("docs-nav");
  if (menu && matchMedia("(max-width: 760px)").matches) menu.open = false;
  const input = document.getElementById("doc-search"),
    panel = document.getElementById("search-results");
  if (!input || !panel) return;
  function close() {
    panel.hidden = true;
  }
  input.addEventListener("input", () => {
    const query = input.value.trim().toLocaleLowerCase();
    panel.replaceChildren();
    if (query.length < 2) {
      close();
      return;
    }
    const found = (window.RiveldraDocsIndex || [])
      .filter((page) =>
        (page.title + " " + page.text).toLocaleLowerCase().includes(query),
      )
      .slice(0, 7);
    const status = document.createElement("p");
    status.className = "search-status";
    status.setAttribute("role", "status");
    status.textContent = found.length
      ? found.length + " matching guides"
      : "No matching guides. Try “variants”, “filters” or “documents”.";
    panel.append(status);
    found.forEach((page) => {
      const link = document.createElement("a");
      link.href = page.url;
      const title = document.createElement("strong");
      title.textContent = page.title;
      const preview = document.createElement("span");
      const position = page.text.toLocaleLowerCase().indexOf(query);
      const start = Math.max(0, position - 35);
      preview.textContent =
        (start ? "…" : "") + page.text.slice(start, start + 145) + "…";
      link.append(title, preview);
      panel.append(link);
    });
    panel.hidden = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
      input.focus();
    }
  });
  input.closest(".search").addEventListener("keydown", (event) => {
    if (panel.hidden) return;
    const links = [...panel.querySelectorAll("a")];
    if (event.key === "ArrowDown") {
      event.preventDefault();
      links[
        (links.indexOf(document.activeElement) + 1) % links.length
      ]?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const index = links.indexOf(document.activeElement);
      if (index <= 0) input.focus();
      else links[index - 1].focus();
    }
  });
  input.closest(".search").addEventListener("focusout", () =>
    setTimeout(() => {
      if (!input.closest(".search").contains(document.activeElement)) close();
    }, 0),
  );
})();
