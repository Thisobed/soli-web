/* SOLI · aviso de cookies + analítica (25-sep-2026)
 *
 * La analítica es Cloudflare Web Analytics: anónima y SIN cookies. Solo se
 * carga si la persona presiona "Aceptar" en el aviso (su elección se
 * guarda en este navegador). Para cambiarla, el enlace "Cookies" del pie
 * de página vuelve a abrir el aviso.
 *
 * CF_TOKEN: el token que da Cloudflare en Analytics & Logs → Web Analytics
 * → soli.com.mx (el valor de "token" dentro del código que te muestran).
 * Mientras esté vacío no se carga ninguna analítica.
 */
(function () {
  var CF_TOKEN = '9b45594e542e42b8a61f29908da86e46';
  var CLAVE = 'soli-consentimiento-v1';

  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }

  function cargarAnalitica() {
    if (!CF_TOKEN || document.getElementById('cf-beacon')) return;
    var s = document.createElement('script');
    s.id = 'cf-beacon';
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_TOKEN }));
    document.head.appendChild(s);
  }

  var css = '' +
    '.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:560px;margin:0 auto;background:#fff;color:#27272a;' +
    'border:1px solid #f38004;border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.14);padding:20px 22px;display:flex;flex-direction:column;gap:14px;' +
    'font:15px/1.55 Inter,system-ui,sans-serif}' +
    '.ck p{margin:0}.ck a{color:#0a0a0a;text-decoration:underline;text-decoration-color:#f38004;text-underline-offset:3px}' +
    '.ck-b{display:flex;gap:10px;flex-wrap:wrap}' +
    '.ck button{font:inherit;font-size:15px;font-weight:500;min-height:44px;padding:10px 18px;border-radius:6px;cursor:pointer}' +
    '.ck .si{background:#0a0a0a;color:#fff;border:1px solid #0a0a0a}.ck .si:hover{background:#27272a}' +
    '.ck .no{background:#fff;color:#0a0a0a;border:1px solid #d4d4d8}.ck .no:hover{border-color:#0a0a0a}' +
    '.ck button:focus-visible{outline:3px solid rgba(243,128,4,.45);outline-offset:2px}' +
    '@media (prefers-reduced-motion:no-preference){.ck{animation:ckIn .25s ease-out both}}' +
    '@keyframes ckIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}';

  function mostrarAviso() {
    if (document.getElementById('ck')) return;
    if (!document.getElementById('ck-css')) {
      var st = document.createElement('style'); st.id = 'ck-css'; st.textContent = css; document.head.appendChild(st);
    }
    var d = document.createElement('div');
    d.id = 'ck'; d.className = 'ck';
    d.setAttribute('role', 'region'); d.setAttribute('aria-label', 'Aviso de cookies');
    d.innerHTML =
      '<p>Usamos una analítica <strong>anónima y sin cookies de publicidad</strong> para saber cuántas personas visitan el sitio. ' +
      'No guardamos quién eres. <a href="/privacidad.html#cookies">Más información sobre cookies</a></p>' +
      '<div class="ck-b"><button type="button" class="si">Aceptar</button><button type="button" class="no">Rechazar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.si').addEventListener('click', function () { guardar('si'); d.remove(); cargarAnalitica(); });
    d.querySelector('.no').addEventListener('click', function () { guardar('no'); d.remove(); });
  }

  function iniciar() {
    var v = leer();
    if (v === 'si') cargarAnalitica();
    else if (v !== 'no') mostrarAviso();
    document.querySelectorAll('[data-cookies]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); mostrarAviso(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
