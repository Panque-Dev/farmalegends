import React, { useState } from 'react';
import FichaFarmaco from '../components/FichaFarmaco';
import farmacosData from '../data/farmacos.json';
import interaccionesData from '../data/interacciones.json';
import quizData from '../data/quiz.json';
import flashcardsData from '../data/flashcards.json';

const tabs = [
  { id: 'guia', label: 'Guía de repaso', icon: 'menu_book' },
  { id: 'farmacos', label: 'Compendio de fármacos', icon: 'medication' },
  { id: 'interacciones', label: 'Interacciones', icon: 'sync_alt' },
  { id: 'estudio', label: 'Estudio activo', icon: 'psychology' }
];

export default function Depresion() {
  const [activeTab, setActiveTab] = useState('guia');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const farmacos = farmacosData.filter((f) => f.categoria === 'depresion');
  const nombres = farmacos.map((f) => f.nombre.toLowerCase());
  const interacciones = interaccionesData.filter((item) =>
    nombres.some((nombre) => item.farmacoA.toLowerCase().includes(nombre) || item.farmacoB.toLowerCase().includes(nombre))
  );
  const preguntas = quizData.filter((item) => item.tema === 'Depresión');
  const tarjetas = flashcardsData.filter((item) => item.modulo === 'Depresión');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-[#111c2e] via-[#081325] to-[#152032] border border-[#c8aa6e]/40 p-6 sm:p-8 space-y-3 shadow-[0_4px_30px_rgba(4,14,32,0.8)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2] font-mono">Bloque 2 • Neurofarmacología</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#c8aa6e]/15 text-[#e5c587] font-bold border border-[#c8aa6e]/30">Semana 13 FacMed</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#e5c587] tracking-tight">Farmacoterapia de la depresión</h1>
        <p className="text-xs sm:text-sm text-[#d0c5b5] max-w-4xl font-headline leading-relaxed">
          Tres blancos del programa: fluoxetina sobre SERT, venlafaxina sobre SERT/NET y mirtazapina sobre receptores α₂ y 5-HT. Repasa mecanismo, cinética, seguridad e interacciones desde las lecturas.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {farmacos.map((f) => <span key={f.id} className="px-3 py-1 rounded-full bg-[#040e20]/70 border border-[#43e2d2]/25 text-[11px] text-[#d8e2fc]">{f.nombre}</span>)}
        </div>
      </section>

      <nav aria-label="Secciones de depresión" className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#4d463a]/30">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-pressed={activeTab === tab.id}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${activeTab === tab.id ? 'bg-[#e5c587] text-[#081325] shadow-[0_0_15px_rgba(200,170,110,0.25)]' : 'bg-[#152032] text-[#d0c5b5] border border-[#4d463a]/40 hover:text-[#43e2d2]'}`}>
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>{tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'guia' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6">
            <article className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-5 sm:p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2]">Fisiopatología y respuesta</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#e5c587] mt-1">La monoamina explica blancos, no toda la enfermedad</h2>
              </div>
              <p className="text-sm text-[#d0c5b5] leading-relaxed">
                La depresión es heterogénea. SERT y NET son blancos farmacológicos útiles, pero las lecturas advierten que un cambio rápido en monoaminas no explica por sí solo la enfermedad ni el retraso de varias semanas hasta la respuesta máxima. También se proponen adaptaciones de señalización y mecanismos neurotróficos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#081325] border border-[#43e2d2]/30 p-3"><strong className="text-[#43e2d2] block text-sm">Fluoxetina</strong><span className="text-xs text-[#d0c5b5]">Inhibe SERT de forma selectiva.</span></div>
                <div className="rounded-xl bg-[#081325] border border-[#c8aa6e]/35 p-3"><strong className="text-[#e5c587] block text-sm">Venlafaxina</strong><span className="text-xs text-[#d0c5b5]">Inhibe SERT y NET; vigilar presión arterial.</span></div>
                <div className="rounded-xl bg-[#081325] border border-[#43e2d2]/30 p-3"><strong className="text-[#43e2d2] block text-sm">Mirtazapina</strong><span className="text-xs text-[#d0c5b5]">Antagoniza α₂ y receptores 5-HT; H₁ contribuye a sedación.</span></div>
              </div>
              <p className="text-[11px] text-[#d0c5b5]/70">Fuentes: Goodman &amp; Gilman, 14.ª ed., cap. 18, PDF pp. 2–4; Katzung, 16.ª ed., cap. 30, PDF p. 8.</p>
            </article>

            <article className="rounded-2xl bg-[#152032] border border-[#c8aa6e]/35 p-5 sm:p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2]">Comparativa farmacocinética</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#e5c587] mt-1">Diferencias que cambian el uso</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[440px] text-left text-xs">
                  <thead><tr className="text-[#43e2d2] border-b border-[#4d463a]/50"><th className="py-2 pr-3">Fármaco</th><th className="py-2 pr-3">Semivida / metabolismo</th><th className="py-2">Punto de seguridad</th></tr></thead>
                  <tbody className="text-[#d0c5b5]">
                    <tr className="border-b border-[#4d463a]/25"><td className="py-2 pr-3 font-semibold text-[#e5c587]">Fluoxetina</td><td className="py-2 pr-3">48–72 h; norfluoxetina activa prolongada; inhibe CYP2D6</td><td className="py-2">Interacciones pueden persistir al suspenderla</td></tr>
                    <tr className="border-b border-[#4d463a]/25"><td className="py-2 pr-3 font-semibold text-[#e5c587]">Venlafaxina</td><td className="py-2 pr-3">8–11 h; metabolito activo; CYP2D6</td><td className="py-2">Presión arterial y síntomas de discontinuación</td></tr>
                    <tr><td className="py-2 pr-3 font-semibold text-[#e5c587]">Mirtazapina</td><td className="py-2 pr-3">20–40 h; CYP2D6/3A4/1A2</td><td className="py-2">Sedación y aumento del apetito/peso</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[#d0c5b5]/70">Rangos y datos de los cuadros de farmacocinética de las lecturas; revisar la ficha para el contexto completo.</p>
            </article>
          </div>

          <article className="rounded-2xl bg-[#152032] border border-[#c8aa6e]/35 p-5 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-[#e5c587]">Embarazo y lactancia: Consenso Clínico y Normativa PLLR</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#43e2d2]/15 text-[#43e2d2] font-semibold border border-[#43e2d2]/30">Micromedex &amp; Guías ACOG</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#081325] border border-[#ffb4ab]/30 space-y-1.5">
                <strong className="text-[#ffb4ab] block font-bold">Fluoxetina (ISRS)</strong>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">
                  <strong>Embarazo:</strong> <em>Fetal harm has been demonstrated</em> (Micromedex). Atraviesa placenta; en 3.er trimestre asocia síndrome de adaptación neonatal deficiente y HPPRN. Mantener a menor dosis si ya estaba estable (ACOG).
                </p>
                <p className="text-[#ffdad6] text-[11px] leading-relaxed">
                  <strong>Lactancia:</strong> <em>Infant risk cannot be ruled out</em>. RID elevado de hasta <strong>14.6%</strong> (&gt;10%). De inicio se prefieren sertralina o paroxetina.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#081325] border border-[#c8aa6e]/35 space-y-1.5">
                <strong className="text-[#e5c587] block font-bold">Venlafaxina (IRSN)</strong>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">
                  <strong>Embarazo:</strong> <em>May cause fetal harm</em> (Micromedex). Atraviesa placenta; abstinencia neonatal severa y distrés en 3.er trimestre tardío. Fármaco de 2.ª línea tras ISRS (ACOG).
                </p>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">
                  <strong>Lactancia:</strong> <em>Infant risk cannot be ruled out</em>. Paso relevante a leche (ratio 1.8–3.2) con RID de <strong>6.4% a 8.8%</strong>; vigilar sedación y succión.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#081325] border border-[#43e2d2]/30 space-y-1.5">
                <strong className="text-[#43e2d2] block font-bold">Mirtazapina (NaSSA)</strong>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">
                  <strong>Embarazo:</strong> <em>May cause fetal harm</em> (Micromedex). Sin asociación concluyente con teratogenia mayor. Alternativa de 2.ª línea si fallan ISRS.
                </p>
                <p className="text-[#43e2d2] text-[11px] leading-relaxed">
                  <strong>Lactancia:</strong> <em>Compatible / Low infant risk</em>. Excelente perfil con RID de solo <strong>0.6% a 2.8%</strong> (&lt;10%) y niveles indetectables en lactante.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-[#d0c5b5]/70 pt-1">
              Las categorías históricas de letras FDA (A, B, C, D, X) están obsoletas desde 2015. El etiquetado oficial se rige por la regla narrativa <strong>PLLR (Pregnancy and Lactation Labeling Rule)</strong> de la FDA, evaluando el balance riesgo-beneficio materno-fetal individualizado.
            </p>
          </article>
        </section>
      )}

      {activeTab === 'farmacos' && (
        <section className="space-y-4">
          <div><span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2]">Compendio • Semana 13</span><h2 className="font-display text-2xl font-bold text-[#e5c587]">Fichas farmacológicas ({farmacos.length})</h2><p className="text-xs text-[#d0c5b5] mt-1">Cada tarjeta muestra mecanismo, dosis de referencia, seguridad, embarazo/lactancia y páginas de respaldo.</p></div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">{farmacos.map((farmaco) => <FichaFarmaco key={farmaco.id} farmaco={farmaco} />)}</div>
        </section>
      )}

      {activeTab === 'interacciones' && (
        <section className="space-y-4">
          <div><span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2]">Seguridad farmacológica</span><h2 className="font-display text-2xl font-bold text-[#e5c587]">Interacciones a reconocer ({interacciones.length})</h2><p className="text-xs text-[#d0c5b5] mt-1">Se indican también los acompañantes externos al grupo de tres fármacos del temario.</p></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {interacciones.map((item) => (
              <article key={item.id} className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-5 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-display text-lg font-bold text-[#e5c587]">{item.farmacoA} <span className="text-[#43e2d2]">+</span> {item.farmacoB}</h3><span className="text-[10px] px-2 py-1 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30">{item.severidad}</span></div>
                <p className="text-xs text-[#d0c5b5]"><strong className="text-[#43e2d2]">Mecanismo:</strong> {item.mecanismo}</p>
                <p className="text-xs text-[#d0c5b5]"><strong className="text-[#43e2d2]">Consecuencia:</strong> {item.consecuencia}</p>
                <p className="text-xs text-[#d8e2fc]"><strong className="text-[#e5c587]">Conducta descrita:</strong> {item.conducta || item.conductaClinica}</p>
                {item.fuentes && <p className="border-t border-[#4d463a]/30 pt-2 text-[10px] text-[#d0c5b5]/70">Fuente: {item.fuentes}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'estudio' && (
        <section className="space-y-8">
          <div className="space-y-4">
            <div><span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2]">Recuperación activa</span><h2 className="font-display text-2xl font-bold text-[#e5c587]">Preguntas de repaso ({preguntas.length})</h2></div>
            {preguntas.map((item) => (
              <article key={item.id} className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-5 space-y-3">
                <h3 className="font-semibold text-sm text-[#d8e2fc]">{item.pregunta}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{item.opciones.map((opcion, index) => {
                  const selected = quizAnswers[item.id] === index;
                  const revealed = quizAnswers[item.id] !== undefined;
                  const correct = item.correcta === index;
                  return <button key={opcion} onClick={() => setQuizAnswers((prev) => ({ ...prev, [item.id]: index }))} className={`text-left p-3 rounded-xl border text-xs transition-colors ${revealed && correct ? 'bg-[#43e2d2]/15 border-[#43e2d2] text-[#d8e2fc]' : selected ? 'bg-[#93000a]/20 border-[#ffb4ab] text-[#ffdad6]' : 'bg-[#081325] border-[#4d463a]/40 text-[#d0c5b5] hover:border-[#c8aa6e]'}`}>{opcion}</button>;
                })}</div>
                {quizAnswers[item.id] !== undefined && <p className="text-xs text-[#d0c5b5]"><strong className={quizAnswers[item.id] === item.correcta ? 'text-[#43e2d2]' : 'text-[#ffb4ab]'}>{quizAnswers[item.id] === item.correcta ? 'Correcto. ' : 'Repasa. '}</strong>{item.explicacion}</p>}
              </article>
            ))}
          </div>
          <div className="space-y-4">
            <div><h2 className="font-display text-2xl font-bold text-[#e5c587]">Tarjetas de memoria ({tarjetas.length})</h2><p className="text-xs text-[#d0c5b5] mt-1">Toca una tarjeta para ver la respuesta.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{tarjetas.map((card) => <button key={card.id} onClick={() => setFlippedCards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))} className="min-h-36 text-left rounded-2xl bg-[#152032] border border-[#43e2d2]/30 p-5 hover:border-[#e5c587]/60 transition-colors"><span className="text-[10px] uppercase tracking-widest text-[#43e2d2]">{flippedCards[card.id] ? 'Respuesta' : 'Pregunta'}</span><span className="block mt-3 text-sm text-[#d8e2fc]">{flippedCards[card.id] ? card.respuesta : card.pregunta}</span></button>)}</div>
          </div>
        </section>
      )}
    </div>
  );
}
