import React, { useState } from 'react';

export default function CalculadoraDosis() {
  const [edad, setEdad] = useState(65);
  const [peso, setPeso] = useState(70);
  const [creatinina, setCreatinina] = useState(1.4);
  const [sexo, setSexo] = useState('hombre');
  const [farmacoSeleccionado, setFarmacoSeleccionado] = useState('pramipexol');

  // Cockcroft-Gault Formula: ClCr = [(140 - edad) * peso] / (72 * CrSérica) (* 0.85 si mujer)
  const factorSexo = sexo === 'mujer' ? 0.85 : 1.0;
  const crCl = Math.round((((140 - edad) * peso) / (72 * creatinina)) * factorSexo);

  // Dosage adjustment logic
  const getRecomendacion = () => {
    if (farmacoSeleccionado === 'pramipexol') {
      if (crCl >= 50) return { estado: 'Normal', dosis: '0.125 mg c/8h inicial (ajuste pleno)', riesgo: 'Bajo' };
      if (crCl >= 30) return { estado: 'Ajuste Moderado', dosis: '0.125 mg c/12h (reducción 50%)', riesgo: 'Moderado' };
      if (crCl >= 15) return { estado: 'Ajuste Severo', dosis: '0.125 mg c/24h en toma única', riesgo: 'Alto' };
      return { estado: 'Contraindicado / No recomendado', dosis: 'Uso no recomendado sin hemodiálisis', riesgo: 'Crítico' };
    }
    if (farmacoSeleccionado === 'levetiracetam') {
      if (crCl >= 80) return { estado: 'Normal', dosis: '500-1500 mg c/12h', riesgo: 'Bajo' };
      if (crCl >= 50) return { estado: 'Ajuste Leve', dosis: '500-1000 mg c/12h', riesgo: 'Moderado' };
      if (crCl >= 30) return { estado: 'Ajuste Moderado', dosis: '250-750 mg c/12h', riesgo: 'Moderado' };
      return { estado: 'Ajuste Severo', dosis: '250-500 mg c/12h (+ dosis pos-diálisis)', riesgo: 'Alto' };
    }
    return { estado: 'Sin datos', dosis: '--', riesgo: '--' };
  };

  const recomendacion = getRecomendacion();

  return (
    <div className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#4d463a]/30">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#43e2d2] font-mono">
            Módulo Clínico de Prescripción Razonada
          </span>
          <h3 className="font-display text-xl font-bold text-[#e5c587]">
            Calculadora de Aclaramiento &amp; Ajuste Renal
          </h3>
        </div>
        <span className="material-symbols-outlined text-[#e5c587] text-[28px]">
          calculate
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#d0c5b5] block mb-1">
                Edad (años)
              </label>
              <input
                type="number"
                value={edad}
                onChange={(e) => setEdad(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#081325] border border-[#4d463a]/40 text-[#d8e2fc] text-sm focus:border-[#43e2d2] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#d0c5b5] block mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#081325] border border-[#4d463a]/40 text-[#d8e2fc] text-sm focus:border-[#43e2d2] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#d0c5b5] block mb-1">
                Creatinina Sérica (mg/dL)
              </label>
              <input
                type="number"
                step="0.1"
                value={creatinina}
                onChange={(e) => setCreatinina(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#081325] border border-[#4d463a]/40 text-[#d8e2fc] text-sm focus:border-[#43e2d2] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#d0c5b5] block mb-1">
                Sexo Biológico
              </label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#081325] border border-[#4d463a]/40 text-[#d8e2fc] text-sm focus:border-[#43e2d2] focus:outline-none"
              >
                <option value="hombre">Hombre (×1.0)</option>
                <option value="mujer">Mujer (×0.85)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#d0c5b5] block mb-1">
              Fármaco a Prescribir
            </label>
            <select
              value={farmacoSeleccionado}
              onChange={(e) => setFarmacoSeleccionado(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#081325] border border-[#4d463a]/40 text-[#e5c587] font-semibold text-sm focus:border-[#43e2d2] focus:outline-none"
            >
              <option value="pramipexol">Pramipexol (Eliminación renal ~90%)</option>
              <option value="levetiracetam">Levetiracetam (Eliminación renal ~66%)</option>
            </select>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="p-5 rounded-xl bg-[#040e20] border border-[#4d463a]/40 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d0c5b5]/60 block mb-1">
              Fórmula de Cockcroft-Gault:
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#43e2d2]">
                {crCl}
              </span>
              <span className="text-xs text-[#d0c5b5] font-mono">mL / min</span>
            </div>
            <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#152032] border border-[#4d463a]/40 text-[#e5c587]">
              {recomendacion.estado}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#152032] border border-[#c8aa6e]/30 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#e5c587] block">
              Dosis Sugerida Ajustada:
            </span>
            <p className="text-sm font-bold text-white font-mono">
              {recomendacion.dosis}
            </p>
            <p className="text-[11px] text-[#d0c5b5]">
              Nivel de riesgo por acumulación: <strong className="text-[#ffb4ab]">{recomendacion.riesgo}</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
