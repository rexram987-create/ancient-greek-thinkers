function closeAllModals() {
  document.querySelectorAll(".source-modal, .oath-modal").forEach((modal) => {
    modal.classList.remove("is-open");
  });
  document.body.style.overflow = "";
}

function openModal(modal) {
  if (!modal) return;
  closeAllModals();
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(document.getElementById(button.dataset.openModal)));
});

[
  ["openSource", "sourceModal"],
  ["openOath", "oathModal"],
].forEach(([buttonId, modalId]) => {
  document.getElementById(buttonId)?.addEventListener("click", () => openModal(document.getElementById(modalId)));
});

document.querySelectorAll("[data-close-modal], #closeSource, #closeOath").forEach((button) => {
  button.addEventListener("click", closeAllModals);
});

document.querySelectorAll(".source-modal, .oath-modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeAllModals();
  });

  modal.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      modal.querySelectorAll(".tab-button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      modal.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === `tab-${tab}` || panel.id === `${modal.id}-${tab}`);
      });
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAllModals();
});
