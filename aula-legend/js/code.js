// STATE OBJECT FOR ARCANE SYSTEM
  const ArcaneState = {
    density: 'medium', // subtle, medium, overload
    enableGold: true,
    enablePulse: true,
    particleCounts: { subtle: 24, medium: 55, overload: 105 },
    mouse: { x: -1000, y: -1000, radius: 120 }
  };

  // FLOATING ARCANE MANA & GOLD MOTES ENGINE
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

  // SINTONIZADOR DE RESONANCIA & CONTROLES INTERACTIVOS
  (function initTunerControls() {
    const densityButtons = document.querySelectorAll('.tuner-density-btn');
    const toggleGoldBtn = document.getElementById('btn-toggle-gold');
    const togglePulseBtn = document.getElementById('btn-toggle-pulse');
    const iconGold = document.getElementById('icon-toggle-gold');
    const iconPulse = document.getElementById('icon-toggle-pulse');
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
            auraCyan.style.opacity = '0.22';
            auraGold.style.opacity = '0.18';
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
        if (auraCyan && auraGold) {
          auraCyan.style.display = ArcaneState.enablePulse ? 'block' : 'none';
          auraGold.style.display = ArcaneState.enablePulse ? 'block' : 'none';
        }
      });
    }
  })();

// PARTE 2

(function() {
    const rateSlider = document.getElementById('slider-rate');
    const bolusSlider = document.getElementById('slider-bolus');
    const rateVal = document.getElementById('val-rate');
    const bolusVal = document.getElementById('val-bolus');
    
    const displayPam = document.getElementById('display-pam');
    const displayGc = document.getElementById('display-gc');
    const displayFc = document.getElementById('display-fc');
    const displayRvs = document.getElementById('display-rvs');

    const barPam = document.getElementById('bar-pam');
    const barGc = document.getElementById('bar-gc');
    const barFc = document.getElementById('bar-fc');
    const barRvs = document.getElementById('bar-rvs');

    const labelCp = document.getElementById('label-cp');
    const curveLine = document.getElementById('curve-line');
    const curveArea = document.getElementById('curve-area');
    const curveNode = document.getElementById('curve-node');
    const logBox = document.getElementById('telemetry-log');
    const btnInfuse = document.getElementById('btn-infuse');
    const btnPurge = document.getElementById('btn-purge');

    let currentDrug = 'noradrenalina';

    const drugProfiles = {
      noradrenalina: {
        name: 'Noradrenalina',
        alpha: '95% (Agonista)',
        beta1: '35% (Débil)',
        beta2: '5% (Nulo)',
        pamMultiplier: 65,
        gcMultiplier: 1.2,
        fcMultiplier: 8,
        rvsMultiplier: 900
      },
      dopamina: {
        name: 'Dopamina',
        alpha: '60% (Dosis alta)',
        beta1: '75% (Inotrópico)',
        beta2: '20% (Vasodilatador)',
        pamMultiplier: 45,
        gcMultiplier: 2.8,
        fcMultiplier: 35,
        rvsMultiplier: 400
      },
      dobutamina: {
        name: 'Dobutamina',
        alpha: '10% (Residual)',
        beta1: '95% (Agonista Potente)',
        beta2: '45% (Leve vasodilatador)',
        pamMultiplier: 15,
        gcMultiplier: 3.9,
        fcMultiplier: 25,
        rvsMultiplier: -150
      }
    };

    function addLog(text, isAlert = false) {
      const now = new Date();
      const timeStr = `[${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
      const div = document.createElement('div');
      div.className = `p-space-xs bg-surface-container-lowest rounded text-on-surface ${isAlert ? 'text-error font-semibold' : ''}`;
      div.innerHTML = `<span class="${isAlert ? 'text-error' : 'text-primary'} font-bold">${timeStr}</span> ${text}`;
      logBox.appendChild(div);
      logBox.scrollTop = logBox.scrollHeight;
    }

    function calculateHemodynamics() {
      const rate = parseFloat(rateSlider.value);
      const bolus = parseFloat(bolusSlider.value);
      const profile = drugProfiles[currentDrug];

      // Base vitals in Septic Shock:
      let basePam = 55;
      let baseGc = 3.6;
      let baseFc = 105;
      let baseRvs = 600;

      // Dynamic calculation based on infusion rate & bolus
      const pamCalculated = Math.round(basePam + (rate * profile.pamMultiplier) + (bolus * 0.4));
      const gcCalculated = (baseGc + (rate * profile.gcMultiplier) + (bolus * 0.02)).toFixed(1);
      const fcCalculated = Math.round(baseFc + (rate * profile.fcMultiplier) - (currentDrug === 'noradrenalina' ? (rate * 4) : 0));
      const rvsCalculated = Math.round(baseRvs + (rate * profile.rvsMultiplier) + (bolus * 5));

      // Concentration (Cp) estimation
      const estimatedCp = (rate * 52 + (bolus * 0.25)).toFixed(1);

      // Render numbers
      displayPam.innerText = pamCalculated;
      displayGc.innerText = gcCalculated;
      displayFc.innerText = fcCalculated;
      displayRvs.innerText = rvsCalculated;
      labelCp.innerText = `${estimatedCp} ng/mL`;

      // Update gauges/bars
      barPam.style.width = `${Math.min(100, Math.max(10, (pamCalculated / 120) * 100))}%`;
      barGc.style.width = `${Math.min(100, Math.max(10, (parseFloat(gcCalculated) / 8.0) * 100))}%`;
      barFc.style.width = `${Math.min(100, Math.max(10, (fcCalculated / 160) * 100))}%`;
      barRvs.style.width = `${Math.min(100, Math.max(10, (rvsCalculated / 1600) * 100))}%`;

      // Modify SVG curve geometry dynamically
      const yOffset = Math.max(20, 220 - (rate * 260) - (bolus * 1.5));
      const pathD = `M 0 240 Q 80 200, 180 ${yOffset + 30} T 360 ${yOffset} T 600 ${yOffset - 10}`;
      const areaD = `${pathD} L 600 240 Z`;
      curveLine.setAttribute('d', pathD);
      curveArea.setAttribute('d', areaD);
      curveNode.setAttribute('cy', yOffset);

      return { pamCalculated, estimatedCp, rate };
    }

    // Sliders event listeners
    rateSlider.addEventListener('input', (e) => {
      rateVal.innerHTML = `${parseFloat(e.target.value).toFixed(2)} <span class="font-label-sm text-label-sm">mcg/kg/min</span>`;
      const res = calculateHemodynamics();
      if (res.rate > 0.5) {
        addLog(`ADVERTENCIA: Velocidad de titulación elevada (${res.rate} mcg/kg/min). Riesgo de vasoconstricción digital y necrosis periférica.`, true);
      }
    });

    bolusSlider.addEventListener('input', (e) => {
      bolusVal.innerHTML = `${e.target.value} <span class="font-label-sm text-label-sm">mcg IV</span>`;
      calculateHemodynamics();
    });

    // Drug buttons selection
    document.querySelectorAll('.drug-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const drug = btn.getAttribute('data-drug');
        currentDrug = drug;

        document.querySelectorAll('.drug-btn').forEach(b => {
          b.className = 'drug-btn w-full p-space-sm text-left rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-all flex items-center justify-between';
          b.querySelector('.material-symbols-outlined').textContent = 'radio_button_unchecked';
          b.querySelector('.material-symbols-outlined').classList.add('opacity-20');
        });

        btn.className = 'drug-btn w-full p-space-sm text-left rounded bg-primary-container text-on-primary-container shadow-md flex items-center justify-between transition-all';
        btn.querySelector('.material-symbols-outlined').textContent = 'check_circle';
        btn.querySelector('.material-symbols-outlined').classList.remove('opacity-20');

        const profile = drugProfiles[drug];
        document.getElementById('aff-alpha').innerText = profile.alpha;
        document.getElementById('aff-beta1').innerText = profile.beta1;
        document.getElementById('aff-beta2').innerText = profile.beta2;

        addLog(`Canal de infusión conmutado a: ${profile.name.toUpperCase()}. Receptores recalculados.`);
        calculateHemodynamics();
      });
    });

    // Infusion Actuators
    btnInfuse.addEventListener('click', () => {
      const res = calculateHemodynamics();
      addLog(`[INFUSIÓN INICIADA] ${drugProfiles[currentDrug].name} fijada a ${res.rate} mcg/kg/min. PAM resultante esperada: ${res.pamCalculated} mmHg.`);
    });

    btnPurge.addEventListener('click', () => {
      rateSlider.value = 0.01;
      bolusSlider.value = 0;
      rateVal.innerHTML = `0.01 <span class="font-label-sm text-label-sm">mcg/kg/min</span>`;
      bolusVal.innerHTML = `0 <span class="font-label-sm text-label-sm">mcg IV</span>`;
      calculateHemodynamics();
      addLog(`[PURGA DE EMERGENCIA] Vías vasculares lavadas con suero fisiológico. Inhibición de agonistas adrenérgicos en curso.`, true);
    });

    window.injectItem = function(name, desc) {
      addLog(`BOLO ADMINISTRADO: ${name} (${desc}). Farmacocinética modulada.`);
      calculateHemodynamics();
    };

    window.clearLog = function() {
      logBox.innerHTML = '';
      addLog('Bitácora reiniciada. Monitoreo Hextech en espera.');
    };

    // Initial setup
    calculateHemodynamics();
  })();
