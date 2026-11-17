/* Static snapshot transport for the original Next.js navigation protocol. */
(() => {
  'use strict';
  const routes = new Set(['home', 'on-field', 'off-field', 'foundation', 'partnerships', 'journal', 'inquiries', 'privacy', 'terms']);
  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, options) {
    const address = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    const url = new URL(address, location.href);
    const headers = new Headers(options?.headers || (input instanceof Request ? input.headers : undefined));
    if (url.origin === location.origin && (headers.get('RSC') === '1' || url.searchParams.has('_rsc'))) {
      const route = url.pathname.replace(/^\/+|\/+$/g, '') || 'home';
      if (routes.has(route)) {
        const snapshot = await originalFetch('/_replica/flight/' + route + '.txt?rp='+"rp5", { signal: options?.signal || (input instanceof Request ? input.signal : undefined) });
        if (!snapshot.ok) return originalFetch(input, options);
        const response = new Response(snapshot.body, { status: 200, headers: { 'Content-Type': 'text/x-component; charset=utf-8', 'X-Nextjs-Stale-Time': '300' } });
        Object.defineProperty(response, 'url', { value: url.href });
        return response;
      }
    }
    return originalFetch(input, options);
  };
})();

/* Integrate product links into the preserved editorial card choreography. */
(() => {
  'use strict';
  let products = [];
  let observer;
  let pending;
  let catalogReady = false;
  document.documentElement.dataset.rpRoute = location.pathname.replace(/\/$/, '') || '/';
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const shortName = product => product.name.replace(/^Oversized\s*-\s*/, '');
  function decorate() {
    const route = location.pathname.replace(/\/$/, '') || '/';
    document.documentElement.dataset.rpRoute = route;
    document.querySelectorAll('[data-home-moments] [data-card-box]').forEach((card, index) => {
      const p = products[index % products.length];
      if (!p) return;
      card.dataset.rpProduct = p.url;
      card.dataset.cursor = 'Ver peça';
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', 'Ver ' + shortName(p) + ' na Berzerk');
    });
    document.querySelectorAll('[data-hero-card]').forEach(card => {
      if (products[0]) { card.dataset.rpProduct = products[0].url; card.setAttribute('aria-label','Ver camiseta Archangel na Berzerk'); }
    });
    if (route !== '/on-field') { catalogReady = false; document.querySelectorAll('.rp-catalog').forEach(el => el.remove()); return; }
    if (!catalogReady || !products.length || document.getElementById('rp-catalog')) return;
    const anchor = document.querySelector('[data-section="on-career"]') || document.querySelector('[data-section="on-cleats"]');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = 'rp-catalog';
    section.className = 'rp-catalog';
    section.setAttribute('aria-labelledby','rp-catalog-title');
    section.innerHTML = '<div class="rp-catalog-head"><div><p class="rp-eyebrow">Roberto Pereira / Seleção Berzerk / 06 peças</p><h2 id="rp-catalog-title">Vista a sua presença.</h2></div><p class="rp-catalog-intro">Estampas que falam por você. Uma seleção pessoal de oversized, entre a arte e a rua.</p></div><div class="rp-filters" aria-label="Filtrar camisetas"><button type="button" class="rp-filter" data-rp-filter="all" aria-pressed="true">Todas</button><button type="button" class="rp-filter" data-rp-filter="arte" aria-pressed="false">Arte & atitude</button><button type="button" class="rp-filter" data-rp-filter="essenciais" aria-pressed="false">Essenciais</button></div><div class="rp-product-grid">' + products.map((p,i) => '<a class="rp-product" data-rp-kind="' + (p.handle.includes('lettering')?'essenciais':'arte') + '" href="' + escape(p.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Ver ' + escape(shortName(p)) + ' na Berzerk"><div class="rp-product-photo"><span class="rp-product-num">RP / 0' + (i+1) + '</span><img src="' + escape(p.photos[0]) + '" alt="Camiseta Berzerk ' + escape(shortName(p)) + '" loading="lazy" decoding="async"><span class="rp-product-arrow" aria-hidden="true">↗</span></div><div class="rp-product-meta"><h3>' + escape(shortName(p)) + '</h3><span>Ver na Berzerk ↗</span></div></a>').join('') + '</div><p class="rp-catalog-note">A escolha é sua. Tamanhos, preços e disponibilidade são apresentados pela loja Berzerk ao abrir cada peça.</p>';
    anchor.before(section);
    window.dispatchEvent(new Event('resize'));
  }
  function schedule() { clearTimeout(pending); pending = setTimeout(decorate, 120); }
  function ready() {
    fetch('/roberto/products.json?rp=rp5').then(r => { if (!r.ok) throw Error('Product manifest unavailable'); return r.json(); }).then(value => {products = value; decorate();}).catch(() => {});
    observer = new MutationObserver(schedule);
    observer.observe(document.body,{subtree:true,childList:true});
    decorate();
  }
  document.addEventListener('click', event => {
    const filter = event.target.closest?.('[data-rp-filter]');
    if (filter) {
      const section = filter.closest('.rp-catalog');
      section.querySelectorAll('[data-rp-filter]').forEach(button => button.setAttribute('aria-pressed',String(button===filter)));
      section.querySelectorAll('[data-rp-kind]').forEach(card => {card.hidden = filter.dataset.rpFilter !== 'all' && card.dataset.rpKind !== filter.dataset.rpFilter;});
      window.dispatchEvent(new Event('resize'));
      return;
    }
    const card = event.target.closest?.('[data-rp-product]');
    if (!card || event.button !== 0) return;
    event.preventDefault(); event.stopImmediatePropagation();
    window.open(card.dataset.rpProduct,'_blank','noopener,noreferrer');
  },true);
  document.addEventListener('keydown', event => {
    const card = event.target.closest?.('[data-rp-product]');
    if (!card || !['Enter',' '].includes(event.key)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    window.open(card.dataset.rpProduct,'_blank','noopener,noreferrer');
  },true);
  addEventListener('popstate', schedule);
  addEventListener('rp:catalog-ready', () => {catalogReady = true; schedule();});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',ready,{once:true}); else ready();
})();
