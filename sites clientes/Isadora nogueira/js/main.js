/* ==========================================================================
   Isadora Nogueira — Advocacia Médica
   JavaScript principal (vanilla, sem dependências)
   ========================================================================== */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Menu mobile
     ----------------------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var closeBtn = document.querySelector("[data-menu-close]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var body = document.body;

  function openMenu() {
    if (!mobileNav) return;
    mobileNav.classList.add("is-open");
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    var firstLink = mobileNav.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", openMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
  if (mobileNav) {
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Marcar link ativo na navegação (aria-current)
     já é definido estaticamente no HTML por página, mas reforça no client
     caso a página seja aberta com hash/query.
     ----------------------------------------------------------------------- */

  /* -----------------------------------------------------------------------
     Ano corrente no rodapé
     ----------------------------------------------------------------------- */
  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    var currentYear = String(new Date().getFullYear());
    yearEls.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  /* -----------------------------------------------------------------------
     Compartilhamento de artigos: Web Share API com fallback de copiar link
     ----------------------------------------------------------------------- */
  var shareButtons = document.querySelectorAll("[data-share]");
  shareButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var url = btn.getAttribute("data-share-url") || window.location.href;
      var title = document.title;

      if (navigator.share) {
        e.preventDefault();
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        e.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () {
            var original = btn.textContent;
            btn.textContent = "Link copiado";
            setTimeout(function () {
              btn.textContent = original;
            }, 2000);
          });
        }
      }
    });
  });

  /* -----------------------------------------------------------------------
     Cabeçalho: leve sombra ao rolar (apenas classe, sem custo de layout)
     ----------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var lastState = false;
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastState) {
        header.style.boxShadow = scrolled
          ? "0 1px 0 rgba(33,40,66,0.08)"
          : "none";
        lastState = scrolled;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
