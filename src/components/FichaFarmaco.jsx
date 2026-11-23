import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import deepLookData from '../data/deep-look.json';
import explainData from '../data/explain.json';

export default function FichaFarmaco({ farmaco }) {
  const [showFichaCompleta, setShowFichaCompleta] = useState(false);
  const [showDeepLook, setShowDeepLook] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [deepTab, setDeepTab] = useState('pk');

  // Bloqueo de scroll y cierre con tecla Escape cuando la ventana flotante está abierta
  useEffect(() => {
    if (!showDeepLook) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowDeepLook(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [showDeepLook]);

  // Datos vinculados de deep-look y explain
  const deepLook = deepLookData.find((d) => d.farmacoId === farmaco.id);
  const explain = explainData.find((e) => e.id === farmaco.patologiaId);

  const usoSeguro = farmaco.usoSeguro || {};
  const identificacion = farmaco.identificacion || {};
  const fuentes = farmaco.fuentes || {};
  const embarazoYLactancia = farmaco.embarazoYLactancia || {};

  return (
    <div className="rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-5 sm:p-6 transition-all duration-300 hover:border-[#c8aa6e]/60 hover:shadow-[0_4px_25px_rgba(200,170,110,0.15)] flex flex-col justify-between space-y-4">
      
      {/* Cabecera: Nombre, Clase y Tema del Programa */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#e5c587]">
              {farmaco.nombre}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#43e2d2] bg-[#43e2d2]/10 px-2.5 py-0.5 rounded-full border border-[#43e2d2]/20">
                {farmaco.clase}
              </span>
              {identificacion.sinonimos && identificacion.sinonimos.length > 0 && (
                <span className="text-[10px] text-[#d0c5b5]/70 italic">
                  ({identificacion.sinonimos.join(', ')})
                </span>
              )}
            </div>
          </div>
          <span className="material-symbols-outlined text-[#e5c587]/70 text-[26px]">
            medication
          </span>
        </div>

        {/* Diana Molecular Principal */}
        <div className="mt-4 p-3 rounded-xl bg-[#111c2e] border border-[#4d463a]/30">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e5c587] block mb-1">
            Diana Molecular del Temario:
          </span>
          <p className="text-xs text-[#d8e2fc] font-mono leading-relaxed">
            {farmaco.dianaPrincipal}
          </p>
        </div>

        {/* Mecanismo de Acción Oficial */}
        <p className="mt-3 text-xs text-[#d0c5b5] leading-relaxed">
          {farmaco.mecanismo}
        </p>

        {/* Usos Clínicos / Indicaciones */}
        {farmaco.farmacologia?.usosClinicos && (
          <div className="mt-3 text-xs text-[#d8e2fc]">
            <strong className="text-[#43e2d2]">Indicaciones Oficiales: </strong>
            <span className="text-[#d0c5b5]">{farmaco.farmacologia.usosClinicos}</span>
          </div>
        )}

        {/* Dosis Habitual con Población y Vía */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#081325] border border-[#4d463a]/30 text-xs text-[#e5c587] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>Dosis Documentada en Lecturas:</span>
          </div>
          <p className="text-[#d8e2fc] text-[11px] font-mono">
            {typeof farmaco.dosis === 'object' ? farmaco.dosis.texto : farmaco.dosis}
          </p>
          {usoSeguro.dosis?.nota && (
            <p className="text-[10px] text-[#d0c5b5]/60 italic">{usoSeguro.dosis.nota}</p>
          )}
        </div>

        {/* Efectos Adversos Clave */}
        <div className="mt-3">
          <span className="text-[10px] uppercase font-bold text-[#d0c5b5]/60 block mb-1.5">
            Efectos Adversos Documentados:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {farmaco.efectosAdversos.map((efecto, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/30 font-medium"
              >
                {efecto}
              </span>
            ))}
          </div>
        </div>

        {/* Contraindicaciones Separadas */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[11px] text-[#ffdad6] space-y-0.5">
          <strong className="text-[#ffb4ab] uppercase text-[10px] block">
            🚫 Contraindicaciones:
          </strong>
          <p className="leading-snug">
            {farmaco.contraindicaciones || usoSeguro.contraindicaciones || 'No especificado en las lecturas consultadas.'}
          </p>
        </div>

        {/* Monitorización Requerida */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#111c2e] border border-[#43e2d2]/30 text-[11px] text-[#d8e2fc] space-y-0.5">
          <strong className="text-[#43e2d2] uppercase text-[10px] block">
            🩺 Monitorización Clínica &amp; Laboratorio:
          </strong>
          <p className="leading-snug text-[#d0c5b5]">
            {farmaco.monitorizacion || usoSeguro.monitorizacion || 'No especificado en las lecturas consultadas.'}
          </p>
        </div>

        {/* Embarazo y Lactancia Narrativa (FDA PLLR) */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#040e20] border border-[#c8aa6e]/30 text-[11px] space-y-1.5">
          <div>
            <strong className="text-[#e5c587] uppercase text-[10px] block">
              🤰 Embarazo (Norma Narrativa FDA PLLR):
            </strong>
            <p className="text-[#d0c5b5] leading-snug">
              {embarazoYLactancia.embarazo || farmaco.embarazo}
            </p>
          </div>
          <div className="pt-1 border-t border-[#4d463a]/30">
            <strong className="text-[#e5c587] uppercase text-[10px] block">
              🤱 Lactancia:
            </strong>
            <p className="text-[#d0c5b5] leading-snug">
              {embarazoYLactancia.lactancia || farmaco.lactancia || 'No especificado en las lecturas consultadas.'}
            </p>
          </div>
        </div>

        {/* Fuentes y Páginas de Respaldo */}
        <div className="mt-3 pt-2 border-t border-[#4d463a]/30 text-[10px] text-[#d0c5b5]/70 flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#e5c587] shrink-0">menu_book</span>
          <div>
            <strong className="text-[#e5c587]">Fuentes y Páginas de Respaldo: </strong>
            <span>{fuentes.lecturaPrincipal || farmaco.fuentesTexto}</span>
            {fuentes.programaOficial && <span className="block mt-0.5 text-[#43e2d2]">{fuentes.programaOficial}</span>}
          </div>
        </div>

      </div>

      {/* Botones de Acción: Ficha Completa, Deep Look & Fisiopatología */}
      <div className="pt-3 border-t border-[#4d463a]/20 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowFichaCompleta(!showFichaCompleta)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-[#111c2e] hover:bg-[#202a3d] text-[#e5c587] border border-[#c8aa6e]/30 text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-[15px]">description</span>
          {showFichaCompleta ? 'Menos Detalles' : 'Ver Ficha Completa'}
        </button>

        {deepLook && (
          <button
            onClick={() => setShowDeepLook(true)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-[#202a3d] hover:bg-[#2b3548] text-[#43e2d2] border border-[#43e2d2]/40 text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-[0_0_10px_rgba(67,226,210,0.1)] hover:shadow-[0_0_15px_rgba(67,226,210,0.25)]"
            title="Abrir ventana flotante con la monografía molecular y clínica avanzada"
          >
            <span className="material-symbols-outlined text-[15px]">biotech</span>
            Deep Look
          </button>
        )}

        {explain && (
          <button
            onClick={() => setShowExplain(!showExplain)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-[#111c2e] hover:bg-[#202a3d] text-[#e5c587] border border-[#c8aa6e]/30 text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">psychology</span>
            {showExplain ? 'Cerrar Fisiopato' : 'Fisiopatología'}
          </button>
        )}
      </div>

      {/* Panel Ficha Completa Expandida */}
      {showFichaCompleta && (
        <div className="p-4 rounded-xl bg-[#040e20] border border-[#c8aa6e]/40 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#4d463a]/30">
            <span className="font-display font-bold text-[#e5c587]">{farmaco.nombre} • Desglose Editorial</span>
            <span className="text-[10px] text-[#43e2d2] font-mono">KATZUNG & GOODMAN</span>
          </div>

          <div className="space-y-2 text-[#d0c5b5] text-[11px]">
            <p><strong className="text-[#e5c587]">Tema Oficial:</strong> {identificacion.temaPrograma || 'Temario oficial FacMed'}</p>
            <p><strong className="text-[#e5c587]">Precauciones Clínicas:</strong> {usoSeguro.precauciones || farmaco.alertas || 'No especificado en las lecturas consultadas.'}</p>
            <p><strong className="text-[#e5c587]">Límites de la Evidencia:</strong> {embarazoYLactancia.limitesEvidencia || 'Verificar textos de referencia obligatorios citados.'}</p>
            {(farmaco.interacciones || usoSeguro.interacciones) && (
              <div className="pt-2 border-t border-[#4d463a]/30">
                <strong className="text-[#43e2d2] block mb-1">Interacciones Documentadas:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {(farmaco.interacciones || usoSeguro.interacciones).map((inter, idx) => (
                    <li key={idx}>
                      <span className="text-white font-semibold">{inter.farmacoImplicado}</span> ({inter.tipoFarmaco}): {inter.efectoClinico} - <em>{inter.conducta}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ventana Flotante Modal Deep Look */}
      {showDeepLook && deepLook && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDeepLook(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#081325] border border-[#43e2d2]/40 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(67,226,210,0.15)] flex flex-col overflow-hidden animate-scaleUp">
            
            {/* Cabecera de la Ventana Flotante */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#0a162b] border-b border-[#4d463a]/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111c2e] border border-[#43e2d2]/40 text-[#43e2d2] flex items-center justify-center shadow-[0_0_15px_rgba(67,226,210,0.25)] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">biotech</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#e5c587]">
                      {deepLook.titulo}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#43e2d2]/15 text-[#43e2d2] border border-[#43e2d2]/30 font-bold uppercase tracking-wider">
                      {farmaco.clase}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#d0c5b5]/70 block font-mono">
                    {farmaco.nombre} • Monografía Molecular &amp; Clínica Avanzada
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowDeepLook(false)}
                className="w-9 h-9 rounded-xl bg-[#152032] hover:bg-[#93000a]/30 text-[#d0c5b5] hover:text-[#ffdad6] border border-[#4d463a]/40 hover:border-[#ffb4ab]/40 flex items-center justify-center transition-all shrink-0"
                title="Cerrar ventana (Esc)"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Subnavegador de Secciones si existen datos extendidos */}
            {deepLook.mecanismoAccion && (
              <div className="px-5 py-2.5 bg-[#0b172a] border-b border-[#4d463a]/30 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
                {[
                  { id: 'pk', label: '⏱️ Farmacocinética' },
                  { id: 'mecanismo', label: '🔬 Mecanismo & Dianas' },
                  { id: 'usos', label: '🎯 Usos Clínicos' },
                  { id: 'precauciones', label: '⚠️ Precauciones & Beers' },
                  { id: 'reacciones', label: '⚡ Reacciones Adversas' },
                  { id: 'embarazo', label: '🤰 Gestación & Lactancia' },
                  { id: 'contraindicaciones', label: '🚫 Contraindicaciones' },
                  { id: 'toxicologia', label: '🧪 Toxicología & Rescate' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDeepTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      deepTab === tab.id
                        ? 'bg-[#43e2d2] text-[#040e20] font-bold shadow-[0_0_12px_rgba(67,226,210,0.35)]'
                        : 'bg-[#152032] text-[#d0c5b5] hover:text-[#43e2d2] hover:bg-[#1a2942]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Cuerpo de la Ventana Flotante (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              {/* Contenido según pestaña o vista estándar */}
              {(!deepLook.mecanismoAccion || deepTab === 'pk') && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              {deepLook.farmacocineticaDetallada && (
                <>
                  <p><strong className="text-[#43e2d2]">Biodisponibilidad:</strong> {deepLook.farmacocineticaDetallada.biodisponibilidad}</p>
                  {deepLook.farmacocineticaDetallada.tmax && (
                    <p><strong className="text-[#43e2d2]">Tmax &amp; Pico:</strong> {deepLook.farmacocineticaDetallada.tmax}</p>
                  )}
                  {deepLook.farmacocineticaDetallada.inicioYDuracion && (
                    <p><strong className="text-[#43e2d2]">Inicio y Duración:</strong> {deepLook.farmacocineticaDetallada.inicioYDuracion}</p>
                  )}
                  {deepLook.farmacocineticaDetallada.distribucion && (
                    <p><strong className="text-[#43e2d2]">Distribución &amp; Vd:</strong> {deepLook.farmacocineticaDetallada.distribucion}</p>
                  )}
                  <p><strong className="text-[#43e2d2]">Metabolismo:</strong> {deepLook.farmacocineticaDetallada.metabolismo}</p>
                  <p><strong className="text-[#43e2d2]">Vida Media (t½):</strong> {deepLook.farmacocineticaDetallada.vidaMedia}</p>
                  {deepLook.farmacocineticaDetallada.eliminacion && (
                    <p><strong className="text-[#43e2d2]">Eliminación &amp; Aclaramiento:</strong> {deepLook.farmacocineticaDetallada.eliminacion}</p>
                  )}
                  {deepLook.farmacocineticaDetallada.fraccionActiva && (
                    <div className="p-2 rounded-lg bg-[#43e2d2]/10 border border-[#43e2d2]/30 text-[#43e2d2]">
                      <strong>Fracción Activa (Active Moiety): </strong>{deepLook.farmacocineticaDetallada.fraccionActiva}
                    </div>
                  )}
                  {deepLook.farmacocineticaDetallada.ventanaTerapeutica && (
                    <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#e5c587]">
                      <strong>Ventana Terapéutica: </strong>{deepLook.farmacocineticaDetallada.ventanaTerapeutica}
                    </div>
                  )}
                  {deepLook.farmacocineticaDetallada.transporteLAT1 && (
                    <p><strong className="text-[#43e2d2]">Transporte / BHE:</strong> {deepLook.farmacocineticaDetallada.transporteLAT1}</p>
                  )}
                </>
              )}
            </div>
          )}

          {deepLook.mecanismoAccion && deepTab === 'mecanismo' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              {deepLook.mecanismoAccion.dianaPrincipal && (
                <p><strong className="text-[#e5c587]">Diana Principal:</strong> {deepLook.mecanismoAccion.dianaPrincipal}</p>
              )}
              {deepLook.mecanismoAccion.efectoTerapeutico && (
                <p><strong className="text-[#e5c587]">Efecto Terapéutico:</strong> {deepLook.mecanismoAccion.efectoTerapeutico}</p>
              )}
              {deepLook.mecanismoAccion.fundamentoCombinacion && (
                <div className="p-2.5 rounded-lg bg-[#43e2d2]/10 border border-[#43e2d2]/30 text-[#43e2d2] space-y-1">
                  <strong className="block mb-0.5">Fundamento Farmacológico de la Combinación:</strong>
                  <p>{deepLook.mecanismoAccion.fundamentoCombinacion}</p>
                </div>
              )}
              {deepLook.mecanismoAccion.bheTransporte && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#e5c587]">
                  <strong>Transporte a través de la BHE (LAT1): </strong>
                  <span className="text-[#d8e2fc]">{deepLook.mecanismoAccion.bheTransporte}</span>
                </div>
              )}
              {deepLook.mecanismoAccion.selectividadSubtipo && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#43e2d2]/30 text-[#43e2d2]">
                  <strong>Selectividad de Subtipo Receptorial: </strong>
                  <span className="text-[#d8e2fc]">{deepLook.mecanismoAccion.selectividadSubtipo}</span>
                </div>
              )}
              {deepLook.mecanismoAccion.metabolitosAnfetaminicos && (
                <div className="p-2 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[#ffdad6]">
                  <strong>Perfil de Metabolitos Anfetamínicos: </strong>
                  <span>{deepLook.mecanismoAccion.metabolitosAnfetaminicos}</span>
                </div>
              )}
              {deepLook.mecanismoAccion.reaccionesTipoA && (
                <p><strong className="text-[#ffb4ab]">Reacciones Tipo A (Mecanismo):</strong> {deepLook.mecanismoAccion.reaccionesTipoA}</p>
              )}
              {deepLook.mecanismoAccion.interferenciaOtrosReceptores && (
                <div className="p-2.5 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 space-y-1">
                  <strong className="text-[#43e2d2] block mb-1">Afinidad e Interferencia con Otros Receptores:</strong>
                  {deepLook.mecanismoAccion.interferenciaOtrosReceptores.dopaminergicosD1D4 && (
                    <p><strong className="text-[#e5c587]">D1 y D4 (Selectividad):</strong> {deepLook.mecanismoAccion.interferenciaOtrosReceptores.dopaminergicosD1D4}</p>
                  )}
                  {deepLook.mecanismoAccion.interferenciaOtrosReceptores.dopaminergicosD2D3 && (
                    <p><strong className="text-[#e5c587]">D2 y D3 (Afinidad Nanomolar):</strong> {deepLook.mecanismoAccion.interferenciaOtrosReceptores.dopaminergicosD2D3}</p>
                  )}
                  {deepLook.mecanismoAccion.interferenciaOtrosReceptores.alfa1Adrenergico && (
                    <p><strong className="text-white">Alfa-1 Adrenérgico:</strong> {deepLook.mecanismoAccion.interferenciaOtrosReceptores.alfa1Adrenergico}</p>
                  )}
                  {deepLook.mecanismoAccion.interferenciaOtrosReceptores.colinergicoMuscarinico && (
                    <p><strong className="text-white">Muscarínico (M1/M2):</strong> {deepLook.mecanismoAccion.interferenciaOtrosReceptores.colinergicoMuscarinico}</p>
                  )}
                  {deepLook.mecanismoAccion.interferenciaOtrosReceptores.histaminergicoH1 && (
                    <p><strong className="text-white">Histaminérgico (H1):</strong> {deepLook.mecanismoAccion.interferenciaOtrosReceptores.histaminergicoH1}</p>
                  )}
                </div>
              )}
              {deepLook.mecanismoAccion.canalesIonicosCardiacos && (
                <p className="p-2 rounded-lg bg-[#93000a]/15 text-[#ffdad6] border border-[#ffb4ab]/30">
                  <strong className="text-[#ffb4ab]">Canales Cardíacos (IKr / hERG):</strong> {deepLook.mecanismoAccion.canalesIonicosCardiacos}
                </p>
              )}
              {deepLook.farmacodinamiaAvanzada?.ocupacionReceptores && (
                <p><strong className="text-[#43e2d2]">Ocupación de Receptores:</strong> {deepLook.farmacodinamiaAvanzada.ocupacionReceptores}</p>
              )}
              {deepLook.farmacodinamiaAvanzada?.fastOff && (
                <p className="p-2 rounded-lg bg-[#152032] border border-[#43e2d2]/30 text-[#43e2d2]">
                  <strong>Cinética 'Fast-Off' D2:</strong> {deepLook.farmacodinamiaAvanzada.fastOff}
                </p>
              )}
              {deepLook.farmacodinamiaAvanzada?.mecanismoInmunotoxico && (
                <p className="p-2 rounded-lg bg-[#93000a]/15 text-[#ffdad6] border border-[#ffb4ab]/30">
                  <strong className="text-[#ffb4ab]">Mecanismo Inmunotóxico de Agranulocitosis:</strong> {deepLook.farmacodinamiaAvanzada.mecanismoInmunotoxico}
                </p>
              )}
            </div>
          )}

          {deepLook.usosClinicos && deepTab === 'usos' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              <strong className="text-[#e5c587] block mb-1">Indicaciones y Usos Aprobados:</strong>
              {deepLook.usosClinicos.map((uso, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 space-y-0.5">
                  <strong className="text-[#43e2d2] text-xs">{uso.indicacion}</strong>
                  <p><span className="text-[#e5c587]">Población &amp; Vía:</span> {uso.poblacion}</p>
                  {uso.deposito && <p><span className="text-white">Depósito / Mantenimiento:</span> {uso.deposito}</p>}
                  {uso.criterio && <p className="text-[#ffdad6]"><span className="font-semibold">Criterio estricto:</span> {uso.criterio}</p>}
                </div>
              ))}
            </div>
          )}

          {deepLook.precauciones && deepTab === 'precauciones' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              {deepLook.precauciones.hematologicasMonitoreoANC && (
                <div className="p-2.5 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Monitoreo Hematológico Obligatorio (ANC / REMS):</strong>
                  {deepLook.precauciones.hematologicasMonitoreoANC}
                </div>
              )}
              {deepLook.precauciones.cardiovasculares && (
                <div className="p-2 rounded-lg bg-[#93000a]/10 border border-[#93000a]/30 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Cardiovasculares (QTc, Hipotensión &amp; Arritmias):</strong>
                  {deepLook.precauciones.cardiovasculares}
                </div>
              )}
              {deepLook.precauciones.neurologicas && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#e5c587] block">Neurológicas &amp; Motoras:</strong>
                  {deepLook.precauciones.neurologicas}
                </div>
              )}
              {deepLook.precauciones.titulacionYRetirada && (
                <div className="p-2 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Retirada Gradual &amp; Síndrome Hiperpirexia (Parkinsonian Hyperpyrexia Syndrome):</strong>
                  {deepLook.precauciones.titulacionYRetirada}
                </div>
              )}
              {deepLook.precauciones.abstinenciaDAWS && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#e5c587]">
                  <strong className="text-[#e5c587] block">Síndrome de Abstinencia a Agonistas Dopaminérgicos (DAWS):</strong>
                  <span className="text-[#d0c5b5]">{deepLook.precauciones.abstinenciaDAWS}</span>
                </div>
              )}
              {deepLook.precauciones.manejoPerioperatorio && (
                <div className="p-2 rounded-lg bg-[#152032] border border-[#43e2d2]/30 text-[#d8e2fc]">
                  <strong className="text-[#43e2d2] block">Manejo Perioperatorio:</strong>
                  {deepLook.precauciones.manejoPerioperatorio}
                </div>
              )}
              {deepLook.precauciones.periodosLavadoWashout && (
                <div className="p-2.5 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Periodos de Lavado Obligatorios (Washout):</strong>
                  {deepLook.precauciones.periodosLavadoWashout}
                </div>
              )}
              {deepLook.precauciones.restriccionTiramina && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#e5c587]">
                  <strong className="text-[#e5c587] block">Restricción Dietética de Tiramina:</strong>
                  <span className="text-[#d0c5b5]">{deepLook.precauciones.restriccionTiramina}</span>
                </div>
              )}
              {deepLook.precauciones.dermatologicasMelanoma && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 text-[#d0c5b5]">
                  <strong className="text-[#e5c587] block">Vigilancia Dermatológica (Melanoma):</strong>
                  {deepLook.precauciones.dermatologicasMelanoma}
                </div>
              )}
              {deepLook.precauciones.respiratoriasEPOC && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#ffb4ab]/30 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Precaución Pulmonar (EPOC / Asma):</strong>
                  {deepLook.precauciones.respiratoriasEPOC}
                </div>
              )}
              {deepLook.precauciones.gastrointestinales && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#d0c5b5]">
                  <strong className="text-[#e5c587] block">Gastrointestinales / Hipomotilidad:</strong>
                  {deepLook.precauciones.gastrointestinales}
                </div>
              )}
              {deepLook.precauciones.habitoTabaquico && (
                <div className="p-2 rounded-lg bg-[#152032] border border-[#4d463a]/40 text-[#d8e2fc]">
                  <strong className="text-[#43e2d2] block">Interacción Clave con Hábito Tabáquico:</strong>
                  {deepLook.precauciones.habitoTabaquico}
                </div>
              )}
              {deepLook.precauciones.poblacionesEspeciales && (
                <div className="p-2 rounded-lg bg-[#152032] border border-[#c8aa6e]/30 space-y-1">
                  <strong className="text-[#e5c587] block">Poblaciones Especiales (Criterios de Beers &amp; KIDs):</strong>
                  {deepLook.precauciones.poblacionesEspeciales.adultosMayoresBeers && (
                    <p><strong className="text-[#ffb4ab]">Adultos mayores (Beers):</strong> {deepLook.precauciones.poblacionesEspeciales.adultosMayoresBeers}</p>
                  )}
                  {deepLook.precauciones.poblacionesEspeciales.riesgoCaidas && (
                    <p><strong className="text-[#ffb4ab]">Riesgo de Caídas/Fracturas:</strong> {deepLook.precauciones.poblacionesEspeciales.riesgoCaidas}</p>
                  )}
                  {deepLook.precauciones.poblacionesEspeciales.pediatriaKids && (
                    <p><strong className="text-[#ffb4ab]">Pediatría (KIDs):</strong> {deepLook.precauciones.poblacionesEspeciales.pediatriaKids}</p>
                  )}
                </div>
              )}
              {deepLook.precauciones.interaccionesClave && (
                <p className="p-2 rounded-lg bg-[#93000a]/15 text-[#ffdad6] border border-[#ffb4ab]/30">
                  <strong className="text-[#ffb4ab]">Alerta Crítica:</strong> {deepLook.precauciones.interaccionesClave}
                </p>
              )}
            </div>
          )}

          {deepLook.reaccionesAdversas && deepTab === 'reacciones' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              {deepLook.reaccionesAdversas.discinesiasMotoras && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#d0c5b5]">
                  <strong className="text-[#e5c587] block">Discinesias &amp; Fluctuaciones Motoras (On-Off / Wearing-Off):</strong>
                  {deepLook.reaccionesAdversas.discinesiasMotoras}
                </div>
              )}
              {deepLook.reaccionesAdversas.extrapiramidales && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#ffb4ab] block">Trastornos Extrapiramidales (EPS D2):</strong>
                  {deepLook.reaccionesAdversas.extrapiramidales}
                </div>
              )}
              {deepLook.reaccionesAdversas.ataquesSueno && (
                <div className="p-2 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Ataques Súbitos de Sueño (Sleep Attacks) &amp; Somnolencia:</strong>
                  {deepLook.reaccionesAdversas.ataquesSueno}
                </div>
              )}
              {deepLook.reaccionesAdversas.controlImpulsosPsiquiatricas && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#c8aa6e]/30 text-[#d0c5b5]">
                  <strong className="text-[#e5c587] block">Trastornos del Control de Impulsos &amp; Psiquiátricas:</strong>
                  {deepLook.reaccionesAdversas.controlImpulsosPsiquiatricas}
                </div>
              )}
              {deepLook.reaccionesAdversas.snm && (
                <div className="p-2 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Síndrome Neuroléptico Maligno (SNM) / Retirada:</strong>
                  {deepLook.reaccionesAdversas.snm}
                </div>
              )}
              {deepLook.reaccionesAdversas.cardiovasculares && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#ffb4ab] block">Cardiovasculares (Hipotensión Ortostática / Crisis Hipertensiva):</strong>
                  {deepLook.reaccionesAdversas.cardiovasculares}
                </div>
              )}
              {deepLook.reaccionesAdversas.gastrointestinales && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#e5c587] block">Gastrointestinales (Náusea, Vómito &amp; Dispepsia):</strong>
                  {deepLook.reaccionesAdversas.gastrointestinales}
                </div>
              )}
              {deepLook.reaccionesAdversas.musculoesqueleticas && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#43e2d2] block">Musculoesqueléticas &amp; Deformidades Posturales:</strong>
                  {deepLook.reaccionesAdversas.musculoesqueleticas}
                </div>
              )}
              {deepLook.reaccionesAdversas.dermatologicasUrinarias && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-white block">Dermatológicas &amp; Coloración de Orina / Cartílago:</strong>
                  {deepLook.reaccionesAdversas.dermatologicasUrinarias}
                </div>
              )}
              {deepLook.reaccionesAdversas.hematologicas && (
                <div className="p-2.5 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab] block">Hematológicas (Agranulocitosis &amp; TEP):</strong>
                  {deepLook.reaccionesAdversas.hematologicas}
                </div>
              )}
              {deepLook.reaccionesAdversas.endocrinasMetabolicas && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#4d463a]/30">
                  <strong className="text-[#43e2d2] block">Eje Endocrino / Prolactina:</strong>
                  {deepLook.reaccionesAdversas.endocrinasMetabolicas}
                </div>
              )}
              {deepLook.reaccionesAdversas.anticolinergicas && (
                <p><strong className="text-white">Efectos Anticolinérgicos:</strong> {deepLook.reaccionesAdversas.anticolinergicas}</p>
              )}
            </div>
          )}

          {deepTab === 'embarazo' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              {deepLook.embarazoYPerinatal ? (
                <>
                  {deepLook.embarazoYPerinatal.clasificacionMicromedex && (
                    <div className="p-2 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffdad6]">
                      <strong className="text-[#ffb4ab] block">Clasificación de Riesgo Micromedex:</strong>
                      {deepLook.embarazoYPerinatal.clasificacionMicromedex}
                    </div>
                  )}
                  {deepLook.embarazoYPerinatal.pasoTransplacentario && (
                    <p><strong className="text-[#43e2d2]">Paso Transplacentario:</strong> {deepLook.embarazoYPerinatal.pasoTransplacentario}</p>
                  )}
                  {deepLook.embarazoYPerinatal.evidenciaTeratogenica && (
                    <p><strong className="text-[#e5c587]">Evidencia Teratogénica &amp; Malformaciones:</strong> {deepLook.embarazoYPerinatal.evidenciaTeratogenica}</p>
                  )}
                  {deepLook.embarazoYPerinatal.riesgosMetabolicosMaternos && (
                    <div className="p-2 rounded-lg bg-[#111c2e] border border-[#e5c587]/30 text-[#e5c587]">
                      <strong>Riesgo Metabólico Materno (Diabetes Gestacional):</strong> {deepLook.embarazoYPerinatal.riesgosMetabolicosMaternos}
                    </div>
                  )}
                  {deepLook.embarazoYPerinatal.complicacionesTercerTrimestre && (
                    <div className="p-2 rounded-lg bg-[#111c2e] border border-[#ffb4ab]/30 text-[#ffdad6]">
                      <strong className="text-[#ffb4ab] block">Complicaciones en 3.er Trimestre &amp; Abstinencia Neonatal:</strong>
                      {deepLook.embarazoYPerinatal.complicacionesTercerTrimestre}
                    </div>
                  )}
                  {deepLook.embarazoYPerinatal.complicacionesNeonatales && (
                    <div className="p-2 rounded-lg bg-[#111c2e] border border-[#ffb4ab]/30 text-[#ffdad6]">
                      <strong className="text-[#ffb4ab] block">Complicaciones Neonatales:</strong>
                      {deepLook.embarazoYPerinatal.complicacionesNeonatales}
                    </div>
                  )}
                  {deepLook.embarazoYPerinatal.desarrolloNeuroconductual && (
                    <p><strong className="text-[#43e2d2]">Desarrollo Neuroconductual Temprano (Bayley BSID-III):</strong> {deepLook.embarazoYPerinatal.desarrolloNeuroconductual}</p>
                  )}
                  {(deepLook.embarazoYPerinatal.recomendacionesACOG || deepLook.embarazoYPerinatal.recomendacionesClinicas || deepLook.embarazoYPerinatal.criterioUsoClinico) && (
                    <div className="p-2.5 rounded-lg bg-[#152032] border border-[#43e2d2]/30 text-[#d8e2fc]">
                      <strong className="text-[#43e2d2] block mb-0.5">Recomendaciones Clínicas (Guías ACOG / Manejo):</strong>
                      {deepLook.embarazoYPerinatal.recomendacionesACOG || deepLook.embarazoYPerinatal.recomendacionesClinicas || deepLook.embarazoYPerinatal.criterioUsoClinico}
                    </div>
                  )}
                  {deepLook.embarazoYPerinatal.lactancia && (
                    <div className={`p-2.5 rounded-lg border ${
                      deepLook.embarazoYPerinatal.lactancia.toLowerCase().includes('desaconseja') || deepLook.embarazoYPerinatal.lactancia.toLowerCase().includes('contraindica')
                        ? 'bg-[#93000a]/20 border-[#ffb4ab]/40 text-[#ffdad6]'
                        : 'bg-[#43e2d2]/10 border-[#43e2d2]/30 text-[#43e2d2]'
                    }`}>
                      <strong className="block mb-0.5">Lactancia Materna:</strong>
                      {deepLook.embarazoYPerinatal.lactancia}
                    </div>
                  )}
                </>
              ) : (
                <div className="p-3 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 space-y-2">
                  <p><strong className="text-[#e5c587]">Embarazo:</strong> {embarazoYLactancia.embarazo || farmaco.embarazo || 'No especificado en las lecturas consultadas.'}</p>
                  <p><strong className="text-[#43e2d2]">Lactancia:</strong> {embarazoYLactancia.lactancia || farmaco.lactancia || 'No especificado en las lecturas consultadas.'}</p>
                  <p><strong className="text-white">Límites de la Evidencia:</strong> {embarazoYLactancia.limitesEvidencia || 'Evaluación narrativa según FDA PLLR.'}</p>
                </div>
              )}
            </div>
          )}

          {deepLook.contraindicaciones && deepTab === 'contraindicaciones' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[#ffdad6] space-y-1">
                <strong className="text-[#ffb4ab] block">Contraindicaciones Generales:</strong>
                <ul className="list-disc pl-4 space-y-0.5">
                  {deepLook.contraindicaciones.generales.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
              {deepLook.contraindicaciones.porFormulacion && (
                <div className="p-2.5 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 space-y-1">
                  <strong className="text-[#e5c587] block">Contraindicaciones por Formulación:</strong>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {deepLook.contraindicaciones.porFormulacion.map((cf, idx) => (
                      <li key={idx}>{cf}</li>
                    ))}
                  </ul>
                </div>
              )}
              {deepLook.contraindicaciones.porCondicion && (
                <div className="p-2.5 rounded-lg bg-[#111c2e] border border-[#4d463a]/30 space-y-1">
                  <strong className="text-[#e5c587] block">Contraindicaciones por Condición Clínica:</strong>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {deepLook.contraindicaciones.porCondicion.map((cond, idx) => (
                      <li key={idx}>{cond}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {deepLook.toxicologia && deepTab === 'toxicologia' && (
            <div className="space-y-2 text-[#d0c5b5] text-[11px]">
              <p><strong className="text-[#ffb4ab]">Mecanismo de Toxicidad:</strong> {deepLook.toxicologia.mecanismo}</p>
              <div className="p-2 rounded-lg bg-[#93000a]/15 border border-[#ffb4ab]/30 text-[#ffdad6] space-y-1">
                <strong className="text-[#ffb4ab] block">Manifestaciones Clínicas:</strong>
                <p><span className="text-white font-semibold">Leves a Moderadas:</span> {deepLook.toxicologia.manifestaciones.levesModeradas}</p>
                <p><span className="text-white font-semibold">Severas / Mortales:</span> {deepLook.toxicologia.manifestaciones.severasMortales}</p>
              </div>
              {deepLook.toxicologia.rangosToxicidad && (
                <div className="p-2 rounded-lg bg-[#111c2e] border border-[#ffb4ab]/30 text-[#ffdad6]">
                  <strong className="text-[#ffb4ab]">Umbrales de Toxicidad: </strong>{deepLook.toxicologia.rangosToxicidad}
                </div>
              )}
              <div className="p-2.5 rounded-lg bg-[#152032] border border-[#43e2d2]/30 space-y-1">
                <strong className="text-[#43e2d2] block">Protocolo de Manejo &amp; Rescate Toxicológico:</strong>
                <ul className="list-disc pl-4 space-y-1 text-[#d8e2fc]">
                  {deepLook.toxicologia.manejoSoporte.map((paso, idx) => (
                    <li key={idx}>{paso}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

              {deepLook.perlasClinicas && (
                <div className="pt-3 border-t border-[#4d463a]/30">
                  <span className="font-bold text-[#e5c587] block mb-1">Perlas Clínicas:</span>
                  <ul className="list-disc list-inside space-y-1 text-[#d8e2fc] text-[11px]">
                    {deepLook.perlasClinicas.map((perla, idx) => (
                      <li key={idx}>{perla}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Pie de la Ventana Flotante */}
            <div className="px-5 py-3 bg-[#0a162b] border-t border-[#4d463a]/40 flex items-center justify-between text-xs text-[#d0c5b5]/70 shrink-0">
              <span className="font-mono text-[11px] hidden sm:inline">
                Lecturas Oficiales FacMed • Guías ACOG • FDA PLLR • Micromedex
              </span>
              <button
                onClick={() => setShowDeepLook(false)}
                className="ml-auto px-4 py-1.5 rounded-lg bg-[#152032] hover:bg-[#202a3d] text-[#e5c587] hover:text-white border border-[#c8aa6e]/40 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                Cerrar Ventana
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Panel Fisiopatología (Explain) Expandido */}
      {showExplain && explain && (
        <div className="p-4 rounded-xl bg-[#040e20] border border-[#c8aa6e]/40 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#4d463a]/30">
            <span className="font-display font-bold text-[#e5c587]">{explain.titulo}</span>
            <span className="text-[10px] text-[#43e2d2] font-mono">{explain.sistema}</span>
          </div>

          <p className="text-[#d0c5b5] text-[11px] leading-relaxed">
            <strong className="text-[#e5c587]">Lesión Central:</strong> {explain.etiopatogenia?.lesionCentral}
          </p>

          {explain.racionalTerapeutico && (
            <div className="p-2.5 rounded-lg bg-[#152032] border border-[#4d463a]/30 text-[11px] text-[#d8e2fc] space-y-1">
              <strong className="text-[#43e2d2] block mb-1">Racional Terapéutico Oficial:</strong>
              {explain.racionalTerapeutico.map((racional, idx) => (
                <div key={idx} className="mb-1 last:mb-0">
                  <span className="text-[#e5c587] font-semibold">{racional.objetivo}: </span>
                  <span>{racional.explicacion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
