
(function() {
  // Protocol State
  var selectedSequence = [null, null, null, null];
  var timerSeconds = 105;
  var timerInterval = null;

  var drugData = {
    propranolol: {
      name: "Propranolol",
      tag: "Fase 1: Control Adrenérgico",
      desc: "Antagonismo Beta & Bloqueo simpático inmediato",
      icon: "cardiology"
    },
    ptu: {
      name: "Propiltiouracilo",
      tag: "Fase 2: Síntesis TPO",
      desc: "Inhibe síntesis tiroidea previa a yoduros",
      icon: "block"
    },
    lugol: {
      name: "Solución de Lugol",
      tag: "Fase 3: Efecto Wolff-Chaikoff",
      desc: "Bloquea liberación coloidal (requiere 1h post-PTU)",
      icon: "opacity"
    },
    hidrocortisona: {
      name: "Hidrocortisona",
      tag: "Fase 4: Glucocorticoide",
      desc: "Profilaxis suprarrenal y conversión T4 a T3",
      icon: "health_and_safety"
    },
    aspirina: {
      name: "Aspirina (AAS)",
      tag: "CONTRAINDICADO",
      desc: "Desplaza T4 de la TBG aumentando fracción libre mortal",
      icon: "warning"
    },
    metoprolol: {
      name: "Metoprolol",
      tag: "Subóptimo",
      desc: "Cardioselectivo pero sin inhibición de 5'-desyodasa",
      icon: "monitor_heart"
    }
  };

  // Timer simulation
  function startTacticalTimer() {
    var timerEl = document.getElementById('tacticalTimer');
    var circleEl = document.getElementById('timerCircle');
    var maxSeconds = 105;

    timerInterval = setInterval(function() {
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        return;
      }
      timerSeconds--;
      var mins = Math.floor(timerSeconds / 60);
      var secs = timerSeconds % 60;
      timerEl.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

      var offset = 125.6 - (125.6 * (timerSeconds / maxSeconds));
      circleEl.style.strokeDashoffset = offset;

      if (timerSeconds <= 20) {
        timerEl.classList.remove('text-secondary');
        timerEl.classList.add('text-error');
        circleEl.classList.remove('text-secondary');
        circleEl.classList.add('text-error');
      }
    }, 1000);
  }

  function renderSlots() {
    var slotElements = document.querySelectorAll('.slot-box');
    slotElements.forEach(function(slot, index) {
      var drugId = selectedSequence[index];
      var contentContainer = slot.querySelector('.slot-content');
      var tagEl = slot.querySelector('.slot-tag');

      if (drugId && drugData[drugId]) {
        var drug = drugData[drugId];
        contentContainer.innerHTML = 
          '<span class="material-symbols-outlined text-[28px] text-primary">' + drug.icon + '</span>' +
          '<span class="font-title-md text-title-md text-primary font-bold mt-1">' + drug.name + '</span>' +
          '<span class="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[140px]">' + drug.desc + '</span>';
        
        slot.classList.add('bg-surface-container-high');
        slot.classList.remove('bg-surface-container-lowest');
        tagEl.textContent = drug.name;
        tagEl.classList.add('text-secondary', 'font-bold');
      } else {
        contentContainer.innerHTML = 
          '<span class="material-symbols-outlined text-[30px] opacity-40">science</span>' +
          '<span class="font-label-sm text-label-sm mt-1 opacity-60">Vacío (Esperando Fármaco)</span>';
        slot.classList.remove('bg-surface-container-high');
        slot.classList.add('bg-surface-container-lowest');
        var defaultTags = ["Control Rápido", "Síntesis TPO", "Liberación Coloidal", "Conversión & Shock"];
        tagEl.textContent = defaultTags[index];
        tagEl.classList.remove('text-secondary', 'font-bold');
      }
    });

    // Update drug card states (visual active toggle)
    document.querySelectorAll('.drug-card').forEach(function(card) {
      var dId = card.getAttribute('data-drug-id');
      if (selectedSequence.indexOf(dId) !== -1) {
        card.classList.add('opacity-40', 'pointer-events-none');
      } else {
        card.classList.remove('opacity-40', 'pointer-events-none');
      }
    });
  }

  function setupInteractions() {
    // Drug Cards Click
    document.querySelectorAll('.drug-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var drugId = card.getAttribute('data-drug-id');
        // Find first empty slot
        var emptyIndex = selectedSequence.indexOf(null);
        if (emptyIndex !== -1) {
          selectedSequence[emptyIndex] = drugId;
          renderSlots();
        }
      });
    });

    // Slot click to remove
    document.querySelectorAll('.slot-box').forEach(function(slot) {
      slot.addEventListener('click', function() {
        var idx = parseInt(slot.getAttribute('data-slot-index'), 10);
        if (selectedSequence[idx] !== null) {
          selectedSequence[idx] = null;
          renderSlots();
        }
      });
    });

    // Clear Button
    document.getElementById('clearSlotsBtn').addEventListener('click', function() {
      selectedSequence = [null, null, null, null];
      renderSlots();
    });

    // Execute Protocol Button
    document.getElementById('executeProtocolBtn').addEventListener('click', function() {
      validateSequence();
    });

    // Modal Close
    document.getElementById('closeModalBtn').addEventListener('click', function() {
      document.getElementById('resultModal').classList.add('hidden');
    });
  }

  function validateSequence() {
    var modal = document.getElementById('resultModal');
    var modalTitle = document.getElementById('modalTitle');
    var modalSubtitle = document.getElementById('modalSubtitle');
    var modalDescription = document.getElementById('modalDescription');
    var modalDetails = document.getElementById('modalDetails');
    var modalIcon = document.getElementById('modalIcon');
    var modalIconBox = document.getElementById('modalIconBox');

    // Case 1: Incomplete Sequence
    if (selectedSequence.includes(null)) {
      modalTitle.textContent = "SECUENCIA INCOMPLETA";
      modalTitle.className = "font-headline-xl text-headline-xl text-tertiary mt-1";
      modalSubtitle.textContent = "ALERTA TÁCTICA DE PROTOCOLO";
      modalDescription.textContent = "Debes completar las 4 ranuras de intervención farmacológica (Q-W-E-R) antes de autorizar la infusión en bolo.";
      modalIcon.textContent = "hourglass_empty";
      modalIconBox.className = "w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-tertiary shadow-2xl mb-4";
      modalDetails.innerHTML = "<p>Asigna 4 agentes del arsenal para cubrir la estabilización hemodinámica, frenar la organificación glandular y prevenir la conversión periférica.</p>";
      modal.classList.remove('hidden');
      return;
    }

    // Case 2: Aspirin fatal trap chosen
    if (selectedSequence.indexOf('aspirina') !== -1) {
      modalTitle.textContent = "¡DERROTA CLÍNICA: COLAPSO IATRÓGENO!";
      modalTitle.className = "font-headline-xl text-headline-xl text-error mt-1";
      modalSubtitle.textContent = "ERROR CRÍTICO: TRAMPA FARMACOLÓGICA DETECTADA";
      modalDescription.textContent = "Has administrado Ácido Acetilsalicílico a un paciente en Crisis Tirotóxica.";
      modalIcon.textContent = "skull";
      modalIconBox.className = "w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-error shadow-2xl mb-4";
      modalDetails.innerHTML = 
        "<div class='p-2 bg-error-container/30 text-on-error-container rounded font-bold'>Mecanismo de Toxicidad:</div>" +
        "<p>La aspirina compite ávidamente con la tiroxina por los sitios de unión en la globulina fijadora de tiroxina (TBG) y la transtiretina. Esto provoca un incremento masivo y fulminante de la T3 y T4 libre plasmática, empeorando el shock cardiogénico por tirotoxicosis. En su lugar debe emplearse enfriamiento físico o Paracetamol.</p>";
      modal.classList.remove('hidden');
      return;
    }

    // Case 3: Correct Sequence Check
    // Correct Order: 
    // Q: Propranolol (Adrenergic control first to prevent fatal arrhythmia)
    // W: PTU (Propiltiouracilo: stops synthesis & peripheric conversion)
    // E: Lugol (Must be given AFTER thionamide to prevent Jod-Basedow / thyroid fuel)
    // R: Hidrocortisona (Shock prophylaxis, adrenal reserve & peripheral deiodinase inhibition)
    var isPerfect = (
      selectedSequence[0] === 'propranolol' &&
      selectedSequence[1] === 'ptu' &&
      selectedSequence[2] === 'lugol' &&
      selectedSequence[3] === 'hidrocortisona'
    );

    if (isPerfect) {
      modalTitle.textContent = "¡VICTORIA CLÍNICA: MAESTRÍA S+!";
      modalTitle.className = "font-headline-xl text-headline-xl text-primary mt-1";
      modalSubtitle.textContent = "CALIFICACIÓN DE CÁTEDRA: RANGO DIAMANTE SUPERADO";
      modalDescription.textContent = "¡Excelente sincronización de la cascada terapéutica! La paciente revierte la fibrilación auricular y estabiliza el gasto cardíaco.";
      modalIcon.textContent = "military_tech";
      modalIconBox.className = "w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-2xl mb-4";
      modalDetails.innerHTML = 
        "<div class='font-bold text-secondary mb-1 flex items-center gap-1'><span class='material-symbols-outlined text-[16px]'>check_circle</span> Justificación Molecular Hextech:</div>" +
        "<ul class='list-disc pl-5 space-y-1.5'>" +
          "<li><strong class='text-on-surface'>1. Propranolol (Q):</strong> Control adrenérgico veloz para detener la toxicidad miocárdica de la FA (164 lpm) e inhibición de 5'-desyodasa a dosis altas.</li>" +
          "<li><strong class='text-on-surface'>2. PTU (W):</strong> Inhibe tiroperoxidasa (TPO). Bloquea la formación de nuevo coloide antes de administrar yoduros.</li>" +
          "<li><strong class='text-on-surface'>3. Lugol (E):</strong> Bloquea la secreción aguda coloidal (Efecto Wolff-Chaikoff). Administrado tras el PTU para evitar enriquecer los depósitos glandulares.</li>" +
          "<li><strong class='text-on-surface'>4. Hidrocortisona (R):</strong> Protege ante insuficiencia suprarrenal aguda concomitante y consolida el freno a la conversión T4 &rarr; T3 periférica.</li>" +
        "</ul>";
      modal.classList.remove('hidden');
    } else {
      // Order mistake: e.g. Lugol before PTU
      var lugolIndex = selectedSequence.indexOf('lugol');
      var ptuIndex = selectedSequence.indexOf('ptu');

      var warningReason = "El orden cronológico no garantiza la inhibición enzimática adecuada.";
      if (lugolIndex !== -1 && ptuIndex !== -1 && lugolIndex < ptuIndex) {
        warningReason = "¡Administraste Lugol antes de la Tionamida (PTU)! El yodo inorgánico sirvió de sustrato masivo para la tiroperoxidasa aún activa, agravando la crisis por síntesis descontrolada (Fenómeno de escape).";
      } else if (selectedSequence[0] !== 'propranolol') {
        warningReason = "No priorizaste el control adrenérgico inmediato (Propranolol), exponiendo el ventrículo a fibrilación letal inducida por exceso de receptores beta activos.";
      }

      modalTitle.textContent = "DESVIACIÓN DE PROTOCOLO";
      modalTitle.className = "font-headline-xl text-headline-xl text-secondary mt-1";
      modalSubtitle.textContent = "CALIFICACIÓN DE CÁTEDRA: REVISIÓN DE CINÉTICA NECESARIA";
      modalDescription.textContent = warningReason;
      modalIcon.textContent = "sync_problem";
      modalIconBox.className = "w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary shadow-2xl mb-4";
      modalDetails.innerHTML = 
        "<p>Recuerda el orden fisiopatológico crítico: Primero el bloqueo adrenérgico sintomático (Q: Propranolol), segundo el bloqueo de la síntesis glandular (W: PTU), tercero la inhibición de la liberación con yoduros tras 1 hora de margen (E: Lugol), y finalmente los esteroides de estabilización de membrana (R: Hidrocortisona).</p>";
      modal.classList.remove('hidden');
    }
  }

  // Initialization
  startTacticalTimer();
  setupInteractions();
})();

