import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#040e20] border-t border-[#4d463a]/30 text-[#d0c5b5] pt-10 pb-8 mt-auto relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Row: Brand & Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#4d463a]/20">
          
          {/* Brand & Emblem */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#152032] flex items-center justify-center border border-[#e5c587]/40 shadow-[0_0_15px_rgba(200,170,110,0.25)] shrink-0">
              <span className="material-symbols-outlined text-[#e5c587] text-[28px]">local_pharmacy</span>
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-display text-[#e5c587] font-bold tracking-wider uppercase text-base sm:text-lg leading-tight">
                  Academia Arcana
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#43e2d2]/15 text-[#43e2d2] border border-[#43e2d2]/30 font-bold tracking-widest uppercase">
                  FacMed
                </span>
              </div>
              <p className="text-xs text-[#d0c5b5]/70 mt-0.5 font-headline">
                Plataforma de Farmacología Médica y Simulación Dinámica
              </p>
            </div>
          </div>

          {/* Social Media Links with Vector SVGs */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#e5c587]">
              Comunidad & Redes Académicas
            </span>
            <div className="flex items-center gap-2">
              
              {/* Instagram */}
              <a
                href="https://instagram.com/jovan.m3d"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="Instagram: @jovan.m3d"
                aria-label="Instagram de jovan.m3d"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@jovan.m3d"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="TikTok: @jovan.m3d"
                aria-label="TikTok de jovan.m3d"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="Canal Clínico y Cátedras en YouTube"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="X / Twitter de Divulgación Médica"
                aria-label="X Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="Perfil Profesional y Académico"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Middle Row: Navigation Links & Sources */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-[#d0c5b5]/80">
          
          <div className="md:col-span-6 space-y-2">
            <span className="font-semibold uppercase tracking-wider text-[#e5c587] block">
              Módulos del Aula Digital
            </span>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
              <Link to="/" className="hover:text-[#43e2d2] transition-colors flex items-center gap-1.5">
                <span className="text-[#e5c587]">✦</span> Aula Magna
              </Link>
              <Link to="/dopamina" className="hover:text-[#43e2d2] transition-colors flex items-center gap-1.5">
                <span className="text-[#43e2d2]">⚖</span> Dopamina (Parkinson / Psicosis)
              </Link>
              <Link to="/epilepsia" className="hover:text-[#43e2d2] transition-colors flex items-center gap-1.5">
                <span className="text-[#e5c587]">⚡</span> Epilepsia & Canales Iónicos
              </Link>
              <Link to="/recetario" className="hover:text-[#43e2d2] transition-colors flex items-center gap-1.5">
                <span className="text-[#43e2d2]">💊</span> Dosis & Recetario Clínico
              </Link>
              <Link to="/casos-clinicos" className="hover:text-[#43e2d2] transition-colors flex items-center gap-1.5">
                <span className="text-[#e5c587]">📋</span> Casos Clínicos & Evaluación
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 space-y-2">
            <span className="font-semibold uppercase tracking-wider text-[#e5c587] block">
              Aviso Académico &amp; Fuentes Clínicas
            </span>
            <p className="leading-relaxed text-[11px] text-[#d0c5b5]/70">
              Contenido de apoyo docente para estudiantes y profesionales de las ciencias médicas. Basado en el programa oficial de Farmacología Médica (FacMed UNAM), Katzung 16.ª ed., Goodman &amp; Gilman 14.ª ed., y guías de práctica clínica internacionales. No reemplaza el juicio clínico individual.
            </p>
          </div>

        </div>

        {/* Bottom Row: Rights & jovan.m3d Author Badge */}
        <div className="pt-6 border-t border-[#4d463a]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2 text-[#d0c5b5]/60 text-center sm:text-left">
            <span>© {currentYear} Academia Arcana. Todos los derechos reservados.</span>
          </div>

          {/* Author Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#d0c5b5]/70 uppercase tracking-wider">
              Dirección Académica &amp; Diseño:
            </span>
            <a
              href="https://instagram.com/jovan.m3d"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-badge-author"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>jovan.m3d</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
