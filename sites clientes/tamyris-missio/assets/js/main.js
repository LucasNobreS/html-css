/* Interações opcionais. O site (conteúdo, navegação e contatos) funciona sem este arquivo. */
(function () {
  'use strict';

  /* 1. Menu móvel acessível */
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('menu-principal');
  if (btn && nav) {
    var fechar = function (devolverFoco) {
      nav.classList.remove('aberto');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('.menu-btn-rotulo').textContent = 'Menu';
      if (devolverFoco) { btn.focus(); }
    };
    btn.addEventListener('click', function () {
      var aberto = btn.getAttribute('aria-expanded') === 'true';
      if (aberto) { fechar(false); return; }
      nav.classList.add('aberto');
      btn.setAttribute('aria-expanded', 'true');
      btn.querySelector('.menu-btn-rotulo').textContent = 'Fechar';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { fechar(true); }
    });
  }

  /* 2. Revelação suave ao rolar (desligada com prefers-reduced-motion) */
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var itens = document.querySelectorAll('.reveal');
  if (!reduz && 'IntersectionObserver' in window && itens.length) {
    document.documentElement.classList.add('js-reveal');
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visivel'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    itens.forEach(function (el) { obs.observe(el); });
  }
})();
