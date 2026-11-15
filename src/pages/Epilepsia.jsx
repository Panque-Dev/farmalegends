import React, { useState } from 'react';
import Visor3D from '../components/Visor3D';
import FichaFarmaco from '../components/FichaFarmaco';
import farmacosData from '../data/farmacos.json';
import explainData from '../data/explain.json';
import casosData from '../data/casos.json';
import quizData from '../data/quiz.json';
import flashcardsData from '../data/flashcards.json';

export default function Epilepsia() {
  const [activeTab, setActiveTab] = useState('prog');
  const [selectedSchema, setSelectedSchema] = useState('pht');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  // Datos filtrados para Epilepsia (7 oficiales)
  const epiDrugs = farmacosData.filter((f) => f.patologiaId === 'epilepsia');
  const epiExplain = explainData.find((e) => e.id === 'epilepsia');
  const embarazoExplain = explainData.find((e) => e.id === 'teratogenia-embarazo');
  const epiCasos = casosData.filter((c) => c.bloque.includes('Epilepsia'));
  const epiQuiz = quizData.filter((q) => q.tema === 'Epilepsia');
  const epiFlashcards = flashcardsData.filter((f) => f.modulo === 'Epilepsia');

  // Blancos moleculares para el esquema sináptico
  const schemaTargets = {
    pht: {
      name: "Fenitoína",
      clase: "Hidantoína • Bloqueador NaV",
      diana: "Canal NaV (Poro alfa)",
      badgeColor: "bg-red-500/15 text-[#ffb4ab] border-[#ffb4ab]/40",
      mecanismo: "Bloqueador selectivo de canales NaV en conformación inactivada rápida con cinética dependiente de uso y voltaje. Retrasa la reactivación del canal suprimiendo descargas de alta frecuencia.",
      indicaciones: "Crisis focales y tónico-clónicas; ineficaz en ausencias.",
      riesgoEmbarazo: "Riesgo alto: Síndrome fetal por hidantoína (dismorfismo, hipoplasia ungueal)."
    },
    cbz: {
      name: "Carbamazepina",
      clase: "Iminoestilbeno • Bloqueador NaV",
      diana: "Poro del Canal NaV en conformación inactivada rápida",
      badgeColor: "bg-red-500/15 text-[#ffb4ab] border-[#ffb4ab]/40",
      mecanismo: "Se une con alta afinidad al canal NaV inactivado prolongando el periodo refractario. Su metabolito 10,11-epóxido retiene actividad anticonvulsiva.",
      indicaciones: "1.ª línea en crisis focales. Puede agravar crisis de ausencia y mioclónicas.",
      riesgoEmbarazo: "Defectos del tubo neural (espina bífida ~1%). Autoinductor potente de CYP3A4."
    },
    lev: {
      name: "Levetiracetam",
      clase: "Pirrolidina • Modulador Vesicular",
      diana: "SV2A Vesicular Presináptica",
      badgeColor: "bg-purple-500/15 text-[#d8e2fc] border-purple-400/40",
      mecanismo: "Ligando estereoespecífico de la proteína vesicular SV2A, coordinando la exocitosis de neurotransmisores y disminuyendo la liberación de glutamato.",
      indicaciones: "Crisis focales, tónico-clónicas generalizadas y mioclónicas. Fase 2 de estado epiléptico.",
      riesgoEmbarazo: "Menor riesgo relativo: perfil gestacional de mayor seguridad (~2-3% tasa basal)."
    },
    esm: {
      name: "Etosuximida",
      clase: "Succinimida • Bloqueador CaV-T",
      diana: "Canal CaV Tipo T Talámico (CaV3.1, CaV3.2)",
      badgeColor: "bg-indigo-500/15 text-[#43e2d2] border-[#43e2d2]/40",
      mecanismo: "Inhibidor selectivo de las corrientes de calcio de bajo umbral (tipo T) en las neuronas del tálamo, aboliendo el ritmo marcapasos de espiga-onda a 3 Hz.",
      indicaciones: "1.ª elección exclusiva en crisis generalizadas de ausencia típicas infantiles.",
      riesgoEmbarazo: "Precaución: menor teratogenicidad que valproato, pero evaluar riesgo/beneficio."
    },
    dzp: {
      name: "Diazepam",
      clase: "Benzodiazepina • Modulador Alostérico GABA-A",
      diana: "Receptor GABA-A (Sitio BZD interfaz alfa/gamma)",
      badgeColor: "bg-emerald-500/15 text-[#43e2d2] border-[#43e2d2]/40",
      mecanismo: "Aumenta la frecuencia de apertura del canal de cloruro acoplado a GABA-A produciendo hiperpolarización inmediata.",
      indicaciones: "Fase 1 del estado epiléptico convulsivo activo (minutos 5 a 20) y crisis prolongadas.",
      riesgoEmbarazo: "Uso en emergencia justificado; en 3.er trimestre riesgo de hipotonía neonatal."
    },
    lam: {
      name: "Lamotrigina",
      clase: "Feniltriazina • Bloqueador NaV y Glutamato",
      diana: "Canales NaV y Canales CaV presinápticos",
      badgeColor: "bg-violet-500/15 text-[#e5c587] border-[#c8aa6e]/40",
      mecanismo: "Bloqueador de canales NaV dependiente de uso que suprime la liberación presináptica cortical de aspartato y glutamato.",
      indicaciones: "Amplio espectro: crisis focales, tónico-clónicas primarias y trastorno bipolar I.",
      riesgoEmbarazo: "Menor riesgo relativo (~2-3%). Requiere ajuste por aumento gestacional del aclaramiento."
    },
    vpa: {
      name: "Ácido Valproico (Divalproex)",
      clase: "Ácido Carboxílico • Multidiana",
      diana: "Canales NaV, CaV tipo T y GABA Transaminasa (GABA-T)",
      badgeColor: "bg-teal-500/15 text-[#ffdad6] border-[#ffb4ab]/40",
      mecanismo: "Acción pleiotrópica: bloquea canales NaV y CaV-T e incrementa el tono GABAérgico inhibiendo su enzima de degradación GABA-T.",
      indicaciones: "Fármaco de amplísimo espectro en crisis generalizadas idiopáticas (tónico-clónicas, ausencias, mioclónicas).",
      riesgoEmbarazo: "CONTRAINDICACIÓN ABSOLUTA: 10-11% malformaciones mayores, espina bífida y caída de 8-10 pts de CI."
    }
  };

  const currentSchema = schemaTargets[selectedSchema];

  // Manejo de quiz
  const handleAnswerQuiz = (qId, optionIdx, correcta) => {
    if (quizAnswers[qId] === undefined) {
      if (optionIdx === correcta) {
        setQuizScore((prev) => prev + 1);
      }
    }
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'prog', label: '✦ Programa & Objetivos' },
    { id: 'bio', label: '🧬 Fisiopatología & Biofísica' },
    { id: 'esquema', label: '⚖ Esquema Sináptico 3D' },
    { id: 'farmacos', label: `⚗ Compendio (${epiDrugs.length})` },
    { id: 'embarazo', label: '🤰 Embarazo & Lactancia' },
    { id: 'casos', label: '📋 Casos Clínicos' },
    { id: 'quiz', label: '⌘ Examen Departamental' },
    { id: 'flashcards', label: '▣ Tarjetas Flash' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Encabezado Principal Arcane */}
      <div className="rounded-3xl bg-gradient-to-r from-[#111c2e] via-[#081325] to-[#152032] border border-[#c8aa6e]/40 p-6 sm:p-8 space-y-3 shadow-[0_4px_30px_rgba(4,14,32,0.8)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2] font-mono">
            Bloque 2 • Excitabilidad &amp; Canales Iónicos
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#c8aa6e]/15 text-[#e5c587] font-bold border border-[#c8aa6e]/30">
            Semana 11 FacMed
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#e5c587] tracking-tight">
          Farmacoterapia de la Epilepsia &amp; Canales Iónicos
        </h1>
        <p className="text-xs sm:text-sm text-[#d0c5b5] max-w-4xl font-headline leading-relaxed">
          Bases biofísicas de las crisis epilépticas, modulación de canales NaV y CaV tipo T, diana vesicular SV2A, farmacogenómica y teratogénesis comparada.
        </p>
      </div>

      {/* Navegación de Pestañas */}
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

      {/* 1. PESTAÑA: PROGRAMA & OBJETIVOS */}
      {activeTab === 'prog' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#43e2d2] font-mono block">
                UBICACIÓN CURRICULAR OFICIAL
              </span>
              <h3 className="font-display text-xl font-bold text-[#e5c587]">
                Semana 11 • Farmacología Médica
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                Contenido alineado al programa oficial de la Facultad de Medicina (p. 25). Fuentes bibliográficas primarias: Goodman &amp; Gilman 14.ª ed., cap. 20 (Farmacoterapia de las epilepsias) y Katzung 16.ª ed., cap. 24 (Fármacos anticonvulsivos).
              </p>
              <div className="pt-2 text-xs text-[#43e2d2] font-mono">
                7 Fármacos Oficiales: Fenitoína, Carbamazepina, Levetiracetam, Etosuximida, Diazepam, Lamotrigina y Ácido Valproico.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152032] border border-[#c8aa6e]/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#e5c587] font-mono block">
                OBJETIVOS DE APRENDIZAJE DEPARTAMENTAL
              </span>
              <ul className="space-y-2 text-xs text-[#d0c5b5]">
                <li className="flex items-start gap-2">
                  <span className="text-[#43e2d2] font-bold">1.</span>
                  Correlacionar las dianas moleculares (canales NaV, CaV-T, SV2A y GABA-A) con el tipo específico de crisis epiléptica.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#43e2d2] font-bold">2.</span>
                  Explicar la cinética no lineal de Michaelis-Menten de la fenitoína y la autoinducción de la carbamazepina.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#43e2d2] font-bold">3.</span>
                  Ejecutar el protocolo de emergencia escalonado para el Estado Epiléptico Convulsivo activo.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#43e2d2] font-bold">4.</span>
                  Identificar las interacciones críticas de UGT (Valproato-Lamotrigina) y el riesgo teratogénico comparado en el embarazo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. PESTAÑA: FISIOPATOLOGÍA & BIOFÍSICA */}
      {activeTab === 'bio' && epiExplain && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#152032] border border-[#c8aa6e]/40 space-y-4">
            <h3 className="font-display text-xl font-bold text-[#e5c587]">
              {epiExplain.titulo}
            </h3>
            <p className="text-xs text-[#d0c5b5] leading-relaxed">
              {epiExplain.etiopatogenia.lesionCentral}
            </p>
            <div className="p-4 rounded-xl bg-[#081325] border border-[#4d463a]/40 text-xs space-y-2">
              <strong className="text-[#43e2d2] block font-mono">El Cambio Despolarizante Paroxístico (PDS):</strong>
              <p className="text-[#d8e2fc]">{epiExplain.etiopatogenia.cambioDespolarizanteParoxistico}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#081325] border border-[#4d463a]/40 text-xs space-y-2">
              <strong className="text-[#e5c587] block font-mono">El Circuito Tálamo-Cortical a 3 Hz en Crisis de Ausencia:</strong>
              <p className="text-[#d8e2fc]">{epiExplain.etiopatogenia.circuitoTalamicoAusencias}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {epiExplain.racionalTerapeutico.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#040e20] border border-[#4d463a]/30 text-xs space-y-1.5">
                <span className="font-display font-bold text-[#e5c587] block">{r.objetivo}</span>
                <p className="text-[#d0c5b5]">{r.explicacion}</p>
                <span className="text-[10px] text-[#43e2d2] font-mono block">Fármacos: {r.farmacos.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PESTAÑA: ESQUEMA SINÁPTICO 3D */}
      {activeTab === 'esquema' && (
        <div className="space-y-6">
          <Visor3D defaultCategory="epilepsia" />
        </div>
      )}

      {/* 4. PESTAÑA: COMPENDIO MONOGRÁFICO DE LOS 7 FÁRMACOS */}
      {activeTab === 'farmacos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {epiDrugs.map((farmaco) => (
            <FichaFarmaco key={farmaco.id} farmaco={farmaco} />
          ))}
        </div>
      )}

      {/* 5. PESTAÑA: EMBARAZO & LACTANCIA */}
      {activeTab === 'embarazo' && (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#152032] border border-[#c8aa6e]/40 space-y-4">
            <h3 className="font-display text-xl font-bold text-[#e5c587]">
              Semáforo Didáctico de Riesgo Gestacional en Epilepsia
            </h3>
            <p className="text-xs text-[#d0c5b5] leading-relaxed">
              La selección farmacológica en mujeres con potencial de procrear debe equilibrar el control estricto de las crisis (el estado epiléptico materno tiene una mortalidad fetal de hasta 50%) con el riesgo malformativo congénito.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Riesgo Alto */}
              <div className="p-4 rounded-xl bg-[#93000a]/20 border border-[#ffb4ab]/40 space-y-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-bold text-[10px] uppercase font-mono">
                  Riesgo Alto • Contraindicado
                </span>
                <h4 className="font-bold text-[#ffb4ab] text-sm">Ácido Valproico</h4>
                <p className="text-[#d0c5b5]">
                  Tasa de malformaciones mayores de 10-11% (espina bífida 1-2%, cardiopatías). Reducción demostrada de 8-10 puntos en el coeficiente intelectual (CI) con autismo.
                </p>
              </div>

              {/* Riesgo Moderado */}
              <div className="p-4 rounded-xl bg-[#c8aa6e]/15 border border-[#c8aa6e]/40 space-y-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-[#c8aa6e] text-[#040e20] font-bold text-[10px] uppercase font-mono">
                  Riesgo Moderado • Precaución
                </span>
                <h4 className="font-bold text-[#e5c587] text-sm">Fenitoína &amp; Carbamazepina</h4>
                <p className="text-[#d0c5b5]">
                  Riesgo malformativo del 4-6%. Síndrome fetal por hidantoína (dismorfismo facial) y defectos del tubo neural con carbamazepina (1%).
                </p>
              </div>

              {/* Menor Riesgo Relativo */}
              <div className="p-4 rounded-xl bg-[#00c6b7]/15 border border-[#43e2d2]/40 space-y-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-[#00c6b7] text-[#040e20] font-bold text-[10px] uppercase font-mono">
                  Menor Riesgo Relativo • Preferidos
                </span>
                <h4 className="font-bold text-[#43e2d2] text-sm">Lamotrigina &amp; Levetiracetam</h4>
                <p className="text-[#d0c5b5]">
                  Tasa basal de malformaciones comparable a la población general (~2-3%). Monitorear niveles de lamotrigina que caen por inducción de UGT gestacional.
                </p>
              </div>

            </div>

            {/* Recomendación de Folato */}
            <div className="p-4 rounded-xl bg-[#040e20] border border-[#4d463a]/40 text-xs text-[#d8e2fc] space-y-1">
              <strong className="text-[#e5c587] block font-mono">Protocolo de Suplementación con Ácido Fólico:</strong>
              <p>Toda mujer con epilepsia en edad fértil debe recibir <strong>4 a 5 mg/día de ácido fólico</strong> (diez veces la dosis preconcepcional habitual) al menos 3 meses antes de la concepción y durante el primer trimestre para reducir el riesgo de defectos del tubo neural.</p>
            </div>

          </div>

        </div>
      )}

      {/* 6. PESTAÑA: TALLER DE CASOS CLÍNICOS GUIADOS */}
      {activeTab === 'casos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {epiCasos.map((caso, idx) => (
              <div key={caso.id} className="p-6 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#4d463a]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#202a3d] text-[#e5c587] font-bold text-xs flex items-center justify-center font-mono">0{idx + 1}</span>
                    <h4 className="font-display text-base font-bold text-[#e5c587]">{caso.titulo}</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#43e2d2]/15 text-[#43e2d2] font-bold font-mono">{caso.bloque}</span>
                </div>
                <p className="text-xs text-[#d0c5b5] leading-relaxed">{caso.historiaClinica}</p>
                <p className="text-xs font-bold text-white pt-1">{caso.pregunta}</p>
                <div className="space-y-2">
                  {caso.opciones.map((opc) => (
                    <div key={opc.id} className={`p-3 rounded-xl text-xs border ${opc.esCorrecta ? 'bg-[#43e2d2]/10 border-[#43e2d2] text-[#43e2d2]' : 'bg-[#081325] border-[#4d463a]/30 text-[#d0c5b5]'}`}>
                      <span className="font-bold mr-1.5">{opc.id})</span> {opc.texto}
                      {opc.esCorrecta && <p className="text-[11px] text-[#d8e2fc] mt-1.5 pt-1 border-t border-[#43e2d2]/30"><strong>Justificación Clínica:</strong> {opc.justificacion}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PESTAÑA: SIMULADOR DE EXAMEN DEPARTAMENTAL */}
      {activeTab === 'quiz' && (
        <div className="p-6 rounded-2xl bg-[#040e20] border border-[#c8aa6e]/40 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#4d463a]/30">
            <h3 className="font-display text-xl font-bold text-[#e5c587]">
              Reactivos Departamentales de Epilepsia
            </h3>
            <span className="text-xs text-[#43e2d2] font-mono font-bold">
              Puntuación: {quizScore} / {epiQuiz.length}
            </span>
          </div>

          <div className="space-y-5">
            {epiQuiz.map((item) => {
              const isSelected = quizAnswers[item.id] !== undefined;
              const isCorrect = quizAnswers[item.id] === item.correcta;

              return (
                <div key={item.id} className="p-4 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-[#d8e2fc]">{item.pregunta}</p>
                  <div className="space-y-1.5">
                    {item.opciones.map((opc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(item.id, idx, item.correcta)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2 ${
                          quizAnswers[item.id] === idx
                            ? idx === item.correcta
                              ? 'bg-[#00c6b7]/20 border-[#43e2d2] text-[#43e2d2] font-semibold border'
                              : 'bg-[#93000a]/20 border-[#ffb4ab] text-[#ffdad6] border'
                            : 'bg-[#081325] text-[#d0c5b5] hover:border-[#43e2d2] border border-[#4d463a]/30'
                        }`}
                      >
                        <span className="font-mono font-bold">{String.fromCharCode(65 + idx)})</span>
                        <span>{opc}</span>
                      </button>
                    ))}
                  </div>

                  {isSelected && (
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
      )}

      {/* 8. PESTAÑA: FLASHCARDS VOLTEABLES */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-[#e5c587]">
            10 Tarjetas de Memoria Clave en Epilepsia
          </h3>
          <p className="text-xs text-[#d0c5b5]">Haz clic para voltear la tarjeta y repasar la respuesta biofísica y clínica.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {epiFlashcards.map((card) => {
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
                      {isFlipped ? 'RESPUESTA CLÍNICA' : 'CONCEPTO CLAVE'}
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
      )}

    </div>
  );
}
