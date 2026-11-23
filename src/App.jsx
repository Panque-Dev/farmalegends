import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Dopamina from './pages/Dopamina';
import Epilepsia from './pages/Epilepsia';
import Depresion from './pages/Depresion';
import Recetario from './pages/Recetario';
import CasosClinicos from './pages/CasosClinicos';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#081325] text-[#d8e2fc] flex flex-col font-body antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/dopamina" element={<Dopamina />} />
            <Route path="/epilepsia" element={<Epilepsia />} />
            <Route path="/depresion" element={<Depresion />} />
            <Route path="/recetario" element={<Recetario />} />
            <Route path="/casos-clinicos" element={<CasosClinicos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
