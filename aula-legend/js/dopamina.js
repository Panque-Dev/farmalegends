(() => {
  const sourceProgram = 'Programa Académico de Farmacología, Semana 12, p. 26 (PDF p. 2)';
  const sourceP = 'Katzung, Farmacología básica y clínica, 16.ª ed., cap. 28';
  const sourceS = 'Katzung, Farmacología básica y clínica, 16.ª ed., cap. 19';

  const drugs = [
    { id:'levodopa-carbidopa', name:'Levodopa-carbidopa', area:'Antiparkinsoniano', group:'Precursor dopaminérgico + inhibidor periférico de dopa-descarboxilasa', polarity:'agonist', mech:'Levodopa cruza la barrera hematoencefálica y se convierte en dopamina; carbidopa inhibe la descarboxilación periférica y no entra al SNC.', target:'Síntesis de dopamina / dopa-descarboxilasa periférica', indication:'Enfermedad de Parkinson; tratamiento de síntomas motores.', efficacy:'Levodopa es descrita como la terapia sintomática más eficaz; puede desarrollar fluctuaciones y discinesias con uso prolongado.', pk:'Levodopa oral; concentración máxima aproximada 1–2 h; semivida plasmática 1–3 h. Carbidopa aumenta disponibilidad central al reducir metabolismo periférico.', dose:'El texto da como inicio ilustrativo carbidopa 25 mg/levodopa 100 mg tres veces al día, con titulación gradual; muchos requieren otras pautas. No usar como indicación individual.', adverse:'Náusea, arritmias, discinesias, alteraciones conductuales, fenómenos de encendido-apagado y desgaste.', interactions:'Alimentos retrasan aparición plasmática; aminoácidos compiten por absorción/transporte. Dosis farmacológicas de piridoxina pueden reducir efecto de levodopa si no se administra carbidopa.', monitor:'Respuesta motora, fluctuaciones, discinesias y tolerabilidad; análisis de laboratorio rutinarios: No especificado en las lecturas.', contraindications:'No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'No interrumpir abruptamente; el texto señala riesgos por suspensión. Horario respecto de alimentos conforme a indicación profesional.', pearl:'La carbidopa no cruza la barrera hematoencefálica; reduce metabolismo periférico y requerimientos de levodopa.', refs:`${sourceProgram}; ${sourceP}, pp. 5, 7–13, 35.` , badge:'Precursor / coadyuvante', polarityLabel:'PRECURSOR + INHIBIDOR', trading:'Sinemet y otras presentaciones listadas; Katzung cap. 28, p. 38.' },
    { id:'rasagilina', name:'Rasagilina', area:'Antiparkinsoniano', group:'Inhibidor selectivo de MAO-B', polarity:'agonist', mech:'Inhibe selectivamente MAO-B; a dosis mayores puede inhibir MAO-A. El programa la clasifica como inhibidor selectivo de MAO-B.', target:'Monoaminooxidasa B (MAO-B)', indication:'Adyuvante a levodopa en enfermedad de Parkinson con fluctuaciones de respuesta.', efficacy:'Puede suavizar la respuesta a levodopa; no se presenta como equivalente a levodopa.', pk:'Vía oral. Otros datos de absorción, biodisponibilidad, metabolismo y semivida: No especificado en las lecturas.', dose:'El texto refiere 0.5 o 1 mg/día como adyuvante a carbidopa-levodopa.', adverse:'Puede aumentar efectos adversos de levodopa: discinesias, cambios mentales, náusea y alteraciones del sueño.', interactions:'No combinar con otros IMAO; precaución con ISRS y tricíclicos por posible interacción tóxica/síndrome serotoninérgico teórico.', monitor:'Respuesta y efectos adversos dopaminérgicos. Monitorización de laboratorio específica: No especificado en las lecturas.', contraindications:'No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'No suspender ni combinar medicamentos sin indicación profesional; revisar interacciones antes de iniciar otros fármacos.', pearl:'La lectura no confirma un efecto neuroprotector concluyente; el beneficio de modificar progresión se describe como incierto.', refs:`${sourceProgram}; ${sourceP}, pp. 18–19, 25–26, 36.` , badge:'Inhibidor enzimático', polarityLabel:'INHIBIDOR MAO-B', trading:'Azilect; Katzung cap. 28, p. 39.' },
    { id:'selegilina', name:'Selegilina', area:'Antiparkinsoniano', group:'Inhibidor selectivo de MAO-B', polarity:'agonist', mech:'Inhibe selectivamente MAO-B en el esquema terapéutico del temario; en dosis mayores la selectividad puede perderse para inhibidores de esta clase.', target:'Monoaminooxidasa B (MAO-B)', indication:'Coadyuvante a levodopa para prolongar o suavizar la respuesta en Parkinson.', efficacy:'El texto refiere que puede ser menos potente que rasagilina y tiene efecto menor como monoterapia.', pk:'Vía oral. Otros datos de absorción, biodisponibilidad, metabolismo y semivida: No especificado en las lecturas.', dose:'El texto refiere 5 mg con desayuno y 5 mg con comida; tomarla tarde puede causar insomnio.', adverse:'Puede aumentar discinesias, cambios mentales, náusea y alteraciones del sueño junto con levodopa; insomnio si se administra tarde.', interactions:'No combinar con otros IMAO; precaución con ISRS y tricíclicos por riesgo teórico de síndrome serotoninérgico. IMAO no selectivos con levodopa pueden causar crisis hipertensiva.', monitor:'Respuesta motora, discinesias, estado mental, sueño y presión arterial según riesgo clínico; esquema de laboratorio: No especificado.', contraindications:'No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'Seguir el horario indicado para reducir insomnio; consultar antes de añadir antidepresivos, analgésicos u otros IMAO.', pearl:'La lectura especifica desayuno y comida, no tarde; puede potenciar efectos dopaminérgicos de levodopa.', refs:`${sourceProgram}; ${sourceP}, pp. 18–19, 36, 39.` , badge:'Inhibidor enzimático', polarityLabel:'INHIBIDOR MAO-B', trading:'Emsam; Katzung cap. 28, p. 39.' },
    { id:'pramipexol', name:'Pramipexol', area:'Antiparkinsoniano', group:'Agonista de receptores dopaminérgicos D₂, D₃ y D₄ (según programa)', polarity:'agonist', mech:'Agonista dopaminérgico directo no ergótico; el temario especifica receptores D₂, D₃ y D₄.', target:'Receptores D₂, D₃ y D₄', indication:'Monoterapia para Parkinson leve o adyuvante en fluctuación/acinesia al final de dosis.', efficacy:'Menor beneficio sintomático que levodopa; puede reducir fluctuaciones/discinesias a largo plazo frente a levodopa, según resumen del capítulo.', pk:'Vía oral; duración de efecto aproximada de 8 h en el cuadro resumen. Otros datos de absorción, metabolismo y eliminación: No especificado en las lecturas.', dose:'Texto: iniciar 0.25 mg tres veces al día; subir gradualmente. Rango descrito 2–8 mg tres veces al día; no individualizar ni calcular desde esta aula.', adverse:'Náusea/vómito, hipotensión postural, discinesias, confusión, trastornos del control de impulsos, somnolencia y edema.', interactions:'La selección requiere considerar efectos mentales y somnolencia; interacciones específicas: No especificado en las lecturas.', monitor:'Respuesta y tolerancia; somnolencia, edema, presión ortostática, confusión y conductas impulsivas.', contraindications:'No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'Ajuste gradual de acuerdo con respuesta/tolerancia en el texto; informar somnolencia repentina o conductas compulsivas.', pearl:'Los ataques de sueño y punding se describen particularmente con agonistas dopaminérgicos.', refs:`${sourceProgram}; ${sourceP}, pp. 14–16, 35, 39.` , badge:'Agonista dopaminérgico', polarityLabel:'AGONISTA D₂/D₃/D₄', trading:'Mirapex; Katzung cap. 28, p. 38.' },
    { id:'haloperidol', name:'Haloperidol', area:'Antipsicótico típico', group:'Antagonista de receptores D₂', polarity:'antagonist', mech:'Antagonista dopaminérgico D₂; el temario lo clasifica como antipsicótico típico.', target:'Receptor dopaminérgico D₂', indication:'Esquizofrenia; otras indicaciones del capítulo incluyen manía aguda.', efficacy:'Antipsicótico de alta potencia; segunda generación no necesariamente más eficaz en conjunto, pero con perfil motor más favorable que FGA potentes.', pk:'Formas oral, solución, IM y decanoato listadas. Otros datos cinéticos por vía oral: No especificado en las lecturas.', dose:'Cuadro de Katzung incluye intervalo oral adulto 2.5–30 mg/día; verificar cuadro, indicación, formulación y contexto clínico antes de emplear.', adverse:'Parkinsonismo, acatisia, distonía y otros síntomas extrapiramidales; hiperprolactinemia. Riesgo QT con formulación IV.', interactions:'La lectura advierte prolongación QT y taquicardia ventricular con haloperidol IV; no usar vía IV según tabla de farmacología clínica citada.', monitor:'Vigilancia clínica de EPS y tolerabilidad; estrategia individual de ECG/laboratorio: No especificado en las lecturas.', contraindications:'Contraindicaciones específicas: No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'No suspender ni modificar de forma abrupta sin indicación profesional; reportar rigidez, fiebre, alteración de conciencia o movimientos anormales.', pearl:'El bloqueo D₂ nigroestriatal puede causar parkinsonismo inducido por medicamentos.', refs:`${sourceProgram}; ${sourceS}, pp. 9, 12, 21, 24, 38, 52.` , badge:'Antagonista dopaminérgico', polarityLabel:'ANTAGONISTA D₂', trading:'No especificado en las lecturas.' },
    { id:'risperidona', name:'Risperidona', area:'Antipsicótico atípico', group:'Antagonista D₂ y 5-HT₂A (según programa)', polarity:'antagonist', mech:'El temario la incluye entre antagonistas D₂ y 5-HT₂A; el antagonismo 5-HT₂A se relaciona con menor riesgo de EPS que antagonismo D₂ potente.', target:'Receptores D₂ y 5-HT₂A', indication:'Esquizofrenia; el capítulo también describe otras indicaciones fuera del alcance semanal.', efficacy:'Antipsicótico de segunda generación; riesgo de EPS no ausente y puede elevar prolactina.', pk:'Tableta oral, solución, ODT y formas de depósito descritas en cuadros. Cinética: No especificado en las lecturas salvo cuadros de presentación y dosis.', dose:'Cuadro del capítulo: 2–10 mg/día para esquizofrenia en adulto; presentaciones y vía modifican la pauta.', adverse:'EPS dependientes de dosis, hiperprolactinemia y riesgo metabólico moderado.', interactions:'Vigilancia metabólica de clase en tratamiento prolongado; interacción específica: No especificado en las lecturas.', monitor:'Peso, glucemia y lípidos basales y de seguimiento en antipsicóticos; valorar prolactina ante síntomas.', contraindications:'Contraindicaciones específicas: No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'No especificado en las lecturas de esta semana.', overdose:'No especificado en las lecturas.', counsel:'Adherencia y seguimiento continuado según plan de prescripción; no suspender o cambiar la dosis de manera autónoma.', pearl:'Risperidona está entre los atípicos con mayor riesgo de hiperprolactinemia.', refs:`${sourceProgram}; ${sourceS}, pp. 13, 23–24, 48, 51, 54, 73.` , badge:'Antagonista D₂ / 5-HT₂A', polarityLabel:'ANTAGONISTA D₂/5-HT₂A', trading:'No especificado en las lecturas.' },
    { id:'clozapina', name:'Clozapina', area:'Antipsicótico atípico', group:'Antagonista D₂ y 5-HT₂A (según programa); perfil multirreceptor', polarity:'antagonist', mech:'El temario la clasifica como antagonista D₂/5-HT₂A. El texto describe antagonismo D₂ más débil que otros antipsicóticos y potente antagonismo 5-HT₂A.', target:'Receptores D₂ / 5-HT₂A; varios blancos adicionales descritos en capítulo', indication:'Esquizofrenia resistente al tratamiento; otras situaciones especiales se describen en capítulo, no todas son parte del tema.', efficacy:'Respuesta descrita de 40–60% en esquizofrenia resistente; monitorización plasmática puede apoyar evaluación de exposición en casos seleccionados.', pk:'Biodisponibilidad oral aproximada 60%; t½ máxima 2.5 h; metabolismo con contribución importante de CYP1A2 en el cuadro del capítulo.', dose:'Cuadro de Katzung: 200–900 mg/día oral para esquizofrenia; no constituye pauta de inicio. Dosis individual: No especificado en las lecturas.', adverse:'Neutropenia grave, efectos metabólicos, sedación, efectos anticolinérgicos, hipotensión ortostática, estreñimiento y sialorrea.', interactions:'Evitar carga anticolinérgica adicional cuando sea posible; varias interacciones metabólicas existen, pero detalle individual por concomitante: No especificado en la lectura de esta semana.', monitor:'Requiere vigilancia hematológica del recuento absoluto de neutrófilos; obtener peso, glucosa/HbA1c y lípidos basales y dar seguimiento metabólico.', contraindications:'No usar en lactancia según texto por riesgo de neutropenia, sedación y convulsiones en lactante; otras contraindicaciones: No especificado en las lecturas.', pregnancy:'No especificado en las lecturas de esta semana.', lactation:'Katzung la identifica como contraindicada durante lactancia en el pasaje citado por riesgo de neutropenia, sedación y convulsiones del lactante.', overdose:'No especificado en las lecturas.', counsel:'Mantener controles hematológicos y metabólicos acordados; comunicar fiebre/infección o estreñimiento importante; no suspender sin plan clínico.', pearl:'Clozapina es excepcional por eficacia en esquizofrenia resistente y riesgo de neutropenia grave; la vigilancia hematológica es obligatoria en el capítulo.', refs:`${sourceProgram}; ${sourceS}, pp. 13, 20, 22, 31–32, 50–53, 55, 72.` , badge:'Atípico · vigilancia hematológica', polarityLabel:'ANTAGONISTA D₂/5-HT₂A', trading:'No especificado en las lecturas.' }
  ];

  const gallery = document.getElementById('drug-gallery');
  if (gallery) {
    gallery.innerHTML = drugs.map(d => `
      <article class="drug-specimen" data-polarity="${d.polarity}" tabindex="0" aria-label="Ficha de ${d.name}">
        <div class="specimen-meta"><span>${d.area}</span><span>${d.badge}</span></div>
        <h3>${d.name}</h3><div class="specimen-meta"><span>${d.group}</span><span class="gold-chip">${d.polarityLabel}</span></div>
        <p class="mechanism"><strong>Blanco:</strong> ${d.target}<br><strong>Mecanismo del temario:</strong> ${d.mech}</p>
        <details><summary>Abrir ficha tipo compendio</summary><dl>
          <dt>Indicación</dt><dd>${d.indication}</dd><dt>Eficacia comparativa</dt><dd>${d.efficacy}</dd>
          <dt>Dosis</dt><dd>${d.dose}</dd><dt>Farmacocinética</dt><dd>${d.pk}</dd>
          <dt>Reacciones adversas</dt><dd>${d.adverse}</dd><dt>Interacciones / precauciones</dt><dd>${d.interactions}</dd>
          <dt>Contraindicaciones</dt><dd>${d.contraindications}</dd><dt>Embarazo</dt><dd>${d.pregnancy}</dd><dt>Lactancia</dt><dd>${d.lactation}</dd>
          <dt>Monitorización</dt><dd>${d.monitor}</dd><dt>Sobredosis</dt><dd>${d.overdose}</dd><dt>Consejo al paciente</dt><dd>${d.counsel}</dd>
          <dt>Perla clínica</dt><dd>${d.pearl}</dd><dt>Presentación / nombre comercial</dt><dd>${d.trading}</dd><dt>Fuente</dt><dd>${d.refs}</dd>
        </dl></details>
      </article>`).join('');
  }

  document.querySelectorAll('.module-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.module-tab').forEach(item => { item.classList.remove('is-active'); item.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.module-panel').forEach(panel => { panel.hidden = true; panel.classList.remove('is-active'); });
    tab.classList.add('is-active'); tab.setAttribute('aria-selected','true');
    const panel = document.getElementById(`panel-${tab.dataset.tab}`);
    if (panel) {
      panel.hidden = false;
      panel.classList.add('is-active');
      if (tab.dataset.tab === 'interacciones' && typeof window.selectDrug === 'function') {
        window.selectDrug(window.activeDopamineDrug || 'ldopa');
      }
    }
  }));

  const quiz = [
    {q:'1. ¿Qué fármaco cruza la barrera hematoencefálica como precursor de dopamina?',a:['Dopamina','Levodopa','Carbidopa'],c:1,e:'Levodopa entra al cerebro y se convierte en dopamina. Katzung 28, p. 5.'},
    {q:'2. ¿Cuál es el papel de carbidopa?',a:['Inhibir la dopa-descarboxilasa periférica','Antagonizar D₂','Inhibir MAO-B'],c:0,e:'Reduce metabolismo periférico de levodopa. Katzung 28, pp. 8–9.'},
    {q:'3. ¿Cuál fármaco del programa es agonista D₂/D₃/D₄?',a:['Haloperidol','Pramipexol','Risperidona'],c:1,e:`El programa asigna esos receptores a pramipexol (${sourceProgram}).`},
    {q:'4. ¿Qué mecanismo corresponde a rasagilina y selegilina?',a:['Antagonismo D₂','Inhibición selectiva MAO-B','Agonismo D₂'],c:1,e:`El temario las agrupa como inhibidores selectivos de MAO-B (${sourceProgram}).`},
    {q:'5. ¿Cuál reacción adversa se asocia con pramipexol en la lectura?',a:['Somnolencia','Agranulocitosis','Hiperprolactinemia como efecto principal'],c:0,e:'Somnolencia, hipotensión, confusión, edema y conductas impulsivas se describen. Katzung 28, pp. 15–16.'},
    {q:'6. ¿Qué blanco antagoniza haloperidol según el programa?',a:['D₂','SV2A','MAO-B'],c:0,e:`Haloperidol es antagonista D₂ y típico (${sourceProgram}).`},
    {q:'7. ¿Qué par de receptores asigna el temario a risperidona y clozapina?',a:['D₂ y 5-HT₂A','D₁ y GABA-A','D₃ y MAO-B'],c:0,e:`El programa especifica D₂ y 5-HT₂A (${sourceProgram}).`},
    {q:'8. ¿Qué vigilancia destaca para clozapina?',a:['Recuento hematológico / ANC','Nivel de levodopa','Prueba de MAO-B'],c:0,e:'La lectura señala vigilancia hematológica obligatoria. Katzung 19, pp. 53 y 72.'},
    {q:'9. ¿Qué reacción es más característica de risperidona en la comparación del capítulo?',a:['Hiperprolactinemia','Discinesia por levodopa','Insomnio si se toma tarde'],c:0,e:'Risperidona figura entre las de mayor riesgo de hiperprolactinemia. Katzung 19, pp. 48 y 73.'},
    {q:'10. ¿Cuál combinación puede elevar el riesgo de interacción serotoninérgica teórica con rasagilina/selegilina?',a:['ISRS o antidepresivo tricíclico','Carbidopa sola','Levodopa con alimento'],c:0,e:'El capítulo recomienda precaución con ISRS y tricíclicos; el riesgo se califica como teórico. Katzung 28, p. 19.'}
  ];
  const quizList = document.getElementById('quiz-list');
  if (quizList) quizList.innerHTML = quiz.map((item,i) => `<div class="quiz-item"><p>${item.q}</p>${item.a.map((answer,j)=>`<button type="button" data-quiz="${i}" data-choice="${j}">${String.fromCharCode(65+j)}) ${answer}</button>`).join('')}<div class="quiz-feedback" aria-live="polite"></div></div>`).join('');
  quizList?.addEventListener('click', event => {
    const button = event.target.closest('[data-quiz]'); if (!button) return;
    const item = quiz[Number(button.dataset.quiz)]; const fb = button.parentElement.querySelector('.quiz-feedback');
    fb.textContent = Number(button.dataset.choice) === item.c ? `Correcto. ${item.e}` : `Revisa el mecanismo y vuelve a intentarlo. ${item.e}`;
  });

  const flashcards = [
    ['Parkinson: alteración central','Pérdida de neuronas dopaminérgicas nigroestriatales.'],['¿Qué atraviesa BHE?','Levodopa; dopamina periférica no.'],['Función de carbidopa','Reduce descarboxilación periférica de levodopa.'],['Pramipexol','Agonista D₂/D₃/D₄ según el programa.'],['MAO-B','Rasagilina y selegilina inhiben selectivamente MAO-B.'],['Haloperidol','Antagonista D₂; antipsicótico típico.'],['Risperidona','Antagonista D₂/5-HT₂A; atípico.'],['Clozapina: alerta','Neutropenia grave; requiere vigilancia hematológica.'],['Risperidona: alerta','Mayor riesgo de hiperprolactinemia entre varios atípicos.'],['No suspender abruptamente','Las lecturas advierten contra interrupción de terapia antiparkinsoniana.']
  ];
  const flashGrid = document.getElementById('flashcard-grid');
  if (flashGrid) flashGrid.innerHTML = flashcards.map(([q,a])=>`<button type="button" class="flashcard"><strong class="question">${q}</strong><span class="answer">${a}</span></button>`).join('');
  flashGrid?.addEventListener('click', e => { const card=e.target.closest('.flashcard'); if(card) card.classList.toggle('is-flipped'); });

  const activity = [
    {name:'Levodopa-carbidopa', correct:'parkinson'}, {name:'Rasagilina', correct:'parkinson'}, {name:'Selegilina', correct:'parkinson'}, {name:'Pramipexol', correct:'parkinson'},
    {name:'Haloperidol', correct:'esquizofrenia'}, {name:'Risperidona', correct:'esquizofrenia'}, {name:'Clozapina', correct:'esquizofrenia'}
  ];
  const activityNode = document.getElementById('activity-sort');
  if (activityNode) {
    activityNode.innerHTML = `<div class="activity-column" data-zone="parkinson"><h4>Parkinson · restaurar/prolongar señal</h4></div><div class="activity-column" data-zone="esquizofrenia"><h4>Esquizofrenia · antagonizar señal</h4></div><div class="activity-pool" data-zone="pool" aria-label="Fármacos pendientes de clasificar"></div>`;
    const pool=activityNode.querySelector('.activity-pool');
    activity.forEach((item,i)=>{ const btn=document.createElement('button'); btn.type='button'; btn.className='activity-chip'; btn.textContent=item.name; btn.dataset.index=String(i); btn.dataset.polarity=item.correct==='parkinson'?'agonist':'antagonist'; btn.draggable=true; pool.appendChild(btn); });
    activityNode.querySelectorAll('.activity-chip').forEach(btn=>btn.addEventListener('click',()=>{ const current=btn.closest('[data-zone]')?.dataset.zone||'pool'; const target=current==='pool'?'parkinson':current==='parkinson'?'esquizofrenia':'pool'; const zone=activityNode.querySelector(`[data-zone="${target}"]`); if(zone) zone.appendChild(btn); }));
    activityNode.querySelectorAll('.activity-column').forEach(zone=>{
      zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
      zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
      zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');const id=e.dataTransfer.getData('text/plain');const chip=activityNode.querySelector(`[data-index="${id}"]`);if(chip)zone.appendChild(chip);});
    });
    activityNode.addEventListener('dragstart',e=>{const chip=e.target.closest('.activity-chip');if(chip)e.dataTransfer.setData('text/plain',chip.dataset.index);});
  }
  document.getElementById('check-activity')?.addEventListener('click',()=>{
    const assigned=[...activityNode.querySelectorAll('.activity-column')].flatMap(zone=>[...zone.querySelectorAll('.activity-chip')].map(chip=>({correct:activity[Number(chip.dataset.index)].correct, zone:zone.dataset.zone})));
    const feedback=document.getElementById('activity-feedback');
    feedback.textContent=assigned.length!==activity.length?'Clasifica los siete fármacos para revisar la respuesta.':assigned.every(x=>x.correct===x.zone)?'Clasificación correcta. La orientación terapéutica del circuito es distinta en los dos temas.':'Hay fármacos por revisar. Parkinson usa precursores/agonismo/inhibición MAO-B; esquizofrenia usa los antagonistas D₂ del programa.';
  });
})();


// ==========================================================================
// MÓDULO 3D: DIANAS MOLECULARES E INTERACCIONES CRUZADAS (PARKINSON vs ESQUIZOFRENIA)
// ==========================================================================
(() => {
  const DRUG_DATA = {
    ldopa: {
      name: "Levodopa / Carbidopa",
      classTitle: "Precursor dopaminérgico + Inhibidor periférico de AADC",
      badgeGroup: "ANTIPARKINSONIANO • 1ª LÍNEA",
      targetId: "target-lat1",
      targetSubId: "target-aadc",
      targetName: "Diana: LAT-1 (BHE) y AADC",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Atraviesa placenta; evaluar estricto riesgo-beneficio",
      mechanism: "La Levodopa cruza la barrera hematoencefálica a través del transportador de aminoácidos neutros LAT-1. Dentro de las neuronas dopaminérgicas estriatales residuales se convierte en Dopamina por acción de la Dopa-Descarboxilasa (AADC). La Carbidopa no atraviesa la BHE e inhibe la AADC en sangre periférica, evitando náuseas, hipotensión y aumentando 10 veces la biodisponibilidad cerebral.",
      indications: "Tratamiento estándar de oro para los síntomas cardinales de la Enfermedad de Parkinson (bradicinesia, rigidez muscular, temblor de reposo).",
      contraindications: "Glaucoma de ángulo cerrado, psicosis activa descompensada, melanoma activo no diagnosticado, uso conjunto con inhibidores de MAO no selectivos.",
      interaction: "Los antipsicóticos antagonistas D₂ (Haloperidol, Risperidona) anulan totalmente el beneficio motor de la Levodopa y provocan crisis acinéticas. Si aparece psicosis, usar únicamente Pimavanserina o Clozapina."
    },
    prami: {
      name: "Pramipexol",
      classTitle: "Agonista dopaminérgico selectivo no ergolínico (D₂ / D₃)",
      badgeGroup: "ANTIPARKINSONIANO • AGONISTA DIRECTO",
      targetId: "target-d2",
      targetSubId: null,
      targetName: "Diana: Receptores D₂ y D₃ Postsinápticos",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Excreción renal elevada; vigilar función materna",
      mechanism: "Ejerce agonismo directo con alta afinidad intrínseca sobre la familia de receptores D₂ (especialmente D₃ y D₂), activando la vía de proteína Gi y disminuyendo los niveles intracelulares de AMPc. Al no requerir transformación enzimática por neuronas degeneradas, es eficaz aun con pérdida neuronal avanzada de la sustancia negra.",
      indications: "Monoterapia inicial en pacientes jóvenes (<60-65 años) con Parkinson para retrasar el inicio de discinesias por Levodopa; Síndrome de Piernas Inquietas.",
      contraindications: "Trastornos graves del control de impulsos (ludopatía, hipersexualidad, compras compulsivas), somnolencia súbita al conducir, psicosis activa.",
      interaction: "Compromiso competitivo en el receptor D₂ con antipsicóticos típicos. Puede desencadenar alucinaciones y cuadros psicóticos por hiperestimulación mesolímbica D₃."
    },
    seleg: {
      name: "Selegilina",
      classTitle: "Inhibidor irreversible selectivo de Monoaminooxidasa B (MAO-B)",
      badgeGroup: "ANTIPARKINSONIANO • INHIBIDOR ENZIMÁTICO",
      targetId: "target-maob",
      targetSubId: null,
      targetName: "Diana: MAO-B Mitocondrial Presináptica",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Precaución con preeclampsia y fármacos simpáticos",
      mechanism: "Se une irreversiblemente al sitio catalítico de la isoenzima MAO-B en las mitocondrias neuronales y gliales, impidiendo la desaminación oxidativa de la dopamina y prolongando su tiempo de acción en la hendidura sináptica. A dosis de 5-10 mg/día conserva selectividad por MAO-B, sin causar el 'efecto queso' tiramínico.",
      indications: "Coadyuvante de Levodopa/Carbidopa para aminorar las fluctuaciones motoras ('wearing-off' o deterioro de fin de dosis); monoterapia muy temprana.",
      contraindications: "Uso concurrente con meperidina (petidina), tramadol, dextrometorfano, ISRS o antidepresivos tricíclicos por riesgo mortal de Síndrome Serotoninérgico.",
      interaction: "Pérdida de selectividad MAO-B si se superan 10 mg/día, convirtiéndose en inhibidor MAO-A con riesgo de crisis hipertensiva simpaticomimética."
    },
    entac: {
      name: "Entacapona",
      classTitle: "Inhibidor selectivo y reversible de COMT periférica",
      badgeGroup: "ANTIPARKINSONIANO • AHORRADOR DE DOPA",
      targetId: "target-comt",
      targetSubId: null,
      targetName: "Diana: Catecol-O-Metiltransferasa (COMT)",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Causa cromaturia naranja benigna",
      mechanism: "Inhibe de forma reversible la enzima COMT en tejidos periféricos (hígado y tracto digestivo). Al bloquear la conversión de Levodopa en 3-O-metildopa (3-OMD), disminuye la competencia de 3-OMD por el transportador LAT-1 en la BHE y eleva sustancialmente el área bajo la curva (AUC) de Levodopa en el cerebro.",
      indications: "Siempre en combinación obligada con Levodopa/Carbidopa en pacientes que experimentan fluctuaciones motoras o desgaste de fin de dosis.",
      contraindications: "Uso con IMAO no selectivos, antecedentes de rabdomiólisis o Síndrome Neuroléptico Maligno.",
      interaction: "Aumenta los niveles plasmáticos de fármacos metabolizados por COMT (isoproterenol, adrenalina). No interactúa negativamente con antipsicóticos a nivel cerebral porque no cruza la BHE."
    },
    amant: {
      name: "Amantadina",
      classTitle: "Antagonista del receptor NMDA y facilitador dopaminérgico",
      badgeGroup: "ANTIPARKINSONIANO • MULTIMODAL",
      targetId: "target-vmat2",
      targetSubId: "target-dat",
      targetName: "Diana: NMDA, DAT y Liberación Vesicular",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Reportes de teratogénesis cardiovascular",
      mechanism: "Bloquea los canales iónicos del receptor glutamatérgico NMDA, disminuyendo la toxicidad excitotóxica y la hiperactividad subtalámica; simultáneamente estimula la exocitosis de dopamina desde vesículas presinápticas e inhibe levemente la recaptura por DAT.",
      indications: "Fármaco de elección para el tratamiento y control de las discinesias inducidas por Levodopa en Parkinson avanzado; síntomas leves en fase temprana.",
      contraindications: "Insuficiencia cardíaca congestiva grave, antecedentes de crisis convulsivas, edema periférico preexistente e insuficiencia renal severa.",
      interaction: "Potencia los efectos anticolinérgicos y alucinatorios si se combina con fármacos psicotrópicos o antihistamínicos. Causa Livedo Reticularis en miembros inferiores."
    },
    halo: {
      name: "Haloperidol",
      classTitle: "Antipsicótico típico de primera generación (Butirofenona)",
      badgeGroup: "ANTIPSICÓTICO TÍPICO • D₂ POTENTE",
      targetId: "target-d2",
      targetSubId: null,
      targetName: "Diana: Bloqueo de Receptores D₂ Postsinápticos",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Riesgo de síntomas extrapiramidales neonatales",
      mechanism: "Antagonismo competitivo de altísima potencia sobre los receptores dopaminérgicos D₂ en las vías mesolímbica y mesocortical, aliviando las alucinaciones y delirios (síntomas positivos). Al bloquear simultáneamente los receptores D₂ de la vía nigroestriada, desinhibe la vía indirecta y produce parkinsonismo farmacológico severo.",
      indications: "Esquizofrenia y psicosis aguda, agitación psicomotriz en urgencias, corea de Huntington, tics graves en Síndrome de Gilles de la Tourette.",
      contraindications: "ENFERMEDAD DE PARKINSON (CONTRAINDICACIÓN ABSOLUTA), depresión del SNC, coma, intervalo QTc prolongado (riesgo de Torsades de Pointes).",
      interaction: "ANTAGONISMO TOTAL CON LEVODOPA Y PRAMIPEXOL. Anula la terapia antiparkinsoniana y puede precipitar crisis distónicas agudas, parkinsonismo y Síndrome Neuroléptico Maligno."
    },
    risper: {
      name: "Risperidona",
      classTitle: "Antipsicótico atípico de segunda generación (Benzisoxazol)",
      badgeGroup: "ANTIPSICÓTICO ATÍPICO • D₂ / 5-HT₂A",
      targetId: "target-d2",
      targetSubId: "target-5ht2a",
      targetName: "Diana: Receptores D₂ y 5-HT₂A",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Monitorear hiperprolactinemia y peso materno",
      mechanism: "Bloquea potentemente los receptores serotoninérgicos 5-HT₂A y los receptores dopaminérgicos D₂. El antagonismo 5-HT₂A en la vía nigroestriada promueve una liberación local compensatoria de dopamina, reduciendo el riesgo de extrapiramidalismo a dosis bajas (<4 mg/día). A dosis más altas (>6 mg/día) se comporta clínicamente como un neuroléptico típico.",
      indications: "Esquizofrenia en adultos y adolescentes (síntomas positivos y negativos), manía bipolar, irritabilidad en trastorno del espectro autista.",
      contraindications: "Demencia en adultos mayores (riesgo aumentado de eventos vasculares cerebrales y muerte), hiperprolactinemia sintomática grave.",
      interaction: "A dosis intermedias-altas antagoniza el beneficio de Levodopa y Pramipexol. Provoca hiperprolactinemia marcada por bloqueo D₂ en la vía tuberoinfundibular."
    },
    cloza: {
      name: "Clozapina",
      classTitle: "Antipsicótico atípico dibenzodiazepínico (Multirreceptor)",
      badgeGroup: "ANTIPSICÓTICO ATÍPICO • BAJA AFINIDAD D₂",
      targetId: "target-5ht2a",
      targetSubId: "target-d2",
      targetName: "Diana: 5-HT₂A, D₄ y D₂ Transitorio",
      fda: "FDA: Cat. B",
      fdaDesc: "Cat. B • Sin teratogénesis mayor demostrada; vigilar neutrófilos",
      mechanism: "Bloquea con muy alta afinidad los receptores 5-HT₂A y D₄, mientras presenta una afinidad débil y una disociación sumamente rápida sobre los receptores D₂ estriatales (ocupación <50%). Debido a esto, alivia la psicosis sin inducir parkinsonismo ni interferir con la función motora nigroestriada.",
      indications: "Esquizofrenia refractaria al tratamiento (resistencia a ≥2 antipsicóticos convencionales); conducta suicida recurrente; PSICOSIS EN ENFERMEDAD DE PARKINSON.",
      contraindications: "Antecedentes de agranulocitosis inducida por fármacos, neutropenia (<1,500/mm³), íleo paralítico, epilepsia no controlada.",
      interaction: "FÁRMACO DE ELECCIÓN EN PSICOSIS POR PARKINSON. Puede coadministrarse con Levodopa sin anular el control motor. Requiere hemograma y recuento absoluto de neutrófilos (RAN) estricto."
    },
    pimav: {
      name: "Pimavanserina",
      classTitle: "Agonista inverso y antagonista selectivo del receptor 5-HT₂A",
      badgeGroup: "ANTIPSICÓTICO ESPECÍFICO DE PARKINSON",
      targetId: "target-5ht2a",
      targetSubId: null,
      targetName: "Diana: Receptor 5-HT₂A Puro (Cero Afinidad D₂)",
      fda: "FDA: Cat. C",
      fdaDesc: "Cat. C • Evaluar riesgo-beneficio específico",
      mechanism: "Agonista inverso potente y selectivo para los receptores de serotonina 5-HT₂A (y en menor medida 5-HT₂C). Carece por completo de afinidad o actividad intrínseca sobre receptores dopaminérgicos D₂, adrenérgicos, histaminérgicos o muscarínicos, eliminando la base molecular del deterioro motor.",
      indications: "Aprobada específicamente por la FDA para el tratamiento de las alucinaciones y delirios asociados con la psicosis de la Enfermedad de Parkinson.",
      contraindications: "Hipersensibilidad, intervalo QTc prolongado significativo o uso concomitante con antiarrítmicos de clase IA y III.",
      interaction: "COMPATIBILIDAD PERFECTA CON LEVODOPA Y PRAMIPEXOL. Al no poseer bloqueo de receptores D₂, no interfiere en lo absoluto con la respuesta terapéutica motora."
    }
  };

  const PAIR_INTERACTIONS = {
    "ldopa-halo": {
      title: "Levodopa/Carbidopa + Haloperidol",
      compat: "⛔ ANTAGONISMO D₂ SEVERO",
      compatClass: "bg-rose-950 text-rose-200 border-rose-500",
      type: "Antagonismo farmacodinámico competitivo puro en receptores D₂",
      nigro: "BLOQUEO COMPLETO ➔ Parálisis motora y crisis acinética",
      meso: "Efecto antipsicótico comprometido por exceso de DA",
      consequence: "El Haloperidol satura más del 80% de los receptores D₂ en el cuerpo estriado, cancelando la acción de la dopamina formada a partir de Levodopa. El paciente experimenta acinesia súbita, rigidez 'en tubo de plomo' y alto riesgo de Síndrome Neuroléptico Maligno.",
      solution: "Contraindicación absoluta. Suspender Haloperidol. Si el paciente con Parkinson presenta psicosis, usar Pimavanserina o Clozapina."
    },
    "ldopa-risper": {
      title: "Levodopa/Carbidopa + Risperidona",
      compat: "⚠️ ANTAGONISMO DOSIS-DEPENDIENTE",
      compatClass: "bg-amber-950 text-amber-200 border-amber-500",
      type: "Antagonismo D₂ moderado-alto con componente 5-HT₂A",
      nigro: "Bloqueo D₂ parcial a dosis bajas (<2 mg); bloqueo total a >4 mg/día",
      meso: "Control de psicosis con riesgo de fluctuaciones motoras",
      consequence: "A dosis habituales de esquizofrenia (>4 mg/día), la Risperidona deteriora severamente el control motor de la Levodopa y eleva prolactina.",
      solution: "Evitar en pacientes parkinsonianos. Sustituir por Clozapina, Quetiapina o Pimavanserina."
    },
    "ldopa-cloza": {
      title: "Levodopa/Carbidopa + Clozapina",
      compat: "✅ COMBINACIÓN DE ELECCIÓN",
      compatClass: "bg-emerald-950 text-emerald-200 border-emerald-500",
      type: "Sinergia terapéutica por disociación rápida D₂ y bloqueo 5-HT₂A",
      nigro: "PRESERVADO: Ocupación D₂ estriatal <40%",
      meso: "Control excelente de psicosis y alucinaciones",
      consequence: "La Clozapina controla los delirios y alucinaciones causados por Levodopa sin restar eficacia motora al tratamiento del Parkinson.",
      solution: "Tratamiento de referencia hospitalaria en psicosis parkinsoniana. Requiere control hematológico semanal de neutrófilos."
    },
    "ldopa-pimav": {
      title: "Levodopa/Carbidopa + Pimavanserina",
      compat: "⭐ COMBINACIÓN ÓPTIMA (GOLD STANDARD)",
      compatClass: "bg-sky-950 text-sky-200 border-sky-400",
      type: "Modulación 5-HT₂A pura sin intervención sobre el eje D₂",
      nigro: "100% INTACTO: Cero afinidad por receptores D₂",
      meso: "Reducción selectiva de psicosis mediada por 5-HT",
      consequence: "Pimavanserina es el único fármaco aprobado para tratar la psicosis en Parkinson que no empeora los síntomas motores en ninguna medida.",
      solution: "Pauta recomendada de primera línea en guías internacionales (34 mg una vez al día)."
    },
    "prami-halo": {
      title: "Pramipexol + Haloperidol",
      compat: "⛔ ANTAGONISMO DIRECTO EN DIANA D₂/D₃",
      compatClass: "bg-rose-950 text-rose-200 border-rose-500",
      type: "Desplazamiento competitivo directo en el sitio ortostérico de D₂",
      nigro: "Haloperidol desplaza al Pramipexol del receptor D₂",
      meso: "Riesgo de rebote de delirios y acatisia extrema",
      consequence: "Ambos fármacos compiten exactamente por el mismo sitio receptor. El Haloperidol anula el Pramipexol y precipita distonía aguda y temblor incontrolable.",
      solution: "Combinación totalmente irracional y contraindicada."
    },
    "prami-cloza": {
      title: "Pramipexol + Clozapina",
      compat: "✅ COMPATIBLE Y SEGURA",
      compatClass: "bg-emerald-950 text-emerald-200 border-emerald-500",
      type: "Preservación del agonismo D₂/D₃ estriatal",
      nigro: "Pramipexol mantiene la estimulación motora",
      meso: "Clozapina suprime las alucinaciones por D₃",
      consequence: "Permite mantener el agonista dopaminérgico mientras se resuelven las alteraciones conductuales.",
      solution: "Mantener dosis bajas de Clozapina (12.5 - 25 mg/día)."
    },
    "seleg-halo": {
      title: "Selegilina + Haloperidol",
      compat: "⛔ INEFICAZ Y RIESGOSA",
      compatClass: "bg-rose-950 text-rose-200 border-rose-500",
      type: "Falta de respuesta motora por bloqueo postsináptico de DA acumulada",
      nigro: "DA aumentada por iMAO-B pero bloqueada en receptor D₂",
      meso: "Interferencia en recaptura",
      consequence: "La acumulación presináptica de dopamina inducida por Selegilina no surte efecto porque los receptores efectores están saturados por Haloperidol.",
      solution: "Suspender Haloperidol. Reevaluar necesidad de antipsicóticos de perfil serotoninérgico."
    }
  };

  let activeDrugKey = "ldopa";

  window.selectDrug = function(key) {
    activeDrugKey = key; window.activeDopamineDrug = key;
    const data = DRUG_DATA[key];
    if (!data) return;

    // Actualizar píldoras
    document.querySelectorAll(".drug-pill").forEach(btn => {
      btn.classList.remove("active-pill-parkinson", "active-pill-psych");
    });
    const activeBtn = document.getElementById("btn-" + key);
    if (activeBtn) {
      if (["ldopa", "prami", "seleg", "entac", "amant"].includes(key)) {
        activeBtn.classList.add("active-pill-parkinson");
      } else {
        activeBtn.classList.add("active-pill-psych");
      }
    }

    // Resaltar en SVG
    document.querySelectorAll(".target-shape, #target-lat1, #target-aadc, #target-maob, #target-vmat2, #target-dat, #target-comt, #target-d2, #target-d1, #target-5ht2a").forEach(el => {
      el.classList.remove("target-highlight");
    });
    if (data.targetId) {
      const el = document.getElementById(data.targetId);
      if (el) el.classList.add("target-highlight");
    }
    if (data.targetSubId) {
      const elSub = document.getElementById(data.targetSubId);
      if (elSub) elSub.classList.add("target-highlight");
    }

    // Actualizar leyendas
    const targetLbl = document.getElementById("active-target-lbl");
    if (targetLbl) targetLbl.textContent = data.targetName;
    const pathwayInd = document.getElementById("pathway-indicator");
    if (pathwayInd) {
      if (["ldopa", "prami", "seleg", "entac", "amant"].includes(key)) {
        pathwayInd.textContent = "Vía Nigroestriada (Movimiento / Déficit de DA)";
        pathwayInd.className = "text-sky-300 font-bold";
      } else {
        pathwayInd.textContent = "Vía Mesolímbica (Psicosis) vs. Nigroestriada";
        pathwayInd.className = "text-purple-300 font-bold";
      }
    }

    // Actualizar ficha de inspección
    const dName = document.getElementById("d-name");
    if (dName) dName.textContent = data.name;
    const dClass = document.getElementById("d-class");
    if (dClass) dClass.textContent = data.classTitle;
    const dBadge = document.getElementById("d-badge-group");
    if (dBadge) dBadge.textContent = data.badgeGroup;
    const dTargetBadge = document.getElementById("d-target-badge");
    if (dTargetBadge) dTargetBadge.textContent = data.targetName;
    const dFdaBadge = document.getElementById("d-fda-badge");
    if (dFdaBadge) dFdaBadge.textContent = data.fda;
    const dFdaDesc = document.getElementById("d-fda-desc");
    if (dFdaDesc) dFdaDesc.textContent = data.fdaDesc;
    const dMech = document.getElementById("d-mechanism");
    if (dMech) dMech.innerHTML = data.mechanism;
    const dInd = document.getElementById("d-indications");
    if (dInd) dInd.textContent = data.indications;
    const dContra = document.getElementById("d-contraindications");
    if (dContra) dContra.textContent = data.contraindications;
    const dInteract = document.getElementById("d-interaction");
    if (dInteract) dInteract.innerHTML = data.interaction;
  };

  window.setMode = function(mode) {
    const inspBtn = document.getElementById("mode-inspect-btn");
    const compBtn = document.getElementById("mode-compare-btn");
    const pillsBox = document.getElementById("pills-container");
    const compBar = document.getElementById("compare-bar");
    const inspView = document.getElementById("inspector-view");
    const compView = document.getElementById("compare-view");

    if (mode === "inspect") {
      if (inspBtn) inspBtn.className = "px-3 py-1 text-xs rounded-lg font-bold bg-sky-600 text-white transition";
      if (compBtn) compBtn.className = "px-3 py-1 text-xs rounded-lg font-semibold text-slate-400 hover:text-white transition";
      if (pillsBox) pillsBox.classList.remove("hidden");
      if (compBar) compBar.classList.add("hidden");
      if (inspView) inspView.classList.remove("hidden");
      if (compView) compView.classList.add("hidden");
      window.selectDrug(activeDrugKey);
    } else {
      if (compBtn) compBtn.className = "px-3 py-1 text-xs rounded-lg font-bold bg-purple-600 text-white transition";
      if (inspBtn) inspBtn.className = "px-3 py-1 text-xs rounded-lg font-semibold text-slate-400 hover:text-white transition";
      if (pillsBox) pillsBox.classList.add("hidden");
      if (compBar) compBar.classList.remove("hidden");
      if (inspView) inspView.classList.add("hidden");
      if (compView) compView.classList.remove("hidden");
      window.runComparison();
    }
  };

  window.runComparison = function() {
    const parkEl = document.getElementById("cmp-parkinson");
    const psychEl = document.getElementById("cmp-psych");
    if (!parkEl || !psychEl) return;
    const park = parkEl.value;
    const psych = psychEl.value;
    const pairKey = park + "-" + psych;

    const fallback = {
      title: (DRUG_DATA[park]?.name || park) + " + " + (DRUG_DATA[psych]?.name || psych),
      compat: (psych === "halo" || psych === "risper") ? "⛔ ANTAGONISMO D₂ SEVERO" : "✅ COADMINISTRACIÓN SEGURA",
      compatClass: (psych === "halo" || psych === "risper") ? "bg-rose-950 text-rose-200 border-rose-500" : "bg-emerald-950 text-emerald-200 border-emerald-500",
      type: (psych === "halo" || psych === "risper") ? "Bloqueo farmacodinámico de la respuesta dopaminérgica" : "Disociación D₂ rápida o modulación serotoninérgica",
      nigro: (psych === "halo" || psych === "risper") ? "Deterioro motor inmediato" : "Función motora estriatal preservada",
      meso: "Control de síntomas psicóticos",
      consequence: (psych === "halo" || psych === "risper") ? "El antipsicótico bloquea los receptores dopaminérgicos y neutraliza la acción del tratamiento antiparkinsoniano." : "El antipsicótico atípico o modulador 5-HT₂A respeta la transmisión motora estriatal.",
      solution: (psych === "halo" || psych === "risper") ? "Evitar coadministración. Usar Clozapina o Pimavanserina si el paciente requiere antipsicótico." : "Pauta segura aprobada en guías clínicas de la FacMed."
    };

    const result = PAIR_INTERACTIONS[pairKey] || fallback;

    // Resaltar ambos en SVG
    document.querySelectorAll(".target-shape, #target-lat1, #target-aadc, #target-maob, #target-vmat2, #target-dat, #target-comt, #target-d2, #target-d1, #target-5ht2a").forEach(el => {
      el.classList.remove("target-highlight");
    });
    const t1 = document.getElementById(DRUG_DATA[park]?.targetId);
    const t2 = document.getElementById(DRUG_DATA[psych]?.targetId);
    if (t1) t1.classList.add("target-highlight");
    if (t2) t2.classList.add("target-highlight");

    const cmpTitle = document.getElementById("cmp-title");
    if (cmpTitle) cmpTitle.textContent = result.title;
    const cmpType = document.getElementById("cmp-type");
    if (cmpType) cmpType.textContent = result.type;
    const cmpNigro = document.getElementById("cmp-nigro");
    if (cmpNigro) cmpNigro.textContent = result.nigro;
    const cmpMeso = document.getElementById("cmp-meso");
    if (cmpMeso) cmpMeso.textContent = result.meso;
    const cmpConseq = document.getElementById("cmp-consequence");
    if (cmpConseq) cmpConseq.textContent = result.consequence;
    const cmpSol = document.getElementById("cmp-solution");
    if (cmpSol) cmpSol.innerHTML = result.solution;

    const badge = document.getElementById("cmp-badge-compat");
    if (badge) {
      badge.textContent = result.compat;
      badge.className = "text-xs font-bold px-2.5 py-1 rounded-full border " + result.compatClass;
    }
  };

  // Inicializar al cargar el DOM
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("btn-ldopa")) {
      window.selectDrug("ldopa");
    }
  });
})();