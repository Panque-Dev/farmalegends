import React, { useState } from 'react';
import CalculadoraDosis from '../components/CalculadoraDosis';
import interaccionesData from '../data/interacciones.json';

export default function Recetario() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroSeveridad, setFiltroSeveridad] = useState('todas');

  // Filtrado reactivo de interacciones por nombre de fármaco o mecanismo
  const interaccionesFiltradas = interaccionesData.filter((item) => {
    const textoBusqueda = busqueda.toLowerCase();
    const puntosTexto = item.puntosClave ? item.puntosClave.join(' ').toLowerCase() : '';
    const conductaTexto = (item.conducta || item.conductaClinica || '').toLowerCase();
    const coincideTexto =
      item.farmacoA.toLowerCase().includes(textoBusqueda) ||
      item.farmacoB.toLowerCase().includes(textoBusqueda) ||
      item.mecanismo.toLowerCase().includes(textoBusqueda) ||
      item.consecuencia.toLowerCase().includes(textoBusqueda) ||
      puntosTexto.includes(textoBusqueda) ||
      conductaTexto.includes(textoBusqueda);

    const coincideSeveridad =
      filtroSeveridad === 'todas' ||
      item.severidad.toLowerCase().includes(filtroSeveridad.toLowerCase());

    return coincideTexto && coincideSeveridad;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Encabezado */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#43e2d2] font-mono">
          Taller Clínico • Farmacoterapéutica Aplicada
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#e5c587]">
          Dosis, Prescripción Razonada &amp; Interacciones
        </h1>
        <p className="text-xs sm:text-sm text-[#d0c5b5] mt-1 font-headline">
          Simulación de ajuste posológico, cálculo de función renal y verificador inteligente de interacciones farmacológicas.
        </p>
      </div>

      {/* Calculadora de Aclaramiento Renal */}
      <CalculadoraDosis />

      {/* Verificador y Buscador de Interacciones Farmacológicas */}
      <div className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 space-y-6">
        
        {/* Cabecera del Módulo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#4d463a]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[24px]">
                sync_problem
              </span>
              <h3 className="font-display text-xl font-bold text-[#e5c587]">
                Verificador Inteligente de Interacciones (DDI Checker)
              </h3>
            </div>
            <p className="text-xs text-[#d0c5b5] mt-1">
              Escribe el nombre de cualquier medicamento para consultar sus cruces, consecuencias y mecanismo.
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-[#111c2e] text-[#43e2d2] border border-[#43e2d2]/30 font-mono font-semibold self-start md:self-auto">
            {interaccionesFiltradas.length} interacción(es) encontrada(s)
          </span>
        </div>

        {/* Barra de Búsqueda y Filtros de Severidad */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Input de Búsqueda */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d0c5b5]/50 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por fármaco (ej. Levodopa, Haloperidol, Fenitoína) o mecanismo..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#081325] border border-[#4d463a]/40 text-[#d8e2fc] text-xs sm:text-sm placeholder-[#d0c5b5]/40 focus:border-[#43e2d2] focus:outline-none transition-all"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d0c5b5]/50 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros Rápidos de Severidad */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['todas', 'contraindicación', 'mayor', 'moderada'].map((severidad) => (
              <button
                key={severidad}
                onClick={() => setFiltroSeveridad(severidad)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                  filtroSeveridad === severidad
                    ? 'bg-[#e5c587] text-[#040e20] shadow-[0_0_12px_rgba(229,197,135,0.3)]'
                    : 'bg-[#081325] text-[#d0c5b5] hover:text-[#e5c587] border border-[#4d463a]/40'
                }`}
              >
                {severidad === 'todas' ? 'Todas las alertas' : severidad}
              </button>
            ))}
          </div>

        </div>

        {/* Grid de Tarjetas de Interacciones */}
        {interaccionesFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {interaccionesFiltradas.map((item) => {
              const esCritico = item.severidad.toLowerCase().includes('contraindicación') || item.severidad.toLowerCase().includes('mayor');
              
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl bg-[#081325] border transition-all duration-300 flex flex-col justify-between space-y-3.5 ${
                    esCritico
                      ? 'border-[#93000a]/50 hover:border-[#ffb4ab] hover:shadow-[0_4px_20px_rgba(147,0,10,0.25)]'
                      : 'border-[#4d463a]/40 hover:border-[#c8aa6e] hover:shadow-[0_4px_20px_rgba(200,170,110,0.15)]'
                  }`}
                >
                  <div>
                    {/* Cruce de Fármacos */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#4d463a]/30">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display font-bold text-sm text-[#e5c587]">
                            {item.farmacoA}
                          </span>
                          {item.tipoFarmacoA && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                              item.tipoFarmacoA.includes('temario')
                                ? 'bg-[#43e2d2]/15 text-[#43e2d2] border border-[#43e2d2]/30'
                                : 'bg-[#e5c587]/15 text-[#e5c587] border border-[#e5c587]/30'
                            }`}>
                              {item.tipoFarmacoA}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#43e2d2] font-mono block">interacciona con</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display font-bold text-sm text-[#e5c587]">
                            {item.farmacoB}
                          </span>
                          {item.tipoFarmacoB && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                              item.tipoFarmacoB.includes('temario')
                                ? 'bg-[#43e2d2]/15 text-[#43e2d2] border border-[#43e2d2]/30'
                                : 'bg-[#e5c587]/15 text-[#e5c587] border border-[#e5c587]/30'
                            }`}>
                              {item.tipoFarmacoB}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="w-8 h-8 rounded-lg bg-[#152032] border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab] shrink-0 font-bold text-xs">
                        ⚡
                      </span>
                    </div>

                    {/* Badge de Severidad */}
                    <div className="mt-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          esCritico
                            ? 'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/40'
                            : 'bg-[#c8aa6e]/20 text-[#e5c587] border border-[#c8aa6e]/40'
                        }`}
                      >
                        {item.severidad}
                      </span>
                    </div>

                    {/* Mecanismo Farmacológico */}
                    <p className="mt-2.5 text-xs text-[#d0c5b5] leading-relaxed">
                      <strong className="text-[#e5c587]">Mecanismo: </strong>
                      {item.mecanismo}
                    </p>
                  </div>

                  {/* Consecuencia Clínica / Alerta */}
                  <div className="pt-3 border-t border-[#4d463a]/25 text-[11px] text-[#ffdad6] bg-[#93000a]/10 p-2.5 rounded-xl border border-[#93000a]/20 space-y-1.5">
                    <strong className="text-[#ffb4ab] block">Riesgo Clínico:</strong>
                    {item.puntosClave ? (
                      <ul className="list-disc pl-4 space-y-1 text-[#ffdad6] text-[11px] leading-relaxed">
                        {item.puntosClave.map((punto, pIdx) => (
                          <li key={pIdx}>{punto}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{item.consecuencia}</p>
                    )}
                  </div>

                  {(item.conducta || item.conductaClinica) && (
                    <div className="text-[11px] text-[#43e2d2] bg-[#43e2d2]/10 p-2.5 rounded-xl border border-[#43e2d2]/20">
                      <strong className="text-[#43e2d2] block mb-0.5">Conducta Médica:</strong>
                      {item.conducta || item.conductaClinica}
                    </div>
                  )}

                  {item.fuentes && (
                    <div className="pt-1 text-[10px] text-[#d0c5b5]/70 font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-[#e5c587]">menu_book</span>
                      <span>{item.fuentes}</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#081325] border border-dashed border-[#4d463a]/40 text-center space-y-2">
            <span className="material-symbols-outlined text-[#d0c5b5]/40 text-[36px]">
              search_off
            </span>
            <p className="text-sm font-semibold text-[#d0c5b5]">
              No se encontraron interacciones para "{busqueda}"
            </p>
            <p className="text-xs text-[#d0c5b5]/60">
              Prueba buscando por el nombre de otro fármaco, diana o limpia los filtros.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
