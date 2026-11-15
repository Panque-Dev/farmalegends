import React, { useState } from 'react';
import Visor3D from '../components/Visor3D';
import FichaFarmaco from '../components/FichaFarmaco';
import farmacosData from '../data/farmacos.json';
import explainData from '../data/explain.json';
import casosData from '../data/casos.json';
import quizData from '../data/quiz.json';
import flashcardsData from '../data/flashcards.json';

export default function Dopamina() {
  const [activeTab, setActiveTab] = useState('repaso');
  
  // Estados para reactivos de examen
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});

  // Estados para tarjetas de memoria
  const [flippedCards, setFlippedCards] = useState({});

  // Estados para actividad interactiva de clasificación
  const [clasificacion, setClasificacion] = useState({
    pool: ['Levodopa-carbidopa', 'Haloperidol', 'Pramipexol', 'Risperidona', 'Entacapona', 'Clozapina', 'Rasagilina'],
    parkinson: [],
    esquizofrenia: []
  });
  const [feedbackActividad, setFeedbackActividad] = useState('');

  // Filtrar fármacos de Dopamina (7 oficiales)
  const dopaDrugs = farmacosData.filter(
    (f) => f.patologiaId === 'parkinson' || f.patologiaId === 'esquizofrenia'
  );

  const parkinsonExplain = explainData.find((e) => e.id === 'parkinson');
  const esquizofreniaExplain = explainData.find((e) => e.id === 'esquizofrenia');
  const dopaCasos = casosData.filter((c) => c.bloque.includes('Dopamina'));
  const dopaQuiz = quizData.filter((q) => q.tema === 'Dopamina');
  const dopaFlashcards = flashcardsData.filter((f) => f.modulo === 'Dopamina');

  // Manejo de examen interactivo
  const handleSelectQuiz = (qId, optionIdx) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setQuizRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  // Voltear tarjeta
  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mover chip en actividad de clasificación
  const moverChip = (fName, desde, hacia) => {
    setClasificacion((prev) => ({
      ...prev,
      [desde]: prev[desde].filter((item) => item !== fName),
      [hacia]: [...prev[hacia], fName]
    }));
    setFeedbackActividad('');
  };

  const verificarClasificacion = () => {
    const parkinsonCorrectos = ['Levodopa-carbidopa', 'Pramipexol', 'Entacapona', 'Rasagilina'];
    const esquizofreniaCorrectos = ['Haloperidol', 'Risperidona', 'Clozapina'];

    const esParkinsonValido =
      clasificacion.parkinson.length === parkinsonCorrectos.length &&
      clasificacion.parkinson.every((d) => parkinsonCorrectos.includes(d));

    const esEsquizoValido =
      clasificacion.esquizofrenia.length === esquizofreniaCorrectos.length &&
      clasificacion.esquizofrenia.every((d) => esquizofreniaCorrectos.includes(d));

    if (clasificacion.pool.length > 0) {
      setFeedbackActividad('Aún quedan fármacos pendientes de clasificar en la bandeja.');
    } else if (esParkinsonValido && esEsquizoValido) {
      setFeedbackActividad('¡Excelente! Clasificación 100% correcta según el programa oficial.');
    } else {
      setFeedbackActividad('Hay elementos mal posicionados. Revisa los agonistas vs antagonistas.');
    }
  };

  const tabs = [
    { id: 'repaso', label: '✦ Guía de Repaso', icon: 'menu_book' },
    { id: 'interacciones', label: '⚖ Interacción 3D', icon: 'view_in_ar' },
    { id: 'comparativa', label: '⟷ Comparativa', icon: 'table_chart' },
    { id: 'compendio', label: `⚗ Compendio (${dopaDrugs.length})`, icon: 'medication' },
    { id: 'seguridad', label: '⚠ Seguridad', icon: 'health_and_safety' },
    { id: 'casos', label: '⌘ Casos & Examen', icon: 'quiz' },
    { id: 'estudio', label: '▣ Estudio Activo', icon: 'psychology' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Encabezado Principal Arcane */}
      <div className="rounded-3xl bg-gradient-to-r from-[#111c2e] via-[#081325] to-[#152032] border border-[#c8aa6e]/40 p-6 sm:p-8 space-y-3 shadow-[0_4px_30px_rgba(4,14,32,0.8)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2] font-mono">
            Bloque 2 • Neurofarmacología
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#c8aa6e]/15 text-[#e5c587] font-bold border border-[#c8aa6e]/30">
            Semana 12 FacMed
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#e5c587] tracking-tight">
          Moduladores de la Neurotransmisión Dopaminérgica
        </h1>
        <p className="text-xs sm:text-sm text-[#d0c5b5] max-w-4xl font-headline leading-relaxed">
          Enfermedad de Parkinson y Esquizofrenia: correlación de vías nigroestriatal y mesolímbica, blancos moleculares, eficacia, seguridad e interacciones.
        </p>
      </div>

      {/* Barra de Navegación de Pestañas */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#4d463a]/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#152032] text-[#e5c587] border border-[#c8aa6e] shadow-[0_0_15px_rgba(200,170,110,0.25)]'
                : 'text-[#d0c5b5] hover:text-[#43e2d2] hover:bg-[#152032]/40 border border-transparent'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. PESTAÑA: GUÍA DE REPASO */}
      {activeTab === 'repaso' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Parkinson Card */}
            <div className="p-6 rounded-2xl bg-[#152032] border border-[#00a86b]/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c6b7] font-mono block">
                PARKINSON • RESTAURAR SEÑAL DOPAMINÉRGICA
              </span>
              <h3 className="font-display text-xl font-bold text-[#e5c587]">
                Agonismo, Precursores e Inhibición de Degradación
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                La pérdida de neuronas dopaminérgicas nigroestriatales reduce la señal en el circuito motor de los ganglios basales. Levodopa aporta precursor central; pramipexol estimula directamente receptores D2/D3; entacapona y rasagilina prolongan la disponibilidad sináptica.
              </p>
              <div className="p-3 rounded-lg bg-[#081325] border border-[#4d463a]/30 text-xs font-mono text-[#d8e2fc]">
                Sustancia negra pars compacta ➔ Estriado ➔ Tálamo motor ➔ Corteza
              </div>
            </div>

            {/* Esquizofrenia Card */}
            <div className="p-6 rounded-2xl bg-[#152032] border border-[#ff8c93]/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4ab] font-mono block">
                ESQUIZOFRENIA • DISMINUIR SEÑAL DOPAMINÉRGICA
              </span>
              <h3 className="font-display text-xl font-bold text-[#e5c587]">
                Antagonismo D2 ± Antagonismo 5-HT2A
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                La actividad dopaminérgica excesiva en la vía mesolímbica se asocia con síntomas psicóticos positivos. Haloperidol bloquea D2 potentemente; risperidona y clozapina combinan bloqueo D2 y 5-HT2A, lo que reduce el riesgo de síntomas extrapiramidales.
              </p>
              <div className="p-3 rounded-lg bg-[#081325] border border-[#4d463a]/30 text-xs font-mono text-[#d8e2fc]">
                Antagonismo D2 mesolímbico ➔ Menor despolarización ➔ Control psicótico
              </div>
            </div>

          </div>

          {/* Vías Anatómicas Detalladas */}
          <div className="p-6 rounded-2xl bg-[#040e20] border border-[#4d463a]/40 space-y-4">
            <h3 className="font-display text-lg font-bold text-[#e5c587]">
              Las 4 Vías Dopaminérgicas Centrales y su Impacto Clínico
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-1">
                <strong className="text-[#43e2d2] block font-mono">1. Vía Nigroestriatal</strong>
                <p className="text-[#d0c5b5]">Control motor somático. Degenera en Parkinson; su bloqueo excesivo por antipsicóticos provoca parkinsonismo y distonías.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-1">
                <strong className="text-[#e5c587] block font-mono">2. Vía Mesolímbica</strong>
                <p className="text-[#d0c5b5]">VTA a Núcleo Accumbens. Regula la recompensa y delirios/alucinaciones en esquizofrenia. Diana del efecto antipsicótico.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-1">
                <strong className="text-[#43e2d2] block font-mono">3. Vía Mesocortical</strong>
                <p className="text-[#d0c5b5]">VTA a Corteza Prefrontal. Regula la cognición y el afecto; su hipofunción causa los síntomas negativos (apatía, anhedonia).</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-1">
                <strong className="text-[#ffb4ab] block font-mono">4. Vía Tuberoinfundibular</strong>
                <p className="text-[#d0c5b5]">Hipotálamo a Adenohipófisis. La dopamina inhibe la prolactina. Su bloqueo D2 desencadena galactorrea y amenorrea.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PESTAÑA: INTERACCIÓN 3D */}
      {activeTab === 'interacciones' && (
        <div className="space-y-6">
          <Visor3D defaultCategory="parkinson" />
        </div>
      )}

      {/* 3. PESTAÑA: COMPARATIVA DEL TEMARIO */}
      {activeTab === 'comparativa' && (
        <div className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 overflow-x-auto space-y-4">
          <h3 className="font-display text-xl font-bold text-[#e5c587]">
            Tabla Comparativa Oficial (Semana 12)
          </h3>
          <table className="w-full text-left text-xs text-[#d0c5b5] border-collapse">
            <thead>
              <tr className="border-b border-[#4d463a]/40 text-[#e5c587] uppercase font-mono text-[11px]">
                <th className="py-3 px-3">Fármaco</th>
                <th className="py-3 px-3">Grupo / Área</th>
                <th className="py-3 px-3">Diana Molecular</th>
                <th className="py-3 px-3">Indicación Principal</th>
                <th className="py-3 px-3">Reacciones Tipo A Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4d463a]/20">
              {dopaDrugs.map((d) => (
                <tr key={d.id} className="hover:bg-[#081325]/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-white font-display text-sm">{d.nombre}</td>
                  <td className="py-3 px-3 text-[#43e2d2]">{d.clase}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#e5c587]">{d.dianaPrincipal}</td>
                  <td className="py-3 px-3">{d.indicaciones || 'Tratamiento oficial del temario'}</td>
                  <td className="py-3 px-3 text-[#ffdad6]">{d.efectosAdversos.slice(0, 2).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. PESTAÑA: COMPENDIO MONOGRÁFICO (7 FÁRMACOS) */}
      {activeTab === 'compendio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dopaDrugs.map((farmaco) => (
            <FichaFarmaco key={farmaco.id} farmaco={farmaco} />
          ))}
        </div>
      )}

      {/* 5. PESTAÑA: SEGURIDAD FARMACOLÓGICA */}
      {activeTab === 'seguridad' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SNM Alert */}
            <div className="p-6 rounded-2xl bg-[#93000a]/15 border border-[#ffb4ab]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#ffb4ab]">
                <span className="material-symbols-outlined">warning</span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                  Síndrome Neuroléptico Maligno (SNM)
                </h3>
              </div>
              <p className="text-xs text-[#ffdad6] leading-relaxed">
                Evento adverso crítico potencialmente mortal asociado a bloqueo dopaminérgico agudo por antipsicóticos típicos o por retiro brusco de levodopa. Caracterizado por: <strong>hipertermia extrema (&gt;38.5 °C)</strong>, <strong>rigidez muscular en tubo de plomo</strong>, inestabilidad autonómica (taquicardia, PA lábil) y elevación masiva de creatina fosfocinasa (CPK) sérica con mioglobinuria.
              </p>
              <div className="p-3 rounded-lg bg-[#040e20] text-xs text-[#d8e2fc]">
                <strong>Conducta Inmediata:</strong> Suspender inmediatamente el antipsicótico; medidas de enfriamiento activo; agonistas dopaminérgicos (Bromocriptina) y relajante muscular (Dantroleno sódico).
              </div>
            </div>

            {/* Embarazo y Lactancia PLLR */}
            <div className="p-6 rounded-2xl bg-[#152032] border border-[#c8aa6e]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#e5c587]">
                <span className="material-symbols-outlined">pregnant_woman</span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                  Embarazo &amp; Lactancia (Regla FDA PLLR)
                </h3>
              </div>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                De acuerdo con las guías vigentes, la FDA reemplazó las antiguas letras A, B, C, D, X por resúmenes narrativos basados en evidencia. En la lactancia materna, la <strong>Clozapina está contraindicada</strong> por riesgo demostrado de neutropenia, agranulocitosis, sedación profunda y convulsiones en el lactante alimentado al seno materno.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 6. PESTAÑA: CASOS & EXAMEN (10 REACTIVOS) */}
      {activeTab === 'casos' && (
        <div className="space-y-8">
          
          {/* Casos Clínicos Guiados */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-[#e5c587]">
              Casos Clínicos de Razonamiento Guiado
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {dopaCasos.map((caso) => (
                <div key={caso.id} className="p-6 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#4d463a]/30">
                    <h4 className="font-display text-base font-bold text-[#e5c587]">{caso.titulo}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#43e2d2]/15 text-[#43e2d2] font-bold font-mono">{caso.bloque}</span>
                  </div>
                  <p className="text-xs text-[#d0c5b5] leading-relaxed">{caso.historiaClinica}</p>
                  <p className="text-xs font-bold text-white pt-2">{caso.pregunta}</p>
                  <div className="space-y-1.5 pt-1">
                    {caso.opciones.map((opc) => (
                      <div key={opc.id} className={`p-2.5 rounded-lg text-xs border ${opc.esCorrecta ? 'bg-[#43e2d2]/10 border-[#43e2d2] text-[#43e2d2]' : 'bg-[#081325] border-[#4d463a]/30 text-[#d0c5b5]'}`}>
                        <span className="font-bold mr-1.5">{opc.id})</span> {opc.texto}
                        {opc.esCorrecta && <p className="text-[11px] text-[#d8e2fc] mt-1"><strong>Justificación:</strong> {opc.justificacion}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10 Reactivos de Examen Departamental */}
          <div className="p-6 rounded-2xl bg-[#040e20] border border-[#c8aa6e]/40 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#4d463a]/30">
              <h3 className="font-display text-xl font-bold text-[#e5c587]">
                Banco de 10 Reactivos Oficiales de Examen
              </h3>
              <span className="text-xs text-[#43e2d2] font-mono font-bold">
                Semana 12 • Evaluación Departamental
              </span>
            </div>

            <div className="space-y-5">
              {dopaQuiz.map((item) => {
                const isSelected = quizAnswers[item.id] !== undefined;
                const isCorrect = quizAnswers[item.id] === item.correcta;

                return (
                  <div key={item.id} className="p-4 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-[#d8e2fc]">{item.pregunta}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.opciones.map((opc, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuiz(item.id, idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            quizAnswers[item.id] === idx
                              ? idx === item.correcta
                                ? 'bg-[#00c6b7] text-[#040e20] font-bold'
                                : 'bg-[#ff8c93] text-[#040e20] font-bold'
                              : 'bg-[#081325] text-[#d0c5b5] hover:border-[#43e2d2] border border-[#4d463a]/30'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + idx)})</span> {opc}
                        </button>
                      ))}
                    </div>

                    {quizRevealed[item.id] && (
                      <div className={`p-2.5 rounded-lg text-xs ${isCorrect ? 'bg-[#00c6b7]/15 text-[#43e2d2] border border-[#43e2d2]/30' : 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'}`}>
                        <strong>{isCorrect ? '¡Correcto!' : 'Incorrecto.'} </strong>
                        {item.explicacion}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 7. PESTAÑA: ESTUDIO ACTIVO (FLASHCARDS + CLASIFICADOR) */}
      {activeTab === 'estudio' && (
        <div className="space-y-8">
          
          {/* 10 Tarjetas de Memoria Volteables */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-[#e5c587]">
              10 Tarjetas de Memoria Clave (Flashcards)
            </h3>
            <p className="text-xs text-[#d0c5b5]">Haz clic en cualquier tarjeta para voltearla y ver la respuesta razonada.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {dopaFlashcards.map((card) => {
                const isFlipped = flippedCards[card.id];
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleFlip(card.id)}
                    className={`h-48 p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between select-none ${
                      isFlipped
                        ? 'bg-[#00c6b7]/15 border-[#43e2d2] shadow-[0_0_15px_rgba(67,226,210,0.2)]'
                        : 'bg-[#152032] border-[#4d463a]/40 hover:border-[#c8aa6e]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#e5c587] block mb-2">
                        {isFlipped ? 'RESPUESTA FARMACOLÓGICA' : 'PREGUNTA CLÍNICA'}
                      </span>
                      <p className={`text-xs leading-relaxed ${isFlipped ? 'text-[#d8e2fc] font-medium' : 'text-[#e5c587] font-bold'}`}>
                        {isFlipped ? card.respuesta : card.pregunta}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#43e2d2] text-right font-mono">
                      {isFlipped ? '↩ Volver' : '↻ Voltear'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actividad de Clasificación Interactiva */}
          <div className="p-6 rounded-2xl bg-[#152032] border border-[#c8aa6e]/40 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#4d463a]/30">
              <div>
                <h3 className="font-display text-lg font-bold text-[#e5c587]">
                  Actividad Dinámica: Clasifica el Modulador según su Diana
                </h3>
                <p className="text-xs text-[#d0c5b5] mt-0.5">
                  Haz clic en cualquier píldora para moverla entre la bandeja de pendientes y las dos columnas de destino.
                </p>
              </div>
              <button
                onClick={verificarClasificacion}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e5c587] to-[#c8aa6e] text-[#040e20] font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(200,170,110,0.3)]"
              >
                Comprobar
              </button>
            </div>

            {/* Bandeja de pendientes */}
            <div>
              <span className="text-[10px] uppercase font-bold text-[#d0c5b5]/60 block mb-2">
                Fármacos Pendientes de Clasificar:
              </span>
              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#081325] border border-[#4d463a]/30 min-h-[48px] items-center">
                {clasificacion.pool.map((drug) => (
                  <button
                    key={drug}
                    onClick={() => moverChip(drug, 'pool', 'parkinson')}
                    className="px-3 py-1 rounded-lg bg-[#202a3d] hover:bg-[#2b3548] text-[#d8e2fc] border border-[#4d463a]/40 text-xs font-semibold"
                  >
                    {drug} ➔
                  </button>
                ))}
                {clasificacion.pool.length === 0 && (
                  <span className="text-xs text-[#d0c5b5]/40 italic">Bandeja vacía. Todos los fármacos han sido distribuidos.</span>
                )}
              </div>
            </div>

            {/* Columnas de Destino */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Columna Parkinson */}
              <div className="p-4 rounded-xl bg-[#081325] border border-[#00a86b]/40 space-y-3">
                <span className="font-display font-bold text-sm text-[#00c6b7] block">
                  Parkinson (Restaurar / Prolongar Señal Dopaminérgica)
                </span>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-2 rounded-lg bg-[#111c2e]">
                  {clasificacion.parkinson.map((drug) => (
                    <button
                      key={drug}
                      onClick={() => moverChip(drug, 'parkinson', 'esquizofrenia')}
                      className="px-2.5 py-1 rounded bg-[#00c6b7]/20 border border-[#43e2d2] text-[#43e2d2] text-xs font-bold"
                    >
                      {drug} ⇄
                    </button>
                  ))}
                </div>
              </div>

              {/* Columna Esquizofrenia */}
              <div className="p-4 rounded-xl bg-[#081325] border border-[#ff8c93]/40 space-y-3">
                <span className="font-display font-bold text-sm text-[#ffb4ab] block">
                  Esquizofrenia (Antagonismo Dopaminérgico del Programa)
                </span>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-2 rounded-lg bg-[#111c2e]">
                  {clasificacion.esquizofrenia.map((drug) => (
                    <button
                      key={drug}
                      onClick={() => moverChip(drug, 'esquizofrenia', 'pool')}
                      className="px-2.5 py-1 rounded bg-[#93000a]/20 border border-[#ffb4ab] text-[#ffdad6] text-xs font-bold"
                    >
                      {drug} ↩
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {feedbackActividad && (
              <div className={`p-3 rounded-xl text-xs font-bold text-center ${feedbackActividad.includes('100%') ? 'bg-[#00c6b7]/20 text-[#43e2d2] border border-[#43e2d2]' : 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]'}`}>
                {feedbackActividad}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
