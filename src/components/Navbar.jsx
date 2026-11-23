import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { name: 'Aula Magna', path: '/' },
    { name: 'Dopamina & Psicosis', path: '/dopamina' },
    { name: 'Epilepsia & Canales', path: '/epilepsia' },
    { name: 'Depresión', path: '/depresion' },
    { name: 'Dosis & Recetario', path: '/recetario' },
    { name: 'Casos Clínicos', path: '/casos-clinicos' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#040e20]/90 backdrop-blur-md border-b border-[#4d463a]/40 shadow-[0_4px_20px_rgba(4,14,32,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & FacMed Tag */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#152032] flex items-center justify-center border border-[#e5c587]/40 shadow-[0_0_15px_rgba(200,170,110,0.25)] group-hover:border-[#43e2d2] group-hover:shadow-[0_0_20px_rgba(67,226,210,0.35)] transition-all">
              <span className="material-symbols-outlined text-[#e5c587] group-hover:text-[#43e2d2] transition-colors text-[24px]">
                local_pharmacy
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold tracking-wider text-sm sm:text-base text-[#e5c587] uppercase leading-tight group-hover:text-white transition-colors">
                  Academia Arcana
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#43e2d2]/15 text-[#43e2d2] border border-[#43e2d2]/30 font-bold tracking-widest uppercase">
                  FacMed
                </span>
              </div>
              <span className="text-[11px] text-[#d0c5b5]/70 tracking-wide font-headline block">
                Cátedra Digital de Farmacología Médica
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#152032] text-[#e5c587] border border-[#c8aa6e]/60 shadow-[0_0_12px_rgba(200,170,110,0.25)]'
                      : 'text-[#d0c5b5] hover:text-[#43e2d2] hover:bg-[#152032]/50 border border-transparent'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Quick Action / Status Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111c2e] border border-[#4d463a]/40 text-xs text-[#d0c5b5]">
              <span className="w-2 h-2 rounded-full bg-[#43e2d2] animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#e5c587]">panquecito reading</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
