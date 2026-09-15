/* ============================================================
   site.js – Arafat Payel Portfolio
   Handles: nav toggle, dropdown, journey card expand,
            project card expand, design gallery reveal,
            reveal-on-scroll animations.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. NAVIGATION – hamburger toggle
  ---------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navToggleIcon = document.getElementById("navToggleIcon");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
      if (navToggleIcon) {
        navToggleIcon.textContent = isOpen ? "close" : "menu";
      }
    });

    // Close nav when a link is clicked (mobile)
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        if (navToggleIcon) navToggleIcon.textContent = "menu";
      });
    });
  }

  /* ----------------------------------------------------------
     2. NAVIGATION – dropdown (Achievements)
  ---------------------------------------------------------- */
  document.querySelectorAll(".nav-item--dropdown").forEach(function (item) {
    const trigger = item.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-item--dropdown.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".nav-dropdown-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  });

  /* ----------------------------------------------------------
     3. JOURNEY CARDS – expand / collapse
  ---------------------------------------------------------- */
  document.querySelectorAll(".journey-card-inner").forEach(function (card) {
    const btn = card.querySelector(".journey-expand");
    if (!btn) return;

    function toggle() {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", isOpen);
      btn.setAttribute("aria-expanded", isOpen);
      const label = btn.querySelector(".journey-expand-label");
      if (label) label.textContent = isOpen ? "View less" : "View more";
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });

    // Also allow clicking the card body (excluding button) to toggle
    card.addEventListener("click", function (e) {
      if (e.target.closest(".journey-expand")) return;
      if (e.target.closest("a")) return;
      toggle();
    });

    // Keyboard accessibility
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ----------------------------------------------------------
     4. PROJECT CARDS – expand / collapse
  ---------------------------------------------------------- */
  document.querySelectorAll(".project-expand").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = btn.closest(".project-card");
      if (!card) return;
      const isOpen = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen);
      btn.textContent = isOpen ? "Less" : "Details";
    });
  });

  /* ----------------------------------------------------------
     5. DESIGN GALLERY – collapsed / expanded reveal
  ---------------------------------------------------------- */
  const designsReveal = document.querySelector(".designs-reveal");
  const designsMoreBtn = document.querySelector(".designs-more-btn");

  if (designsReveal && designsMoreBtn) {
    // Start collapsed
    designsReveal.classList.add("is-collapsed");

    designsMoreBtn.addEventListener("click", function () {
      const isExpanded = designsReveal.classList.toggle("is-expanded");
      designsReveal.classList.toggle("is-collapsed", !isExpanded);
      designsMoreBtn.setAttribute("aria-expanded", isExpanded);
      designsMoreBtn.textContent = isExpanded ? "View less" : "View more";
    });
  }

  /* ----------------------------------------------------------
     6. REVEAL ON SCROLL – IntersectionObserver
  ---------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(
      ".journey-card, .project-card, .skills-card, .academic-card, .summary-card, .design-float-card"
    );

    revealEls.forEach(function (el) {
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
