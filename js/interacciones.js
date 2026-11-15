(() => {
  const drugs = [
    ['fenitoina', 'Fenitoína', 'Epilepsia'], ['carbamazepina', 'Carbamazepina', 'Epilepsia'],
    ['levetiracetam', 'Levetiracetam', 'Epilepsia'], ['etosuximida', 'Etosuximida', 'Epilepsia'],
    ['diazepam', 'Diazepam', 'Epilepsia'], ['lamotrigina', 'Lamotrigina', 'Epilepsia'],
    ['valproato', 'Valproato', 'Epilepsia'], ['levodopa', 'Levodopa / carbidopa', 'Parkinson'],
    ['rasagilina', 'Rasagilina', 'Parkinson'], ['selegilina', 'Selegilina', 'Parkinson'],
    ['pramipexol', 'Pramipexol', 'Parkinson'], ['haloperidol', 'Haloperidol', 'Esquizofrenia'],
    ['risperidona', 'Risperidona', 'Esquizofrenia'], ['clozapina', 'Clozapina', 'Esquizofrenia']
  ];
  const interactions = {
    'lamotrigina|valproato': {
      title: 'Valproato + lamotrigina', type: 'Interacción farmacocinética · inhibición del metabolismo', level: 'Requiere ajuste y titulación cuidadosa',
      text: 'El valproato reduce la depuración de lamotrigina y prolonga su exposición. La lectura indica iniciar lamotrigina a una dosis menor y aumentarla más lentamente cuando se administra con valproato. La ficha del capítulo especifica 12.5–25 mg cada dos días como dosis inicial.',
      source: 'Goodman & Gilman, cap. 24, PDF p. 29.'
    },
    'haloperidol|levodopa': {
      title: 'Levodopa/carbidopa + haloperidol', type: 'Interacción farmacodinámica · efectos dopaminérgicos opuestos', level: 'Puede reducir la respuesta antiparkinsoniana',
      text: 'Levodopa aumenta la señal dopaminérgica para mejorar los síntomas motores; haloperidol bloquea receptores D₂. El antagonismo puede oponerse al beneficio motor de levodopa. El texto sobre Parkinson advierte que los bloqueadores dopaminérgicos pueden empeorar el parkinsonismo.',
      source: 'Katzung, cap. 28, PDF pp. 19–20; Goodman & Gilman, cap. 19, PDF pp. 3 y 5.'
    },
    'levodopa|risperidona': {
      title: 'Levodopa/carbidopa + risperidona', type: 'Interacción farmacodinámica · efectos dopaminérgicos opuestos', level: 'Puede reducir la respuesta antiparkinsoniana',
      text: 'Risperidona antagoniza receptores D₂; levodopa restaura la señal dopaminérgica central. Por mecanismo, pueden oponerse en la respuesta motora. Las lecturas describen el antagonismo dopaminérgico de antipsicóticos y advierten del empeoramiento del parkinsonismo por fármacos bloqueadores de dopamina.',
      source: 'Katzung, cap. 28, PDF pp. 19–20; Goodman & Gilman, cap. 19, PDF pp. 3 y 5.'
    }
  };
  const a = document.getElementById('interaction-drug-a');
  const b = document.getElementById('interaction-drug-b');
  const result = document.getElementById('interaction-result');
  const button = document.getElementById('interaction-check');
  if (!a || !b || !result || !button) return;

  for (const [id, name, group] of drugs) {
    for (const select of [a, b]) {
      const option = document.createElement('option'); option.value = id; option.textContent = `${name} · ${group}`; select.append(option);
    }
  }
  function show() {
    const first = a.value, second = b.value;
    if (!first || !second) {
      result.className = 'interaction-result'; result.innerHTML = '<span class="material-symbols-outlined">medication</span><p>Elige dos fármacos para consultar la combinación.</p>'; return;
    }
    if (first === second) {
      result.className = 'interaction-result interaction-neutral'; result.innerHTML = '<h3>Selecciona dos fármacos distintos</h3><p>El mismo fármaco no forma un par de interacción.</p>'; return;
    }
    const key = [first, second].sort().join('|'), item = interactions[key];
    if (!item) {
      result.className = 'interaction-result interaction-unknown';
      result.innerHTML = `<span class="material-symbols-outlined">menu_book</span><div><h3>No especificado en las lecturas</h3><p>Las lecturas consultadas para estos temas no describen esta combinación. Esto no confirma que sea segura ni que no exista interacción.</p></div>`; return;
    }
    result.className = 'interaction-result interaction-documented';
    result.innerHTML = `<div class="interaction-result-top"><span class="interaction-tag">${item.type}</span><span class="interaction-level">${item.level}</span></div><h3>${item.title}</h3><p>${item.text}</p><small>Fuente: ${item.source}</small>`;
  }
  button.addEventListener('click', show);
  [a, b].forEach(select => select.addEventListener('change', show));
})();
