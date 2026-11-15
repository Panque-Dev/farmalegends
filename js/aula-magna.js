
  // STATE OBJECT FOR ARCANE SYSTEM
  const ArcaneState = {
    density: 'medium', // subtle, medium, overload
    enableGold: true,
    enablePulse: true,
    particleCounts: { subtle: 24, medium: 55, overload: 105 },
    mouse: { x: -1000, y: -1000, radius: 120 }
  };

  // 1. FLOATING ARCANE MANA & GOLD MOTES ENGINE
  (function initHextechParticles() {
    const canvas = document.getElementById('magic-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      ArcaneState.mouse.x = e.clientX - rect.left;
      ArcaneState.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      ArcaneState.mouse.x = -1000;
      ArcaneState.mouse.y = -1000;
    });

    const particles = [];

    function createParticle() {
      const isGold = ArcaneState.enableGold && Math.random() < 0.35;
      const baseColor = isGold 
        ? { r: 229, g: 197, b: 135 } // Alchemical Gold
        : (Math.random() < 0.6 ? { r: 67, g: 226, b: 210 } : { r: 10, g: 200, b: 185 }); // Hextech Cyan / Mana

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        originRadius: Math.random() * 2.2 + 0.9,
        radius: Math.random() * 2.2 + 0.9,
        color: baseColor,
        isGold: isGold,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.55 - 0.2,
        alpha: Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2,
        lifeSpan: Math.random() * 200 + 100
      };
    }

    function syncParticleCount() {
      const targetCount = ArcaneState.particleCounts[ArcaneState.density] || 55;
      while (particles.length < targetCount) {
        particles.push(createParticle());
      }
      while (particles.length > targetCount) {
        particles.pop();
      }
      const countEl = document.getElementById('particle-counter-display');
      if (countEl) countEl.textContent = `${particles.length} Orbes Activos`;
    }

    syncParticleCount();

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Pulse time factor
      const time = Date.now() * 0.002;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle floating movement
        p.x += p.vx + Math.sin(time + p.angle) * 0.2;
        p.y += p.vy;

        // Subtle repulsion from mouse cursor
        const dx = p.x - ArcaneState.mouse.x;
        const dy = p.y - ArcaneState.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < ArcaneState.mouse.radius && dist > 0) {
          const force = (ArcaneState.mouse.radius - dist) / ArcaneState.mouse.radius;
          p.x += (dx / dist) * force * 2.2;
          p.y += (dy / dist) * force * 2.2;
        }

        // Loop boundaries
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with soft glow
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(time * 3 + p.angle) * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.shadowBlur = p.isGold ? 10 : 8;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw occasional connection constellation lines between neighboring mana sparks
        if (ArcaneState.density === 'overload') {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p2 = particles[j];
            const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distBetween < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(67, 226, 210, ${0.15 * (1 - distBetween / 80)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(render);
    }
    render();

    window.refreshArcaneParticles = syncParticleCount;
  })();

  // 2. SINTONIZADOR DE RESONANCIA & CONTROLES
  (function initTunerControls() {
    const densityButtons = document.querySelectorAll('.tuner-density-btn');
    const toggleGoldBtn = document.getElementById('btn-toggle-gold');
    const togglePulseBtn = document.getElementById('btn-toggle-pulse');
    const iconGold = document.getElementById('icon-toggle-gold');
    const iconPulse = document.getElementById('icon-toggle-pulse');
    const dockToggleBtn = document.getElementById('btn-toggle-tuner-dock');
    const tunerPanel = document.getElementById('arcane-tuner-panel');
    const auraCyan = document.getElementById('ambient-aura-cyan');
    const auraGold = document.getElementById('ambient-aura-gold');

    // Density switch
    densityButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        densityButtons.forEach(b => {
          b.className = 'tuner-density-btn px-2.5 py-1 rounded font-label-sm uppercase tracking-wider text-[11px] text-on-surface-variant hover:text-on-surface transition-all';
        });
        btn.className = 'tuner-density-btn px-2.5 py-1 rounded font-label-sm uppercase tracking-wider text-[11px] bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(229,197,135,0.4)] transition-all';
        ArcaneState.density = btn.getAttribute('data-density');
        
        if (window.refreshArcaneParticles) window.refreshArcaneParticles();

        // Adjust aura intensity
        if (auraCyan && auraGold) {
          if (ArcaneState.density === 'overload') {
            auraCyan.style.opacity = '0.18';
            auraGold.style.opacity = '0.14';
          } else if (ArcaneState.density === 'subtle') {
            auraCyan.style.opacity = '0.04';
            auraGold.style.opacity = '0.03';
          } else {
            auraCyan.style.opacity = '0.09';
            auraGold.style.opacity = '0.07';
          }
        }
      });
    });

    // Toggle Gold Motes
    if (toggleGoldBtn) {
      toggleGoldBtn.addEventListener('click', () => {
        ArcaneState.enableGold = !ArcaneState.enableGold;
        iconGold.textContent = ArcaneState.enableGold ? 'check_box' : 'check_box_outline_blank';
        toggleGoldBtn.classList.toggle('opacity-50', !ArcaneState.enableGold);
        if (window.refreshArcaneParticles) window.refreshArcaneParticles();
      });
    }

    // Toggle Runic Pulse Aura
    if (togglePulseBtn) {
      togglePulseBtn.addEventListener('click', () => {
        ArcaneState.enablePulse = !ArcaneState.enablePulse;
        iconPulse.textContent = ArcaneState.enablePulse ? 'check_box' : 'check_box_outline_blank';
        togglePulseBtn.classList.toggle('opacity-50', !ArcaneState.enablePulse);
        const crest = document.querySelector('.crest-glow');
        if (crest) {
          crest.style.animation = ArcaneState.enablePulse ? 'arcanePulseGlow 3.5s ease-in-out infinite' : 'none';
        }
      });
    }

    // Toggle Tuner Panel Visibility
    if (dockToggleBtn && tunerPanel) {
      dockToggleBtn.addEventListener('click', () => {
        tunerPanel.classList.toggle('hidden');
      });
    }
  })();

  // 3. RADAR VERTEX TOOLTIP & INTERACTIVE BEAM
  (function initRadarInteractions() {
    const vertices = document.querySelectorAll('.radar-vertex');
    const tooltip = document.getElementById('radar-tooltip');
    if (!tooltip) return;

    vertices.forEach(v => {
      v.addEventListener('mouseenter', (e) => {
        const text = v.getAttribute('data-skill');
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
        v.setAttribute('r', '6');
      });
      v.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        v.setAttribute('r', '3.5');
      });
    });
  })();

  // 4. DRUG CARD CATEGORY FILTER INTERACTION
  (function initDrugFilters() {
    const filterContainer = document.getElementById('drug-filter-container');
    const cards = document.querySelectorAll('.drug-card');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.drug-filter-btn');
      if (!btn) return;

      filterContainer.querySelectorAll('.drug-filter-btn').forEach(b => {
        b.className = 'drug-filter-btn px-space-md py-space-xs rounded font-label-sm uppercase tracking-wider text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all';
      });

      btn.className = 'drug-filter-btn px-space-md py-space-xs rounded font-label-sm uppercase tracking-wider bg-primary-container text-on-primary-container font-semibold transition-all shadow-[0_0_12px_rgba(200,170,110,0.35)]';

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  })();

  // 5. INTERACTIVE CLINICAL QUIZ SYSTEM
  (function initQuiz() {
    const options = document.querySelectorAll('.quiz-option-btn');
    const feedbackBox = document.getElementById('quiz-feedback');
    const resetBtn = document.getElementById('btn-reset-quiz');
    let answered = false;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = btn.getAttribute('data-correct') === 'true';
        const icon = btn.querySelector('.state-icon');

        if (isCorrect) {
          btn.classList.remove('bg-surface-container-low');
          btn.classList.add('bg-secondary/20', 'border-secondary', 'shadow-[0_0_16px_rgba(67,226,210,0.4)]');
          icon.textContent = 'check_circle';
          icon.classList.remove('text-outline-variant');
          icon.classList.add('text-secondary');

          feedbackBox.classList.remove('hidden');
          feedbackBox.innerHTML = `
            <div class="flex items-start gap-space-sm text-secondary">
              <span class="material-symbols-outlined text-[22px]">verified</span>
              <div>
                <strong class="font-label-md uppercase tracking-wider">Respuesta correcta · revisa la fuente</strong>
                <p class="font-body-sm text-body-sm text-on-surface mt-1">
                  <strong>Etosuximida</strong> inhibe las corrientes de calcio tipo T de bajo umbral y es una opción principal para crisis de ausencia típicas. Goodman &amp; Gilman, cap. 20, tabla de resumen clínico, p. 62.
                </p>
              </div>
            </div>
          `;
        } else {
          btn.classList.remove('bg-surface-container-low');
          btn.classList.add('bg-error-container/40', 'border-error');
          icon.textContent = 'cancel';
          icon.classList.remove('text-outline-variant');
          icon.classList.add('text-tertiary');

          options.forEach(o => {
            if (o.getAttribute('data-correct') === 'true') {
              o.classList.add('bg-secondary/15', 'border-secondary/40');
              const corrIcon = o.querySelector('.state-icon');
              corrIcon.textContent = 'check_circle';
              corrIcon.classList.add('text-secondary');
            }
          });

          feedbackBox.classList.remove('hidden');
          feedbackBox.innerHTML = `
            <div class="flex items-start gap-space-sm text-tertiary">
              <span class="material-symbols-outlined text-[22px]">warning</span>
              <div>
                <strong class="font-label-md uppercase tracking-wider">Alerta Farmacológica: Elección Errónea</strong>
                <p class="font-body-sm text-body-sm text-on-surface mt-1">
                  La opción correcta es <strong>Etosuximida</strong>, asociada con crisis de ausencia típicas. Revisa la comparación de fármacos y tipos de crisis en Goodman &amp; Gilman, cap. 20, p. 62.
                </p>
              </div>
            </div>
          `;
        }

        if (resetBtn) resetBtn.classList.remove('hidden');
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        answered = false;
        feedbackBox.classList.add('hidden');
        resetBtn.classList.add('hidden');
        options.forEach(btn => {
          btn.className = 'quiz-option-btn group text-left p-space-md bg-surface-container-low hover:bg-surface-container-high rounded transition-all flex items-center justify-between border border-outline-variant/20';
          const icon = btn.querySelector('.state-icon');
          icon.textContent = 'radio_button_unchecked';
          icon.className = 'material-symbols-outlined text-outline-variant text-[20px] state-icon';
        });
      });
    }
  })();

