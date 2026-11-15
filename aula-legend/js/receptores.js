// GLOBAL STATE OBJECT FOR ARCANE SYSTEM & DRUG COUPLING
  window.ArcaneState = {
    density: 'medium', // subtle, medium, overload
    enableGold: true,
    enablePulse: true,
    particleCounts: { subtle: 24, medium: 55, overload: 105 },
    mouse: { x: -1000, y: -1000, radius: 120 },
    // Direct Infusion Coupling Parameters
    infusionSpeedMultiplier: 1.0,  // Base 1.0 at 0.10 mcg/kg/min
    surgeBoost: 1.0,               // Temporary pulse boost on infusion/bolus
    currentRate: 0.10,
    isToxic: false,
    triggerSurge: function(multiplier = 2.8, duration = 1500) {
      this.surgeBoost = multiplier;
      const start = performance.now();
      const initial = multiplier;
      const step = (now) => {
        const elapsed = now - start;
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // smooth exponential ease out
          this.surgeBoost = 1.0 + (initial - 1.0) * Math.pow(1 - progress, 2);
          requestAnimationFrame(step);
        } else {
          this.surgeBoost = 1.0;
        }
      };
      requestAnimationFrame(step);
    }
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
      window.ArcaneState.mouse.x = e.clientX - rect.left;
      window.ArcaneState.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      window.ArcaneState.mouse.x = -1000;
      window.ArcaneState.mouse.y = -1000;
    });

    const particles = [];

    function createParticle() {
      const isGold = window.ArcaneState.enableGold && Math.random() < 0.35;
      const isOverloadToxic = window.ArcaneState.isToxic && Math.random() < 0.25;
      
      let baseColor;
      if (isOverloadToxic) {
        baseColor = { r: 255, g: 140, b: 147 }; // Warning crimson/ruby spark
      } else if (isGold) {
        baseColor = { r: 229, g: 197, b: 135 }; // Alchemical Gold
      } else {
        baseColor = (Math.random() < 0.6 ? { r: 67, g: 226, b: 210 } : { r: 10, g: 200, b: 185 }); // Hextech Cyan / Mana
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        originRadius: Math.random() * 2.2 + 0.9,
        radius: Math.random() * 2.2 + 0.9,
        color: baseColor,
        isGold: isGold,
        isToxic: isOverloadToxic,
        baseVx: (Math.random() - 0.5) * 0.5,
        baseVy: -Math.random() * 0.55 - 0.25,
        alpha: Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        angle: Math.random() * Math.PI * 2,
        tailLength: Math.random() * 3 + 1,
        prevY: 0
      };
    }

    function syncParticleCount() {
      const targetCount = window.ArcaneState.particleCounts[window.ArcaneState.density] || 55;
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

      // Compute total instantaneous speed factor
      const effectiveMultiplier = (window.ArcaneState.infusionSpeedMultiplier || 1.0) * (window.ArcaneState.surgeBoost || 1.0);
      const isToxic = window.ArcaneState.isToxic;

      // Pulse time factor scales with infusion rate
      const time = Date.now() * 0.002 * Math.min(3.5, Math.max(0.3, effectiveMultiplier));

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.prevY = p.y;

        // Velocity scaled by drug infusion rate & surge
        const dynamicVy = p.baseVy * effectiveMultiplier;
        const dynamicVx = p.baseVx * Math.min(2.5, Math.max(0.4, effectiveMultiplier));

        // Idle floating movement + oscillatory vortex
        const swirl = isToxic ? Math.sin(time * 2 + p.angle) * 1.5 : Math.sin(time + p.angle) * 0.25;
        p.x += dynamicVx + swirl;
        p.y += dynamicVy;

        // Subtle repulsion from mouse cursor
        const dx = p.x - window.ArcaneState.mouse.x;
        const dy = p.y - window.ArcaneState.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < window.ArcaneState.mouse.radius && dist > 0) {
          const force = (window.ArcaneState.mouse.radius - dist) / window.ArcaneState.mouse.radius;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }

        // Loop boundaries
        if (p.y < -15) { 
          p.y = height + 15; 
          p.x = Math.random() * width; 
          p.prevY = p.y;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Color & alpha modulation
        let color = p.color;
        if (isToxic && Math.random() < 0.08) {
          color = { r: 255, g: 110, b: 120 }; // Frenetic toxic warning shift
        }

        const currentAlpha = Math.min(0.95, Math.max(0.12, p.alpha + Math.sin(time * 3 + p.angle) * 0.25));

        // Draw particle tail / streak if moving fast
        if (effectiveMultiplier > 1.4) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${currentAlpha * 0.6})`;
          ctx.lineWidth = p.radius * 0.8;
          ctx.stroke();
        }

        // Draw particle with soft glow
        ctx.beginPath();
        const displayRadius = isToxic ? (p.radius * (1.1 + Math.sin(time * 5) * 0.3)) : p.radius;
        ctx.arc(p.x, p.y, Math.max(0.8, displayRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${currentAlpha})`;
        ctx.shadowBlur = p.isGold ? 12 : (isToxic ? 14 : 9);
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${isToxic ? 0.9 : 0.75})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Constellation lines or rapid energy arcing during overload or high drug infusion
        if (window.ArcaneState.density === 'overload' || effectiveMultiplier > 2.2) {
          const maxCheck = effectiveMultiplier > 2.5 ? 5 : 3;
          for (let j = i + 1; j < Math.min(i + maxCheck, particles.length); j++) {
            const p2 = particles[j];
            const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
            const maxDist = effectiveMultiplier > 2.5 ? 95 : 75;
            if (distBetween < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const lineAlpha = (1 - distBetween / maxDist) * (isToxic ? 0.35 : 0.2);
              const lineHex = isToxic ? '255, 140, 147' : '67, 226, 210';
              ctx.strokeStyle = `rgba(${lineHex}, ${lineAlpha})`;
              ctx.lineWidth = isToxic ? 1.0 : 0.7;
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
        window.ArcaneState.density = btn.getAttribute('data-density');
        
        if (window.refreshArcaneParticles) window.refreshArcaneParticles();

        // Adjust aura intensity
        if (auraCyan && auraGold) {
          if (window.ArcaneState.density === 'overload') {
            auraCyan.style.opacity = '0.22';
            auraGold.style.opacity = '0.18';
          } else if (window.ArcaneState.density === 'subtle') {
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
        window.ArcaneState.enableGold = !window.ArcaneState.enableGold;
        iconGold.textContent = window.ArcaneState.enableGold ? 'check_box' : 'check_box_outline_blank';
        toggleGoldBtn.classList.toggle('opacity-50', !window.ArcaneState.enableGold);
        if (window.refreshArcaneParticles) window.refreshArcaneParticles();
      });
    }

    // Toggle Runic Pulse Aura
    if (togglePulseBtn) {
      togglePulseBtn.addEventListener('click', () => {
        window.ArcaneState.enablePulse = !window.ArcaneState.enablePulse;
        iconPulse.textContent = window.ArcaneState.enablePulse ? 'check_box' : 'check_box_outline_blank';
        togglePulseBtn.classList.toggle('opacity-50', !window.ArcaneState.enablePulse);
        if (auraCyan && auraGold) {
          auraCyan.style.display = window.ArcaneState.enablePulse ? 'block' : 'none';
          auraGold.style.display = window.ArcaneState.enablePulse ? 'block' : 'none';
        }
      });
    }
  })();

// =============================================
// PARTE 2: SIMULADOR HEMODINÁMICO Y TITULACIÓN
// =============================================

(function() {
    const rateSlider = document.getElementById('slider-rate');
    const bolusSlider = document.getElementById('slider-bolus');
    const rateVal = document.getElementById('val-rate');
    const bolusVal = document.getElementById('val-bolus');
    const tunerSpeedDisplay = document.getElementById('tuner-speed-display');
    const sliderSpeedBadge = document.getElementById('slider-speed-badge');
    const fluxStatusLabel = document.getElementById('flux-status-label');
    const iconFlowSpeed = document.getElementById('icon-flow-speed');
    
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

    function updateParticleCoupling(rate) {
      // Base dose for x1.0 speed reference is 0.10 mcg/kg/min
      // Rate ranges from 0.01 to 1.00:
      // At 0.01 -> ~0.3x (muy lento, calmo)
      // At 0.10 -> 1.00x (ritmo estándar óptimo)
      // At 0.30 -> ~2.2x (flujo enérgico)
      // At >=0.40 -> >2.8x (sobrecarga / torbellino rápido)
      const baseDose = 0.10;
      let multiplier = 0.25 + (rate / baseDose) * 0.75; // 0.01 -> ~0.32x, 0.10 -> 1.0x, 0.50 -> 4.0x
      multiplier = Math.max(0.2, Math.min(5.5, multiplier));

      if (window.ArcaneState) {
        window.ArcaneState.infusionSpeedMultiplier = multiplier;
        window.ArcaneState.currentRate = rate;
        window.ArcaneState.isToxic = (rate >= 0.40);
      }

      // Update UI displays
      const formattedMult = `x${multiplier.toFixed(2)}`;
      if (tunerSpeedDisplay) {
        const drugLabel = currentDrug === 'noradrenalina' ? 'Acoplado a Noradrenalina' : `Acoplado a ${drugProfiles[currentDrug].name}`;
        tunerSpeedDisplay.textContent = `${formattedMult} (${drugLabel})`;
        if (rate >= 0.40) {
          tunerSpeedDisplay.className = 'font-label-md text-[11px] font-bold text-error tracking-wide animate-pulse';
        } else if (rate >= 0.10) {
          tunerSpeedDisplay.className = 'font-label-md text-[11px] font-bold text-secondary tracking-wide';
        } else {
          tunerSpeedDisplay.className = 'font-label-md text-[11px] font-bold text-primary-fixed-dim tracking-wide';
        }
      }

      if (sliderSpeedBadge) {
        sliderSpeedBadge.textContent = `${formattedMult} FLUX`;
        sliderSpeedBadge.className = rate >= 0.40 
          ? 'text-[10px] text-error font-mono font-bold animate-pulse' 
          : 'text-[10px] text-secondary font-mono font-semibold';
      }

      if (fluxStatusLabel) {
        if (rate < 0.08) {
          fluxStatusLabel.textContent = 'Flujo Basal Calmo (0.01 - 0.08)';
          fluxStatusLabel.className = 'text-on-surface-variant font-medium';
        } else if (rate <= 0.35) {
          fluxStatusLabel.textContent = 'Flujo Óptimo Rítmico Hextech';
          fluxStatusLabel.className = 'text-secondary font-bold';
        } else {
          fluxStatusLabel.textContent = 'Sobrecarga Hiperdinámica / Torbellino';
          fluxStatusLabel.className = 'text-error font-bold tracking-tight';
        }
      }

      if (iconFlowSpeed) {
        // Adjust CSS animation duration of the flow icon
        const duration = Math.max(0.4, 2.5 / multiplier);
        iconFlowSpeed.style.animationDuration = `${duration.toFixed(2)}s`;
        if (rate >= 0.40) {
          iconFlowSpeed.className = 'material-symbols-outlined text-[16px] text-error animate-spin';
        } else {
          iconFlowSpeed.className = 'material-symbols-outlined text-[16px] text-secondary animate-spin';
        }
      }
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

      // Synchronize particle engine with this rate
      updateParticleCoupling(rate);

      return { pamCalculated, estimatedCp, rate };
    }

    // Sliders event listeners
    rateSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      rateVal.innerHTML = `${val.toFixed(2)} <span class="font-label-sm text-label-sm">mcg/kg/min</span>`;
      const res = calculateHemodynamics();
      if (res.rate >= 0.40) {
        addLog(`ADVERTENCIA: Velocidad de titulación elevada (${res.rate} mcg/kg/min). Riesgo de vasoconstricción y necrosis. Maná acelerado a sobrecarga.`, true);
      }
    });

    bolusSlider.addEventListener('input', (e) => {
      bolusVal.innerHTML = `${e.target.value} <span class="font-label-sm text-label-sm">mcg IV</span>`;
      calculateHemodynamics();
      // Bolus adjustment adds an immediate small ripple
      if (window.ArcaneState && window.ArcaneState.triggerSurge) {
        window.ArcaneState.triggerSurge(1.6, 900);
      }
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

    // Infusion Actuators - Inundar Vía triggers an energetic Arcane surge pulse
    btnInfuse.addEventListener('click', () => {
      const res = calculateHemodynamics();
      if (window.ArcaneState && window.ArcaneState.triggerSurge) {
        window.ArcaneState.triggerSurge(3.2, 2200); // Surge surge wave
      }
      addLog(`[INUNDACIÓN DE VÍA ACTIVADA] Oleada de infusión continua de ${drugProfiles[currentDrug].name} fijada a ${res.rate} mcg/kg/min. Torrente rúnico y PAM: ${res.pamCalculated} mmHg.`);
    });

    btnPurge.addEventListener('click', () => {
      rateSlider.value = 0.01;
      bolusSlider.value = 0;
      rateVal.innerHTML = `0.01 <span class="font-label-sm text-label-sm">mcg/kg/min</span>`;
      bolusVal.innerHTML = `0 <span class="font-label-sm text-label-sm">mcg IV</span>`;
      calculateHemodynamics();
      if (window.ArcaneState) {
        window.ArcaneState.surgeBoost = 0.6; // Instant slowdown
        setTimeout(() => { if (window.ArcaneState) window.ArcaneState.surgeBoost = 1.0; }, 1200);
      }
      addLog(`[PURGA DE EMERGENCIA] Vías vasculares lavadas. Flujo de maná desacelerado a nivel basal calmo.`, true);
    });

    window.injectItem = function(name, desc) {
      if (window.ArcaneState && window.ArcaneState.triggerSurge) {
        window.ArcaneState.triggerSurge(2.0, 1400);
      }
      addLog(`BOLO ADMINISTRADO: ${name} (${desc}). Pulso rúnico instantáneo generado.`);
      calculateHemodynamics();
    };

    window.clearLog = function() {
      logBox.innerHTML = '';
      addLog('Bitácora reiniciada. Monitoreo Hextech en espera.');
    };

    // Initial setup
    calculateHemodynamics();
  })();
