
    // Navegación de pestañas
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));

      const activeSection = document.getElementById(tabId);
      if (activeSection) activeSection.classList.add('active');

      const activeNavBtn = document.getElementById('nav-' + tabId.replace('tab-', ''));
      if (activeNavBtn) activeNavBtn.classList.add('active-nav');
    }

    // Datos del esquema sináptico
    const schemaData = {
      pht: {
        name: "Fenitoína",
        class: "Hidantoína • Bloqueador Naᵥ",
        targetId: "diag-nav",
        targetName: "Canal Naᵥ (Poro α)",
        badgeColor: "bg-red-100 text-red-700",
        mech: "Bloqueador selectivo de canales Naᵥ en conformación inactivada rápida con cinética dependiente de uso y voltaje. Retrasa la reactivación del canal suprimiendo descargas de alta frecuencia.",
        ind: "Las lecturas la incluyen para crisis focales y tónico-clónicas; no es eficaz para crisis de ausencia. Goodman & Gilman cap. 20, PDF pp. 20, 25.",
        contra: "Contraindicaciones específicas: No especificado en las lecturas del curso consultadas.",
        fda: "<span class=\"risk-tier risk-tier--moderate\">Banda didáctica: precaución</span><br><strong>Lectura:</strong> el capítulo la incluye entre fármacos asociados con efectos teratógenos, sin cuantificar el riesgo individual. Lactancia: no especificada en las lecturas consultadas. Goodman & Gilman, cap. 20, p. 59."
      },
      cbz: {
        name: "Carbamazepina",
        class: "Iminoestilbeno • Bloqueador Naᵥ",
        targetId: "diag-nav",
        targetName: "Canal Naᵥ (Poro α)",
        badgeColor: "bg-red-100 text-red-700",
        mech: "Se une con alta afinidad al poro del canal Naᵥ en conformación inactivada rápida, prolongando el periodo refractario relativo. Su metabolito 10,11-epóxido retiene actividad anticonvulsiva.",
        ind: "Crisis focales y focales a bilaterales. Puede agravar ausencias y crisis mioclónicas; la lectura recomienda precaución al seleccionarla para epilepsia generalizada. Katzung cap. 24, PDF pp. 15–16.",
        contra: "No debe presentarse como contraindicación absoluta universal para esos tipos de crisis; seguir la cautela descrita en las lecturas.",
        fda: "<span class=\"risk-tier risk-tier--moderate\">Banda didáctica: precaución</span><br><strong>Lectura:</strong> el capítulo la incluye entre fármacos asociados con efectos teratógenos, sin cuantificar el riesgo individual. Lactancia: no especificada en las lecturas consultadas. Goodman & Gilman, cap. 20, p. 59."
      },
      lev: {
        name: "Levetiracetam",
        class: "Pirrolidina • Modulador Vesicular",
        targetId: "diag-sv2a",
        targetName: "SV2A Vesicular",
        badgeColor: "bg-purple-100 text-purple-700",
        mech: "Ligando de SV2A. El programa identifica el blanco; el mecanismo funcional detallado no se considera completamente conocido en el capítulo. Programa p. 25; Goodman & Gilman cap. 20, p. 12.",
        ind: "Las tablas lo incluyen para crisis focales, tónico-clónicas generalizadas y mioclónicas. Goodman & Gilman cap. 20, p. 65; Katzung cap. 24, p. 60.",
        contra: "Contraindicaciones específicas: No especificado en las lecturas del curso consultadas.",
        fda: "<span class=\"risk-tier risk-tier--lower\">Banda didáctica: menor riesgo relativo</span><br><strong>Lecturas del curso:</strong> riesgo gestacional y lactancia no especificados en las fuentes consultadas. Esta banda sigue la clasificación didáctica que compartiste; no equivale a una categoría FDA."
      },
      esm: {
        name: "Etosuximida",
        class: "Succinimida • Bloqueador Caᵥ-T",
        targetId: "diag-cav-t",
        targetName: "Canal Caᵥ Tipo T Talámico",
        badgeColor: "bg-indigo-100 text-indigo-700",
        mech: "Inhibidor selectivo de las corrientes de calcio de bajo umbral (tipo T) en las neuronas del tálamo, aboliendo el ritmo marcapasos de espiga-onda a 3 Hz.",
        ind: "1ª elección exclusiva en crisis generalizadas de ausencia típicas infantiles sin crisis convulsivas motoras asociadas.",
        contra: "Ineficaz en crisis focales y en crisis tónico-clónicas generalizadas.",
        fda: "<span class=\"risk-tier risk-tier--moderate\">Banda didáctica: precaución</span><br><strong>Lecturas del curso:</strong> el riesgo gestacional individual y la lactancia no están especificados en las fuentes consultadas. La precaución por evidencia limitada sigue la clasificación que compartiste."
      },
      dzp: {
        name: "Diazepam",
        class: "1,4-Benzodiazepina • Modulador GABA<sub>A</sub>",
        targetId: "diag-gabaa",
        targetName: "Receptor GABA-A (α-γ)",
        badgeColor: "bg-emerald-100 text-emerald-700",
        mech: "Modulador alostérico positivo de receptores GABA<sub>A</sub>: incrementa la frecuencia de apertura del canal de Cl⁻, hiperpolarizando la membrana de forma inmediata.",
        ind: "1ª línea de rescate agudo en Estado Epiléptico Convulsivo y racimos de crisis agudas recurrentes. NO se emplea para el mantenimiento crónico por tolerancia.",
        contra: "Glaucoma de ángulo cerrado, miastenia gravis grave, insuficiencia respiratoria aguda.",
        fda: "<span class=\"risk-tier risk-tier--moderate\">Banda didáctica: precaución, especialmente en 3.er trimestre</span><br><strong>Lecturas del curso:</strong> riesgo por trimestre y lactancia no especificados en las fuentes consultadas. La nota del tercer trimestre sigue el material que compartiste."
      },
      ltg: {
        name: "Lamotrigina",
        class: "Feniltriazina • Multidiana",
        targetId: "diag-cav-presyn",
        targetName: "Naᵥ + Caᵥ Presinápticos",
        badgeColor: "bg-violet-100 text-violet-700",
        mech: "Bloqueador de canales Naᵥ dependiente de voltaje e inhibidor de conductancias de calcio presinápticas (tipo L, N y P/Q), disminuyendo la liberación de glutamato.",
        ind: "Amplio espectro: crisis focales, crisis tónico-clónicas generalizadas, crisis de ausencia; síndrome de Lennox-Gastaut; depresión bipolar.",
        contra: "Hipersensibilidad; precaución en síndrome de Brugada.",
        fda: "<span class=\"risk-tier risk-tier--lower\">Banda didáctica: menor riesgo relativo</span><br><strong>Lecturas del curso:</strong> el capítulo la incluye entre fármacos asociados con efectos teratógenos, sin cuantificar el riesgo individual; lactancia no especificada. Goodman &amp; Gilman, cap. 20, p. 59. La banda sigue la clasificación que compartiste; no es categoría FDA.",
      },
      vpa: {
        name: "Ácido Valproico",
        class: "Ácido Carboxílico • Multimodal",
        targetId: "diag-gaba-metab",
        targetName: "Naᵥ + Caᵥ-T + GAD / GABA-T",
        badgeColor: "bg-teal-100 text-teal-700",
        mech: "Mecanismo cuádruple: 1) Bloqueo de Naᵥ inactivado; 2) Bloqueo de Caᵥ tipo T talámico; 3) Aumenta GABA cerebral (activa GAD e inhibe GABA-T); 4) Inhibe histona desacetilasa.",
        ind: "El más amplio espectro: 1ª elección en crisis mioclónicas (EMJ), crisis de ausencia con tónico-clónicas asociadas, crisis focales, profilaxis de migraña y manía.",
        contra: "Hepatopatía activa, trastornos del ciclo de la urea (riesgo de coma hiperamonémico) y embarazo en cualquier trimestre.",
        fda: "<span class=\"risk-tier risk-tier--high\">Banda didáctica: riesgo alto</span><br><strong>Lectura:</strong> teratógeno humano; 6–9% de riesgo absoluto de malformaciones mayores con exposición en el primer trimestre. Lactancia: no especificada en las lecturas consultadas. Goodman &amp; Gilman, cap. 20, p. 59. Evitar presentar las antiguas letras FDA como vigentes."
      }
    };

    function schemaSelect(key) {
      const data = schemaData[key];
      if (!data) return;

      // Actualizar botones
      document.querySelectorAll('#schema-pills button').forEach(b => {
        b.className = "px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--accent)]";
      });
      const activeBtn = document.getElementById('sbtn-' + key);
      if (activeBtn) activeBtn.className = "px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-blue-600 text-white font-semibold";

      // Actualizar campos
      document.getElementById('s-name').textContent = data.name;
      document.getElementById('s-class').textContent = data.class;
      document.getElementById('s-mech').textContent = data.mech;
      document.getElementById('s-ind').textContent = data.ind;
      document.getElementById('s-contra').textContent = data.contra;
      document.getElementById('s-fda').innerHTML = data.fda;

      const badge = document.getElementById('s-badge');
      badge.textContent = data.targetName;
      badge.className = "px-2 py-0.5 rounded text-[10px] font-bold " + data.badgeColor;

      // Limpiar resaltes en SVG
      const targets = ['diag-nav', 'diag-sv2a', 'diag-cav-presyn', 'diag-cav-t', 'diag-gaba-metab', 'diag-gabaa'];
      targets.forEach(tId => {
        const el = document.getElementById(tId);
        if (el) el.classList.remove('target-highlight');
      });

      // Aplicar resalte
      const target = document.getElementById(data.targetId);
      if (target) target.classList.add('target-highlight');

      if (key === 'vpa') {
        const nav = document.getElementById('diag-nav');
        const cavt = document.getElementById('diag-cav-t');
        if (nav) nav.classList.add('target-highlight');
        if (cavt) cavt.classList.add('target-highlight');
      } else if (key === 'ltg') {
        const nav = document.getElementById('diag-nav');
        if (nav) nav.classList.add('target-highlight');
      }
    }

    // Filtro de fármacos en módulo 4
    function filterDrugs(cat, trigger) {
      document.querySelectorAll('.f-btn').forEach(b => {
        b.className = "f-btn px-2.5 py-1 text-xs rounded border border-[var(--border)] bg-[var(--background)]";
      });
      if (trigger) trigger.className = "f-btn px-2.5 py-1 text-xs rounded border border-[var(--border)] bg-blue-600 text-white font-semibold";

      document.querySelectorAll('.drug-card').forEach(card => {
        if (cat === 'all') {
          card.style.display = 'block';
        } else if (cat === 'nav' && card.dataset.category === 'nav') {
          card.style.display = 'block';
        } else if (cat === 'broad' && card.dataset.category === 'broad') {
          card.style.display = 'block';
        } else if (cat === 'spec' && card.dataset.category === 'spec') {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Resolución de Casos Clínicos
    function checkCase(caseNum, ans) {
      const fb = document.getElementById('case-feedback-' + caseNum);
      fb.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-800', 'dark:text-emerald-200', 'border-emerald-500/30', 'bg-rose-500/10', 'text-rose-800', 'dark:text-rose-200', 'border-rose-500/30', 'border');
      fb.classList.add('border');

      if (caseNum === 1) {
        if (ans === 'esm') {
          fb.classList.add('bg-emerald-500/10', 'text-emerald-800', 'dark:text-emerald-200', 'border-emerald-500/30');
          fb.innerHTML = "<strong>¡Correcto! (Primera Elección):</strong> La <strong>etosuximida</strong> es el fármaco de elección en crisis de ausencia típicas infantiles sin crisis convulsivas asociadas. Posee igual eficacia que el valproato pero carece del riesgo de hepatotoxicidad mortal y aumento ponderal.";
        } else if (ans === 'cbz') {
          fb.classList.add('bg-rose-500/10', 'text-rose-800', 'dark:text-rose-200', 'border-rose-500/30');
          fb.innerHTML = "<strong>¡Error Grave de Prescripción!:</strong> La <strong>carbamazepina</strong> está formalmente contraindicada en crisis de ausencia. Al bloquear canales Naᵥ sin inhibir canales Caᵥ tipo T, sincroniza aún más el circuito tálamo-cortical y <strong>puede precipitar un estado epiléptico de ausencia</strong>.";
        } else {
          fb.classList.add('bg-amber-500/10', 'text-amber-800', 'dark:text-amber-200', 'border-amber-500/30');
          fb.innerHTML = "<strong>Eficaz pero Segunda Opción:</strong> El <strong>ácido valproico</strong> es altamente eficaz contra las ausencias, pero debido a sus riesgos de hepatotoxicidad fulminante, pancreatitis y aumento de peso, se reserva como alternativa o para cuando coexisten crisis tónico-clónicas generalizadas.";
        }
      } else if (caseNum === 2) {
        if (ans === 'dzp_correct') {
          fb.classList.add('bg-emerald-500/10', 'text-emerald-800', 'dark:text-emerald-200', 'border-emerald-500/30');
          fb.innerHTML = "<strong>¡Conducta Estándar Correcta!:</strong> En la <strong>Fase 1 (minuto 5 a 20)</strong> se debe administrar una benzodiazepina IV rápida (Diazepam 10 mg o Lorazepam 4 mg) para hiperpolarización inmediata por entrada de Cl⁻. Dado que el diazepam se redistribuye a la grasa periférica en ~1 hora, debe iniciarse inmediatamente la <strong>Fase 2</strong> con un anticrisis de carga IV de acción prolongada (Levetiracetam, Fosfenitoína o Valproato).";
        } else {
          fb.classList.add('bg-rose-500/10', 'text-rose-800', 'dark:text-rose-200', 'border-rose-500/30');
          fb.innerHTML = "<strong>Opción Inadecuada:</strong> En el estado epiléptico convulsivo activo (emergencia neurológica), la vía oral o enteral está contraindicada por riesgo de aspiración y absorción errática, y las infusiones lentas de fármacos de mantenimiento no logran la concentración cerebral inmediata que se requiere en los primeros minutos de la emergencia.";
        }
      }
    }

    // Simulador de Reactivos
    const quizAnswers = { 1: 'B', 2: 'B', 3: 'B', 4: 'B' };
    const quizFeedback = {
      1: "<strong>¡Correcto! (Opción B):</strong> La carbamazepina induce de forma potente el CYP3A4 responsable de metabolizar los anticonceptivos orales (riesgo de embarazo no planeado) y sufre autoinducción, lo que explica la caída de sus propios niveles séricos.",
      2: "<strong>¡Correcto! (Opción B):</strong> El ácido valproico es un potente inhibidor de la glucuronidación (UGT1A4), duplicando la vida media de la lamotrigina y disparando el riesgo de Síndrome de Stevens-Johnson / NET. La dosis de lamotrigina debe reducirse a la mitad (25 mg en días alternos).",
      3: "<strong>¡Correcto! (Opción B):</strong> El levetiracetam se une a la proteína vesicular SV2A, no utiliza CYP450 hepático y el 66% se excreta sin cambios por el riñón.",
      4: "<strong>¡Correcto! (Opción B):</strong> El ácido valproico puede causar necrosis hepática fulminante con esteatosis microvesicular; los niños menores de 2 años en politerapia presentan el riesgo máximo."
    };

    let userScore = 0;
    const answered = {};

    function answerQuiz(qNum, choice) {
      const fb = document.getElementById('q-feedback-' + qNum);
      fb.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-800', 'dark:text-emerald-200', 'border-emerald-500/30', 'bg-rose-500/10', 'text-rose-800', 'dark:text-rose-200', 'border-rose-500/30', 'border');
      fb.classList.add('border');

      if (choice === quizAnswers[qNum]) {
        fb.classList.add('bg-emerald-500/10', 'text-emerald-800', 'dark:text-emerald-200', 'border-emerald-500/30');
        fb.innerHTML = quizFeedback[qNum];
        if (!answered[qNum]) {
          userScore++;
          answered[qNum] = true;
        }
      } else {
        fb.classList.add('bg-rose-500/10', 'text-rose-800', 'dark:text-rose-200', 'border-rose-500/30');
        fb.innerHTML = "<strong>Incorrecto.</strong> Revisa las bases farmacocinéticas y dianas moleculares correspondientes a este fármaco en el temario.";
      }
      document.getElementById('quiz-score').textContent = "Puntuación: " + userScore + " / 4";
    }

    // Tarjetas de memoria volteables
    function flipCard(cardEl) {
      const inner = cardEl.querySelector('.card-inner');
      inner.classList.toggle('flipped');
    }
  

document.addEventListener('click', event => {
  const el = event.target.closest('[data-aula-action]'); if (!el) return;
  const d = el.dataset;
  if (d.aulaAction === 'switch-tab') switchTab(d.tabId);
  if (d.aulaAction === 'select-schema') schemaSelect(d.schemaId);
  if (d.aulaAction === 'filter-drugs') filterDrugs(d.category, el);
  if (d.aulaAction === 'check-case') checkCase(Number(d.caseNumber), d.answer);
  if (d.aulaAction === 'flip-card') flipCard(el);
});
document.addEventListener('change', event => {
  const el = event.target.closest('[data-aula-action="answer-quiz"]');
  if (el) answerQuiz(Number(el.dataset.question), el.dataset.answer);
});
