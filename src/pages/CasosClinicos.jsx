import React, { useState } from 'react';
import casosData from '../data/casos.json';

export default function CasosClinicos() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const handleSelectOption = (casoId, opcionId) => {
    setSelectedAnswers((prev) => ({ ...prev, [casoId]: opcionId }));
  };

  const handleReveal = (casoId) => {
    setRevealed((prev) => ({ ...prev, [casoId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#43e2d2] font-mono">
          Evaluación &amp; Razonamiento Fisiopatológico
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#e5c587]">
          Casos Clínicos de Farmacología Médica
        </h1>
        <p className="text-xs sm:text-sm text-[#d0c5b5] mt-1 font-headline">
          Simulación de toma de decisiones terapéuticas con retroalimentación inmediata y justificación farmacodinámica.
        </p>
      </div>

      {/* Case Studies List */}
      <div className="space-y-6">
        {casosData.map((caso, index) => {
          const currentSelection = selectedAnswers[caso.id];
          const isRevealed = revealed[caso.id];

          return (
            <div
              key={caso.id}
              className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 space-y-5"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#4d463a]/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#202a3d] border border-[#e5c587]/40 text-[#e5c587] font-mono text-xs font-bold flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#e5c587]">
                    {caso.titulo}
                  </h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#111c2e] text-[#43e2d2] border border-[#43e2d2]/30 font-semibold">
                  {caso.bloque}
                </span>
              </div>

              {/* Clinical Vignette */}
              <div className="p-4 rounded-xl bg-[#081325] border border-[#4d463a]/30 text-xs sm:text-sm text-[#d0c5b5] leading-relaxed">
                <strong className="text-[#e5c587] block mb-1">Historia Clínica:</strong>
                {caso.historiaClinica}
              </div>

              {/* Question */}
              <p className="text-sm font-bold text-[#d8e2fc]">
                {caso.pregunta}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {caso.opciones.map((opcion) => {
                  const isSelected = currentSelection === opcion.id;
                  let optionStyle = 'bg-[#111c2e] border-[#4d463a]/40 text-[#d0c5b5] hover:border-[#43e2d2]';

                  if (isRevealed) {
                    if (opcion.esCorrecta) {
                      optionStyle = 'bg-[#00c6b7]/15 border-[#43e2d2] text-[#43e2d2] font-semibold';
                    } else if (isSelected && !opcion.esCorrecta) {
                      optionStyle = 'bg-[#93000a]/20 border-[#ffb4ab] text-[#ffdad6]';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[#202a3d] border-[#e5c587] text-[#e5c587] font-semibold';
                  }

                  return (
                    <div
                      key={opcion.id}
                      onClick={() => !isRevealed && handleSelectOption(caso.id, opcion.id)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="font-mono font-bold shrink-0">{opcion.id})</span>
                      <div className="flex-1 space-y-1">
                        <span>{opcion.texto}</span>
                        {isRevealed && (
                          <p className="text-[11px] text-[#d0c5b5] pt-1">
                            {opcion.justificacion}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#4d463a]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#d0c5b5]/60 text-[11px]">
                  Fuente: {caso.referencia}
                </span>

                {!isRevealed ? (
                  <button
                    disabled={!currentSelection}
                    onClick={() => handleReveal(caso.id)}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-[#e5c587] to-[#c8aa6e] disabled:opacity-40 text-[#040e20] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(200,170,110,0.25)]"
                  >
                    Verificar Respuesta
                  </button>
                ) : (
                  <span className="text-[#43e2d2] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Caso revisado
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
