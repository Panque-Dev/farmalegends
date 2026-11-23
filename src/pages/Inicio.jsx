import React from 'react';
import { Link } from 'react-router-dom';
import farmacosData from '../data/farmacos.json';
import explainData from '../data/explain.json';

export default function Inicio() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner Arcane */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#111c2e] via-[#081325] to-[#040e20] border border-[#c8aa6e]/40 p-8 sm:p-12 overflow-hidden shadow-[0_4px_40px_rgba(4,14,32,0.9)]">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#43e2d2]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e5c587]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152032] border border-[#c8aa6e]/40 text-xs font-semibold text-[#e5c587]">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Cátedra Universitaria • Arquitectura React Modular</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#e5c587] tracking-tight leading-tight">
            Academia Arcana de Farmacología Médica
          </h1>
          
          <p className="text-sm sm:text-base text-[#d0c5b5] leading-relaxed font-headline">
            Plataforma interactiva de alta fidelidad diseñada para correlacionar la diana molecular, los circuitos fisiopatológicos y la toma de decisiones clínicas en la terapéutica médica contemporánea.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              to="/dopamina"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e5c587] to-[#c8aa6e] text-[#040e20] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(200,170,110,0.3)] hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              <span>Explorar Dopamina &amp; Psicosis</span>
            </Link>
            <Link
              to="/recetario"
              className="px-5 py-2.5 rounded-xl bg-[#152032] hover:bg-[#202a3d] text-[#43e2d2] border border-[#43e2d2]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Calculadora de Dosis</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Key Study Modules */}
      <section className="space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#43e2d2] font-mono">
            Módulos de Cátedra
          </span>
          <h2 className="font-display text-2xl font-bold text-[#e5c587]">
            Bloques Temáticos Disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Module 1: Dopamina */}
          <Link
            to="/dopamina"
            className="group rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 hover:border-[#c8aa6e] hover:shadow-[0_4px_25px_rgba(200,170,110,0.2)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#202a3d] border border-[#e5c587]/30 flex items-center justify-center text-[#e5c587] group-hover:scale-110 group-hover:border-[#43e2d2] group-hover:text-[#43e2d2] transition-all">
                <span className="material-symbols-outlined text-[28px]">psychology</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#e5c587] group-hover:text-white transition-colors">
                Dopamina: Parkinson &amp; Esquizofrenia
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                Interacción molecular 3D, balance de vías mesolímbica y nigroestriatal, agonistas D2/D3 y antipsicóticos atípicos.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#4d463a]/20 flex items-center justify-between text-xs text-[#43e2d2]">
              <span>Ver Simulador &amp; Fármacos</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          {/* Module 2: Epilepsia */}
          <Link
            to="/epilepsia"
            className="group rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 hover:border-[#c8aa6e] hover:shadow-[0_4px_25px_rgba(200,170,110,0.2)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#202a3d] border border-[#e5c587]/30 flex items-center justify-center text-[#e5c587] group-hover:scale-110 group-hover:border-[#43e2d2] group-hover:text-[#43e2d2] transition-all">
                <span className="material-symbols-outlined text-[28px]">bolt</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#e5c587] group-hover:text-white transition-colors">
                Epilepsia: Canales &amp; Excitabilidad
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                Canales de sodio dependientes de voltaje (NaV), modulación de vesículas SV2A y protocolo del estado epiléptico.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#4d463a]/20 flex items-center justify-between text-xs text-[#43e2d2]">
              <span>Ver Farmacoterapia</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          {/* Module 3: Depresión */}
          <Link
            to="/depresion"
            className="group rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 hover:border-[#c8aa6e] hover:shadow-[0_4px_25px_rgba(200,170,110,0.2)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#202a3d] border border-[#e5c587]/30 flex items-center justify-center text-[#e5c587] group-hover:scale-110 group-hover:border-[#43e2d2] group-hover:text-[#43e2d2] transition-all">
                <span className="material-symbols-outlined text-[28px]">mood</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#e5c587] group-hover:text-white transition-colors">
                Depresión: ISRS, IRSN &amp; mirtazapina
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                Fisiopatología, SERT/NET, farmacocinética, seguridad, interacciones y repaso activo de los tres fármacos de la semana 13.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#4d463a]/20 flex items-center justify-between text-xs text-[#43e2d2]">
              <span>Repasar antidepresivos</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          {/* Module 4: Casos Clínicos */}
          <Link
            to="/casos-clinicos"
            className="group rounded-2xl bg-[#152032] border border-[#4d463a]/40 p-6 hover:border-[#c8aa6e] hover:shadow-[0_4px_25px_rgba(200,170,110,0.2)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#202a3d] border border-[#e5c587]/30 flex items-center justify-center text-[#e5c587] group-hover:scale-110 group-hover:border-[#43e2d2] group-hover:text-[#43e2d2] transition-all">
                <span className="material-symbols-outlined text-[28px]">clinical_notes</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#e5c587] group-hover:text-white transition-colors">
                Casos Clínicos Interactivos
              </h3>
              <p className="text-xs text-[#d0c5b5] leading-relaxed">
                Viñetas clínicas razonadas con preguntas seriadas de opción múltiple, justificaciones fisiopatológicas y bibliografía médica.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#4d463a]/20 flex items-center justify-between text-xs text-[#43e2d2]">
              <span>Resolver Casos</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

        </div>
      </section>

      {/* Quick Metrics / Architecture Highlights */}
      <section className="p-6 rounded-2xl bg-[#040e20] border border-[#4d463a]/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#e5c587]">
            {farmacosData.length}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#d0c5b5] block mt-1">
            Fármacos en Data
          </span>
        </div>
        <div>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#43e2d2]">
            {explainData.length}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#d0c5b5] block mt-1">
            Módulos Fisiopatológicos
          </span>
        </div>
        <div>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#e5c587]">
            100%
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#d0c5b5] block mt-1">
            Carga React SPA
          </span>
        </div>
        <div>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#43e2d2]">
            0 ms
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#d0c5b5] block mt-1">
            Recarga de Página
          </span>
        </div>
      </section>

    </div>
  );
}
