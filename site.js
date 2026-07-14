// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navToggleIcon = document.getElementById("navToggleIcon");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  const closeNav = () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (navToggleIcon) navToggleIcon.textContent = "menu";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (navToggleIcon) navToggleIcon.textContent = isOpen ? "close" : "menu";
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
}

// Nav "Achievements" dropdown
const dropdownTriggers = document.querySelectorAll(".nav-dropdown-trigger");

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = trigger.closest(".nav-item--dropdown");
    const isOpen = item.classList.contains("is-open");

    document.querySelectorAll(".nav-item--dropdown").forEach((el) => {
      el.classList.remove("is-open");
      el.querySelector(".nav-dropdown-trigger")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".nav-item--dropdown").forEach((el) => {
    el.classList.remove("is-open");
    el.querySelector(".nav-dropdown-trigger")?.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections on scroll
const revealTargets = document.querySelectorAll("section");
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => io.observe(el));

// Journey / timeline cards expand
const journeyCards = document.querySelectorAll(".journey-card-inner");

journeyCards.forEach((card) => {
  const btn = card.querySelector(".journey-expand");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const isOpening = !card.classList.contains("is-open");

    journeyCards.forEach((c) => {
      c.classList.remove("is-open");
      const b = c.querySelector(".journey-expand");
      if (b) b.setAttribute("aria-expanded", "false");
    });

    if (isOpening) {
      card.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// Designs "View more"
const designsReveal = document.querySelector(".designs-reveal");
const designsBtn = document.querySelector(".designs-more-btn");

if (designsReveal && designsBtn) {
  designsReveal.classList.add("is-collapsed");

  designsBtn.addEventListener("click", () => {
    const expanded = designsReveal.classList.contains("is-expanded");

    designsReveal.classList.toggle("is-expanded", !expanded);
    designsReveal.classList.toggle("is-collapsed", expanded);

    designsBtn.textContent = expanded ? "View more" : "View less";
    designsBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
}

// Achievements "Details" expand
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  const btn = card.querySelector(".project-expand");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const opening = !card.classList.contains("is-open");

    projectCards.forEach((c) => {
      c.classList.remove("is-open");
      const b = c.querySelector(".project-expand");
      if (b) b.setAttribute("aria-expanded", "false");
    });

    if (opening) {
      card.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
