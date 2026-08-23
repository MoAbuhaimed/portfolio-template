/**
 * main.js
 * Lightweight, dependency-free UI behaviors:
 *  - Navbar "scrolled" state
 *  - Scroll progress indicator
 *  - Active nav-link highlighting on scroll
 *  - Reveal-on-scroll for .reveal elements
 * Respects prefers-reduced-motion for anything animation-related.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var navbar = document.getElementById("mainNav");
  var progressBar = document.getElementById("scrollProgress");
  var navLinks = document.querySelectorAll("[data-nav-links] .nav-link");
  var sections = document.querySelectorAll("main section[id]");
  var themeToggle = document.getElementById("themeToggle");

  /* ---------- Theme toggle (persisted via localStorage) ---------- */
  if (themeToggle) {
    var syncToggleState = function () {
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    };

    syncToggleState();

    themeToggle.addEventListener("click", function () {
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
      try {
        localStorage.setItem("theme", isLight ? "dark" : "light");
      } catch (e) {}
      syncToggleState();
    });
  }

  /* ---------- Navbar scrolled state + scroll progress ---------- */
  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 12);
    }

    if (progressBar) {
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + "%";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (!revealEls.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
})();
