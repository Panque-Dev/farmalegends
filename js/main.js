/**
 * ACADEMIA ARCANA HEXTECH - FARMACOLOGÍA MÉDICA
 * Script Principal de Navegación & Control Global
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Vinculación y validación de navegación activa
  const rawPath = window.location.pathname.split('/').pop() || 'index.html';
  let currentFile = 'index.html';
  try {
    currentFile = decodeURIComponent(rawPath);
  } catch (e) {
    currentFile = rawPath;
  }
  
  const navMap = {
    'index.html': 'aula-magna',
    'medicamentos.html': 'compendio-farmacologico',
    'receptores.html': 'laboratorio-de-simulacion',
    'dosis-y-recetario.html': 'dosis-y-recetario',
    'code.html': 'laboratorio-de-simulacion',
    'casos-clínicos.html': 'casos-clinicos',
    'epilepsia.html': 'farmalegends-epilepsia',
    'dopamina.html': 'moduladores-dopaminergicos',
    'casos-clinicos.html': 'casos-clinicos'
  };

  const activeKey = navMap[currentFile] || navMap[rawPath] || 'aula-magna';

  // Resaltar elementos activos en la navegación superior y lateral
  document.querySelectorAll(`[data-path="${activeKey}"]`).forEach(el => {
    if (el.tagName === 'A') {
      el.setAttribute('aria-current', 'page');
      if (el.closest('header')) {
        el.className = 'px-space-md py-space-sm transition-colors font-label-lg text-label-lg tracking-wider uppercase bg-primary-container text-on-primary-container font-bold shadow-[0_0_12px_rgba(200,170,110,0.35)]';
      } else if (el.closest('aside')) {
        el.className = 'flex items-center gap-space-sm px-space-md py-space-sm bg-primary-container text-on-primary-container font-semibold transition-colors rounded shadow-sm';
      }
    }
  });

  // Navegación compacta para teléfonos y tabletas.
  const header = document.querySelector('header');
  if (header) {
    const menuItems = [
      ['Aula Magna', 'index.html', 'aula-magna'],
      ['Compendio farmacológico', 'medicamentos.html', 'compendio-farmacologico'],
      ['Laboratorio de simulación', 'receptores.html', 'laboratorio-de-simulacion'],
      ['Dosis y recetario', 'dosis-y-recetario.html', 'dosis-y-recetario'],
      ['Casos clínicos', 'casos-clínicos.html', 'casos-clinicos'],
      ['Epilepsia', 'epilepsia.html', 'farmalegends-epilepsia'],
      ['Parkinson y esquizofrenia', 'dopamina.html', 'moduladores-dopaminergicos']
    ];
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Abrir navegación del aula');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-aula-nav');
    toggle.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">menu</span>';

    const mobileNav = document.createElement('nav');
    mobileNav.id = 'mobile-aula-nav';
    mobileNav.className = 'mobile-aula-nav';
    mobileNav.setAttribute('aria-label', 'Navegación principal');
    menuItems.forEach(([label, href, path]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.dataset.path = path;
      if (path === activeKey) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      }
      mobileNav.appendChild(link);
    });
    header.appendChild(toggle);
    document.body.appendChild(mobileNav);

    const closeMenu = () => {
      mobileNav.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir navegación del aula');
      toggle.querySelector('span').textContent = 'menu';
    };
    toggle.addEventListener('click', () => {
      const open = mobileNav.dataset.open !== 'true';
      mobileNav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar navegación del aula' : 'Abrir navegación del aula');
      toggle.querySelector('span').textContent = open ? 'close' : 'menu';
    });
    mobileNav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target) && !mobileNav.contains(event.target)) closeMenu();
    });
  }

  // Barras de progreso declaradas como datos en el HTML, no como estilos en línea.
  document.querySelectorAll('[data-progress]').forEach(bar => {
    const progress = Number(bar.dataset.progress);
    if (Number.isFinite(progress)) {
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });

  // Acciones delegadas para mantener los atributos de comportamiento fuera del HTML.
  const runAulaAction = element => {
    const { aulaAction, itemName, itemDescription } = element.dataset;
    if (aulaAction === 'inject-item' && typeof window.injectItem === 'function') {
      window.injectItem(itemName, itemDescription);
    } else if (aulaAction === 'clear-log' && typeof window.clearLog === 'function') {
      window.clearLog();
    }
  };

  document.addEventListener('click', event => {
    const action = event.target.closest('[data-aula-action]');
    if (action) runAulaAction(action);
  });

  document.addEventListener('keydown', event => {
    const action = event.target.closest('[data-aula-action="inject-item"]');
    if (!action || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    runAulaAction(action);
  });

  // 2. Control del Sintonizador de Resonancia Arcana (Tuner Dock)
  const tunerBtn = document.getElementById('btn-toggle-tuner-dock');
  const tunerPanel = document.getElementById('arcane-tuner-panel');

  if (tunerBtn && tunerPanel) {
    tunerBtn.addEventListener('click', () => {
      const isHidden = tunerPanel.classList.toggle('hidden');
      tunerBtn.setAttribute('aria-expanded', !isHidden);
      const icon = tunerBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  }

  // 3. Atajos de teclado para navegación rápida entre módulos (1 al 5)
  document.addEventListener('keydown', (e) => {
    // Si el usuario está escribiendo en un input o textarea, ignorar
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    const keyRoutes = {
      '1': 'index.html',
      '2': 'medicamentos.html',
      '3': 'receptores.html',
      '4': 'dosis-y-recetario.html',
      '5': 'casos-clínicos.html',
      '6': 'epilepsia.html',
      '7': 'dopamina.html'
    };

    if (keyRoutes[e.key]) {
      window.location.href = keyRoutes[e.key];
    }
  });
});

