import React, { useState } from 'react';

export default function Visor3D({ defaultCategory = 'todos' }) {
  const [categoriaActiva, setCategoriaActiva] = useState(defaultCategory);
  const [farmacoActivo, setFarmacoActivo] = useState('levodopa-carbidopa');
  const [farmacoSecundario, setFarmacoSecundario] = useState('ninguno');
  const [modoZoom, setModoZoom] = useState('sinapsis'); // 'sinapsis' | 'poro-canal' | 'transporte'

  // Catálogo completo de los 14 fármacos clasificados por patología con sus dianas moleculares exactas
  const catalogoFarmacos = [
    // --- PARKINSON (4) ---
    {
      id: 'levodopa-carbidopa',
      nombre: 'Levodopa / Carbidopa',
      categoria: 'parkinson',
      categoriaLabel: '🧠 Parkinson',
      clase: 'Precursor Dopaminérgico + Inhibidor DDC',
      polaridad: 'agonista',
      dianaPrincipal: 'Transportador LAT1 (SLC7A5) / Enzima DDC / Receptores D2/D1',
      tipoDiana: 'Transportador de Aminoácidos + Enzima Citosólica',
      ubicacionDiana: 'Endotelio capilar BHE y Terminal Presináptica Estriatal',
      mecanismoBiofisico: 'L-DOPA cruza la BHE vía LAT1 y es descarboxilada por la AADC estriatal a dopamina activa. La carbidopa inhibe la AADC periférica.',
      segundoMensajero: 'Activación de Receptores D1 (Gs ➔ ↑ cAMP) y D2 (Gi/o ➔ ↓ cAMP)',
      flujoIonico: 'Modulación de excitabilidad córtico-estriatal',
      impactoMembrana: 'Restaura el tono dopaminérgico fisiológico en la vía directa e indirecta',
      color: '#e5c587',
      targetId: 'lat1-dopa'
    },
    {
      id: 'pramipexol',
      nombre: 'Pramipexol',
      categoria: 'parkinson',
      categoriaLabel: '🧠 Parkinson',
      clase: 'Agonista D3/D2 no ergolínico',
      polaridad: 'agonista',
      dianaPrincipal: 'Receptor Dopaminérgico D3 y D2 postsináptico',
      tipoDiana: 'Receptor Metabotrópico acoplado a proteína Gi/o',
      ubicacionDiana: 'Espinas dendríticas estriatales y Núcleo Accumbens límbico',
      mecanismoBiofisico: 'Estimulación directa de la familia D2 (selectividad D3 > D2) sin depender de la síntesis ni almacenamiento presináptico.',
      segundoMensajero: 'Inhibición de Adenilil Ciclasa (↓ cAMP intracelular) y apertura de canales GIRK (K+)',
      flujoIonico: 'Salida de K+ ➔ Hiperpolarización postsináptica de la vía indirecta',
      impactoMembrana: 'Frena la hiperactividad del núcleo subtalámico y alivia la bradicinesia',
      color: '#c8aa6e',
      targetId: 'receptor-d2-d3'
    },
    {
      id: 'entacapona',
      nombre: 'Entacapona',
      categoria: 'parkinson',
      categoriaLabel: '🧠 Parkinson',
      clase: 'Inhibidor selectivo de COMT periférica',
      polaridad: 'inhibidor-enzima',
      dianaPrincipal: 'Catecol-O-Metiltransferasa (COMT) periférica',
      tipoDiana: 'Enzima citosólica de degradación de catecoles',
      ubicacionDiana: 'Enterocitos gastrointestinales y sangre periférica',
      mecanismoBiofisico: 'Bloquea la O-metilación de levodopa a 3-O-metildopa (3-OMD), suprimiendo la competencia de 3-OMD por el transportador LAT1.',
      segundoMensajero: 'Prolongación del área bajo la curva (AUC) y vida media de levodopa',
      flujoIonico: 'Sin alteración iónica directa',
      impactoMembrana: 'Estabiliza los niveles sinápticos de dopamina reduciendo el wearing-off',
      color: '#e2c384',
      targetId: 'enzima-comt'
    },
    {
      id: 'rasagilina',
      nombre: 'Rasagilina',
      categoria: 'parkinson',
      categoriaLabel: '🧠 Parkinson',
      clase: 'Inhibidor selectivo irreversible de MAO-B',
      polaridad: 'inhibidor-enzima',
      dianaPrincipal: 'Monoaminooxidasa tipo B (MAO-B) mitocondrial estriatal',
      tipoDiana: 'Enzima oxidativa mitocondrial unida a cofactor FAD',
      ubicacionDiana: 'Membrana mitocondrial externa en terminales estriatales y glía',
      mecanismoBiofisico: 'Inhibición covalente de la degradación oxidativa de dopamina en DOPAC sin metabolitos anfetamínicos.',
      segundoMensajero: 'Preservación de depósitos vesiculares de dopamina sináptica',
      flujoIonico: 'Mantenimiento del tono dopaminérgico basal',
      impactoMembrana: 'Potenciación sostenida de la neurotransmisión en los ganglios basales',
      color: '#ffdada',
      targetId: 'enzima-maob'
    },
    {
      id: 'selegilina',
      nombre: 'Selegilina',
      categoria: 'parkinson',
      categoriaLabel: '🧠 Parkinson',
      clase: 'Inhibidor selectivo de MAO-B (metabolitos anfetamínicos)',
      polaridad: 'inhibidor-enzima',
      dianaPrincipal: 'Monoaminooxidasa tipo B (MAO-B) mitocondrial estriatal',
      tipoDiana: 'Enzima oxidativa mitocondrial unida a cofactor FAD',
      ubicacionDiana: 'Membrana mitocondrial externa en cuerpo estriado',
      mecanismoBiofisico: 'Inhibición selectiva de MAO-B; produce L-anfetamina y L-metanfetamina (evitar en la noche por insomnio).',
      segundoMensajero: 'Preservación de dopamina sináptica',
      flujoIonico: 'Mantenimiento del tono dopaminérgico basal',
      impactoMembrana: 'Suaviza fluctuaciones de levodopa; administrar con desayuno y comida',
      color: '#ffb3b5',
      targetId: 'enzima-maob'
    },

    // --- ESQUIZOFRENIA (3) ---
    {
      id: 'haloperidol',
      nombre: 'Haloperidol',
      categoria: 'esquizofrenia',
      categoriaLabel: '🎭 Esquizofrenia',
      clase: 'Antipsicótico Típico de Alta Potencia',
      polaridad: 'antagonista',
      dianaPrincipal: 'Receptor Dopaminérgico D2 postsináptico (bloqueo >75-80%)',
      tipoDiana: 'Receptor Metabotrópico Gi/o',
      ubicacionDiana: 'Vía Mesolímbica (antipsicosis) y Vía Nigroestriatal (EPS)',
      mecanismoBiofisico: 'Antagonista competitivo de altísima afinidad nanomolar (Ki ~1 nM); ocluye el sitio ortostérico impidiendo la unión de dopamina.',
      segundoMensajero: 'Desinhibición de adenilil ciclasa y cierre de canales de K+ postsinápticos',
      flujoIonico: 'Bloqueo del freno Gi/o en corteza y mesolímbico',
      impactoMembrana: 'Suprime alucinaciones/delirios, pero desinhibe la vía indirecta motora (rigidez plástica/distonías)',
      color: '#ff8c93',
      targetId: 'receptor-d2-bloqueo'
    },
    {
      id: 'risperidona',
      nombre: 'Risperidona',
      categoria: 'esquizofrenia',
      categoriaLabel: '🎭 Esquizofrenia',
      clase: 'Antipsicótico Atípico Dual D2 / 5-HT2A',
      polaridad: 'antagonista',
      dianaPrincipal: 'Receptor 5-HT2A (Serotonina) y Receptor D2 (Dopamina)',
      tipoDiana: 'Receptores Metabotrópicos Gq/11 (5-HT2A) y Gi/o (D2)',
      ubicacionDiana: 'Corteza prefrontal (5-HT2A), Núcleo Accumbens e Hipófisis (D2)',
      mecanismoBiofisico: 'El potente antagonismo 5-HT2A desinhibe la liberación de dopamina en el estriado, amortiguando los síntomas extrapiramidales del bloqueo D2.',
      segundoMensajero: 'Disminución de IP3/DAG por bloqueo 5-HT2A + modulación de cAMP por D2',
      flujoIonico: 'Equilibrio de excitabilidad cortical y estriatal',
      impactoMembrana: 'Control de síntomas positivos y negativos con hiperprolactinemia en la hipófisis',
      color: '#ffb3b5',
      targetId: 'receptor-dual-5ht2a-d2'
    },
    {
      id: 'clozapina',
      nombre: 'Clozapina',
      categoria: 'esquizofrenia',
      categoriaLabel: '🎭 Esquizofrenia',
      clase: 'Antipsicótico Atípico Multirreceptor',
      polaridad: 'antagonista',
      dianaPrincipal: 'Receptores 5-HT2A >> D4 > alfa1 > H1 > D2 (fast-off)',
      tipoDiana: 'Perfil Multirreceptor Metabotrópico',
      ubicacionDiana: 'Corteza cerebral, sistema límbico y núcleos talámicos',
      mecanismoBiofisico: 'Disociación ultra-rápida del receptor D2 (<60 s) con ocupación estriatal <60% y afinidad masiva por 5-HT2A y D4.',
      segundoMensajero: 'Modulación polifarmacológica sinérgica de segundos mensajeros',
      flujoIonico: 'Mínima interferencia con canales iónicos estriatales (cero EPS / cero discinesia tardía)',
      impactoMembrana: 'Control superior en esquizofrenia refractaria y prevención suicida',
      color: '#ffdad6',
      targetId: 'receptor-clozapina-multi'
    },

    // --- EPILEPSIA (7) ---
    {
      id: 'fenitoina',
      nombre: 'Fenitoína',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Hidantoína • Bloqueador NaV',
      polaridad: 'bloqueador-canal',
      dianaPrincipal: 'Poro alfa del Canal NaV en conformación inactivada',
      tipoDiana: 'Canal de Sodio dependiente de voltaje (NaV1.1, NaV1.2, NaV1.6)',
      ubicacionDiana: 'Membrana del cono axónico y nódulos de Ranvier de neuronas excitatorias',
      mecanismoBiofisico: 'Bloqueo dependiente de uso y voltaje: se une al poro interno estabilizando la compuerta de inactivación e impidiendo la reapertura.',
      segundoMensajero: 'Independiente de segundos mensajeros (efecto biofísico directo en poro)',
      flujoIonico: 'Bloqueo masivo del influjo rápido de Na+ durante descargas de alta frecuencia',
      impactoMembrana: 'Abolición selectiva de trenes de potenciales de acción paroxísticos (>100 Hz)',
      color: '#43e2d2',
      targetId: 'canal-nav-bloqueado'
    },
    {
      id: 'carbamazepina',
      nombre: 'Carbamazepina',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Iminoestilbeno • Bloqueador NaV',
      polaridad: 'bloqueador-canal',
      dianaPrincipal: 'Canal NaV en conformación inactivada rápida',
      tipoDiana: 'Canal de Sodio dependiente de voltaje',
      ubicacionDiana: 'Corteza cerebral y foco epileptógeno focal',
      mecanismoBiofisico: 'Prolonga el periodo refractario relativo neuronal; su metabolito 10,11-epóxido mantiene la oclusión del canal.',
      segundoMensajero: 'Modulación de receptores de adenosina A1 en uso crónico',
      flujoIonico: 'Supresión de corrientes despolarizantes rápidas de Na+',
      impactoMembrana: 'Previene la propagación de la descarga epiléptica hacia redes contiguas',
      color: '#3bdccd',
      targetId: 'canal-nav-bloqueado'
    },
    {
      id: 'levetiracetam',
      nombre: 'Levetiracetam',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Pirrolidina • Ligando de SV2A',
      polaridad: 'modulador-vesicular',
      dianaPrincipal: 'Proteína de la vesícula sináptica 2A (SV2A)',
      tipoDiana: 'Glucoproteína transmembrana de 12 dominios en vesículas sinápticas',
      ubicacionDiana: 'Vesículas de almacenamiento presináptico glutamatérgico',
      mecanismoBiofisico: 'Se une al dominio luminal de SV2A impidiendo la maduración del complejo SNARE y la exocitosis masiva de glutamato.',
      segundoMensajero: 'Regulación del pool vesicular presináptico disponible para liberación rápida',
      flujoIonico: 'Reducción secundaria del influjo de Ca2+ y vaciamiento de glutamato',
      impactoMembrana: 'Silenciamiento de la hiperexcitabilidad sináptica sostenida',
      color: '#a78bfa',
      targetId: 'vesicula-sv2a'
    },
    {
      id: 'etosuximida',
      nombre: 'Etosuximida',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Succinimida • Bloqueador CaV-T',
      polaridad: 'bloqueador-canal',
      dianaPrincipal: 'Canales de Calcio de bajo umbral tipo T (CaV3.1, CaV3.2)',
      tipoDiana: 'Canal de Calcio dependiente de voltaje de bajo umbral',
      ubicacionDiana: 'Neuronas del núcleo reticular y de relevo tálamo-cortical',
      mecanismoBiofisico: 'Bloqueo selectivo de corrientes despolarizantes T que generan la oscilación marcapasos en salvas a 3 Hz.',
      segundoMensajero: 'Sin intervención de cascadas de fosforilación directa',
      flujoIonico: 'Supresión del influjo oscilatorio de Ca2+ a potenciales de membrana submbrales (-65 mV)',
      impactoMembrana: 'Abolición inmediata del patrón electroencefalográfico de espiga-onda a 3 Hz',
      color: '#818cf8',
      targetId: 'canal-cav-t'
    },
    {
      id: 'diazepam',
      nombre: 'Diazepam',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Benzodiazepina • Modulador Alostérico GABA-A',
      polaridad: 'modulador-alosterico',
      dianaPrincipal: 'Receptor ionotrópico pentamérico GABA-A (interfaz alfa/gamma)',
      tipoDiana: 'Canal de Cloruro activado por ligando',
      ubicacionDiana: 'Membrana postsináptica de interneuronas y somas piramidales',
      mecanismoBiofisico: 'Aumenta la frecuencia de apertura del canal de Cloro en presencia de GABA endógeno.',
      segundoMensajero: 'Potenciación alostérica pura sin apertura directa en ausencia de GABA',
      flujoIonico: 'Influjo masivo de aniones Cloro (Cl-) al interior neuronal',
      impactoMembrana: 'Hiperpolarización inmediata del potencial de membrana (-70 mV ➔ -85 mV)',
      color: '#34d399',
      targetId: 'receptor-gabaa-cloro'
    },
    {
      id: 'lamotrigina',
      nombre: 'Lamotrigina',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Feniltriazina • Bloqueador NaV y Glutamato',
      polaridad: 'bloqueador-canal',
      dianaPrincipal: 'Canales NaV dependientes de uso y Canales CaV presinápticos P/Q y N',
      tipoDiana: 'Canales de Sodio y Calcio dependientes de voltaje',
      ubicacionDiana: 'Terminales axonales corticales e hipocampales',
      mecanismoBiofisico: 'Estabilización de canales NaV en estado inactivado más supresión del influjo de Ca2+ presináptico que dispara la exocitosis de aspartato/glutamato.',
      segundoMensajero: 'Disminución de la liberación de neurotransmisores excitadores',
      flujoIonico: 'Bloqueo dual de corrientes de Na+ y Ca2+',
      impactoMembrana: 'Eleva el umbral de despolarización y aborta la dispersión sincrónica de crisis',
      color: '#fbbf24',
      targetId: 'canal-nav-bloqueado'
    },
    {
      id: 'valproato',
      nombre: 'Ácido Valproico (Divalproex)',
      categoria: 'epilepsia',
      categoriaLabel: '⚡ Epilepsia',
      clase: 'Ácido Carboxílico • Multidiana',
      polaridad: 'multidiana',
      dianaPrincipal: 'Canales NaV + Canales CaV-T + GABA Transaminasa (GABA-T)',
      tipoDiana: 'Canales Iónicos de Na+/Ca2+ + Enzima Citosólica/Mitocondrial GABA-T',
      ubicacionDiana: 'Corteza, Tálamo, Glía y terminales inhibitorias GABAérgicas',
      mecanismoBiofisico: '1) Prolonga la inactivación NaV; 2) Bloquea canales CaV-T talámicos; 3) Inhibe la degradación de GABA por GABA-T y SSADH; 4) Inhibe histona desacetilasas (HDAC).',
      segundoMensajero: 'Incremento sostenido del tono inhibitorio GABAérgico cerebral total',
      flujoIonico: 'Disminución de influjos de Na+/Ca2+ con facilitación de corrientes de Cl-',
      impactoMembrana: 'Amortiguamiento global de la excitabilidad cortical y talámica (amplísimo espectro)',
      color: '#2dd4bf',
      targetId: 'multidiana-vpa'
    }
  ];

  // Filtrado reactivo de fármacos según la pestaña seleccionada
  const farmacosFiltrados = catalogoFarmacos.filter(
    (f) => categoriaActiva === 'todos' || f.categoria === categoriaActiva
  );

  const farmacoActual = catalogoFarmacos.find((f) => f.id === farmacoActivo) || catalogoFarmacos[0];
  const farmacoSec = catalogoFarmacos.find((f) => f.id === farmacoSecundario);

  // Análisis de co-administración
  const evaluarCoAdministracion = () => {
    if (!farmacoSec || farmacoSec.id === 'ninguno') return null;

    if (
      (farmacoActual.id === 'levodopa-carbidopa' && farmacoSec.id === 'haloperidol') ||
      (farmacoActual.id === 'haloperidol' && farmacoSec.id === 'levodopa-carbidopa')
    ) {
      return {
        tipo: 'Antagonismo Farmacodinámico Crítico',
        severidad: 'Riesgo Máximo • Contraindicación Relativa',
        color: '#ffb4ab',
        descripcion: 'El haloperidol bloquea con altísima afinidad el receptor D2 postsináptico, anulando por completo la acción terapéutica de la dopamina formada por levodopa y provocando un congelamiento motor severo con rigidez extrema.'
      };
    }

    if (
      (farmacoActual.id === 'levodopa-carbidopa' && farmacoSec.id === 'entacapona') ||
      (farmacoActual.id === 'entacapona' && farmacoSec.id === 'levodopa-carbidopa')
    ) {
      return {
        tipo: 'Sinergia Farmacocinética Terapéutica',
        severidad: 'Combinación Racional Oficial',
        color: '#43e2d2',
        descripcion: 'La entacapona bloquea la COMT periférica, prolongando en un 40-50% la vida media de la levodopa y evitando las fluctuaciones motoras de fin de dosis (wearing-off).'
      };
    }

    if (
      (farmacoActual.id === 'valproato' && farmacoSec.id === 'lamotrigina') ||
      (farmacoActual.id === 'lamotrigina' && farmacoSec.id === 'valproato')
    ) {
      return {
        tipo: 'Interacción Farmacocinética de Alto Riesgo',
        severidad: 'Alerta Grave • Riesgo de Stevens-Johnson',
        color: '#ffb4ab',
        descripcion: 'El ácido valproico inhibe la glucuronidación de lamotrigina vía UGT1A4, duplicando su vida media a >60 h. Exige reducir la dosis inicial de lamotrigina a la mitad (25 mg en días alternos).'
      };
    }

    if (
      (farmacoActual.id === 'haloperidol' && farmacoSec.id === 'risperidona') ||
      (farmacoActual.id === 'risperidona' && farmacoSec.id === 'haloperidol')
    ) {
      return {
        tipo: 'Doble Bloqueo D2 • Polifarmacia Antipsicótica de Alto Riesgo',
        severidad: 'Riesgo Crítico • Evitar en Ancianos con Demencia (Boxed Warning)',
        color: '#ffb4ab',
        descripcion: 'Doble bloqueo dopaminérgico D2 aditivo y antagonismo alfa-1. Riesgo aumentado de Síndrome Neuroléptico Maligno (SNM), sedación profunda, hipotensión ortostática con caídas, hiperprolactinemia marcada (amenorrea/galactorrea), deterioro cognitivo y mayor mortalidad/ictus en ancianos con demencia.'
      };
    }

    return {
      tipo: 'Co-administración Evaluada',
      severidad: 'Sin antagonismo ortostérico directo reportado en el temario',
      color: '#e5c587',
      descripcion: `Interacción simultánea entre ${farmacoActual.nombre} y ${farmacoSec.nombre}. Monitorear tolerancia clínica general y efectos adversos acumulativos.`
    };
  };

  const interaccionCotejada = evaluarCoAdministracion();

  return (
    <div className="rounded-3xl bg-[#040e20] border border-[#c8aa6e]/40 p-6 sm:p-8 space-y-8 shadow-[0_4px_40px_rgba(4,14,32,0.95)]">
      
      {/* 1. Encabezado del Módulo 3D */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#4d463a]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#43e2d2] font-mono">
              Interacción Molecular 3D • 14 Fármacos Oficiales
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c8aa6e]/15 text-[#e5c587] font-bold border border-[#c8aa6e]/30">
              FacMed Temario Oficial
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#e5c587] mt-1">
            Simulador 3D: Dianas Moleculares &amp; Biofísica Sináptica
          </h2>
          <p className="text-xs text-[#d0c5b5] mt-1 max-w-3xl font-headline">
            Explora la interacción tridimensional fármaco-diana dividida por <strong>Parkinson</strong>, <strong>Esquizofrenia</strong> y <strong>Epilepsias</strong>.
          </p>
        </div>

        {/* Selector de Modo de Visualización */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111c2e] border border-[#4d463a]/40 self-start lg:self-auto">
          <button
            onClick={() => setModoZoom('sinapsis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              modoZoom === 'sinapsis'
                ? 'bg-[#e5c587] text-[#040e20] font-bold shadow-[0_0_12px_rgba(229,197,135,0.4)]'
                : 'text-[#d0c5b5] hover:text-[#e5c587]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            <span>Vista Sináptica</span>
          </button>
          <button
            onClick={() => setModoZoom('poro-canal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              modoZoom === 'poro-canal'
                ? 'bg-[#43e2d2] text-[#040e20] font-bold shadow-[0_0_12px_rgba(67,226,210,0.4)]'
                : 'text-[#d0c5b5] hover:text-[#43e2d2]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">biotech</span>
            <span>Zoom Poro / Diana</span>
          </button>
        </div>
      </div>

      {/* 2. Pestañas de Patología: Parkinson, Esquizofrenia, Epilepsia */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => { setCategoriaActiva('todos'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
              categoriaActiva === 'todos'
                ? 'bg-[#152032] text-[#e5c587] border border-[#c8aa6e] shadow-[0_0_15px_rgba(200,170,110,0.3)]'
                : 'bg-[#081325] text-[#d0c5b5] hover:text-white border border-[#4d463a]/40'
            }`}
          >
            <span>✦ Todos los Fármacos ({catalogoFarmacos.length})</span>
          </button>

          <button
            onClick={() => {
              setCategoriaActiva('parkinson');
              if (farmacoActual.categoria !== 'parkinson') setFarmacoActivo('levodopa-carbidopa');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
              categoriaActiva === 'parkinson'
                ? 'bg-[#00c6b7]/20 text-[#43e2d2] border border-[#43e2d2] shadow-[0_0_15px_rgba(67,226,210,0.3)]'
                : 'bg-[#081325] text-[#d0c5b5] hover:text-[#43e2d2] border border-[#4d463a]/40'
            }`}
          >
            <span>🧠 Parkinson (4)</span>
          </button>

          <button
            onClick={() => {
              setCategoriaActiva('esquizofrenia');
              if (farmacoActual.categoria !== 'esquizofrenia') setFarmacoActivo('haloperidol');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
              categoriaActiva === 'esquizofrenia'
                ? 'bg-[#93000a]/25 text-[#ffb4ab] border border-[#ffb4ab] shadow-[0_0_15px_rgba(255,180,171,0.3)]'
                : 'bg-[#081325] text-[#d0c5b5] hover:text-[#ffb4ab] border border-[#4d463a]/40'
            }`}
          >
            <span>🎭 Esquizofrenia (3)</span>
          </button>

          <button
            onClick={() => {
              setCategoriaActiva('epilepsia');
              if (farmacoActual.categoria !== 'epilepsia') setFarmacoActivo('fenitoina');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
              categoriaActiva === 'epilepsia'
                ? 'bg-[#3b82f6]/20 text-[#93c5fd] border border-[#93c5fd] shadow-[0_0_15px_rgba(147,197,253,0.3)]'
                : 'bg-[#081325] text-[#d0c5b5] hover:text-[#93c5fd] border border-[#4d463a]/40'
            }`}
          >
            <span>⚡ Epilepsias (7)</span>
          </button>
        </div>

        {/* Píldoras de Fármacos Disponibles */}
        <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-[#081325] border border-[#4d463a]/30 items-center">
          <span className="text-[10px] font-mono font-bold text-[#e5c587] uppercase mr-1">
            Fármaco Principal:
          </span>
          {farmacosFiltrados.map((drug) => {
            const isSelected = farmacoActivo === drug.id;
            return (
              <button
                key={drug.id}
                onClick={() => setFarmacoActivo(drug.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#e5c587] text-[#040e20] font-bold shadow-[0_0_15px_rgba(229,197,135,0.4)] scale-105'
                    : 'bg-[#152032] text-[#d0c5b5] hover:text-white border border-[#4d463a]/40 hover:border-[#c8aa6e]'
                }`}
              >
                <span>{drug.nombre}</span>
                <span className="text-[9px] opacity-75 font-mono">({drug.categoriaLabel.split(' ')[1]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Escenario 3D Sináptico y Molecular Dinámico */}
      <div className="relative w-full h-96 sm:h-[450px] rounded-3xl bg-[#081325] border border-[#c8aa6e]/40 overflow-hidden flex items-center justify-center shadow-inner">
        
        {/* Fondo de Cuadrícula de Perspectiva 3D */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#43e2d2_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* RENDERIZADOR VECTORIAL 3D: VISTA DE SINAPSIS O PORO */}
        {modoZoom === 'sinapsis' ? (
          <svg viewBox="0 0 900 480" className="w-full h-full">
            <defs>
              <linearGradient id="axonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#111c2e" />
                <stop offset="100%" stopColor="#1f2d42" />
              </linearGradient>
              <linearGradient id="dendriteGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1f2d42" />
                <stop offset="100%" stopColor="#111c2e" />
              </linearGradient>
              <filter id="ligandGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Terminal Axónica Presináptica */}
            <path
              d="M 160 0 C 160 160, 260 200, 450 200 C 640 200, 740 160, 740 0 Z"
              fill="url(#axonGlow)"
              stroke="#4d463a"
              strokeWidth="2.5"
            />
            <text x="450" y="45" fill="#d0c5b5" fontSize="11" textAnchor="middle" letterSpacing="2.5" opacity="0.6" className="font-mono">
              TERMINAL PRESINÁPTICA (BOTÓN AXÓNICO)
            </text>

            {/* Canal NaV Axónico (Fenitoína / Carbamazepina / Lamotrigina) */}
            <g transform="translate(190, 110)">
              <rect
                width="42"
                height="45"
                rx="6"
                fill={['fenitoina', 'carbamazepina', 'lamotrigina', 'valproato'].includes(farmacoActivo) ? '#43e2d2' : '#152032'}
                stroke="#43e2d2"
                strokeWidth={['fenitoina', 'carbamazepina', 'lamotrigina', 'valproato'].includes(farmacoActivo) ? '3' : '1.5'}
              />
              <text x="21" y="27" fill={['fenitoina', 'carbamazepina', 'lamotrigina', 'valproato'].includes(farmacoActivo) ? '#040e20' : '#43e2d2'} fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono">
                NaV
              </text>
            </g>

            {/* Vesículas de Glutamato / Dopamina con SV2A (Levetiracetam) */}
            <g transform="translate(340, 120)">
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="#081325"
                stroke={farmacoActivo === 'levetiracetam' ? '#a78bfa' : '#4d463a'}
                strokeWidth={farmacoActivo === 'levetiracetam' ? '3' : '1.5'}
              />
              <rect x="15" y="10" width="20" height="10" rx="3" fill={farmacoActivo === 'levetiracetam' ? '#a78bfa' : '#202a3d'} />
              <text x="25" y="38" fill="#d8e2fc" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono">
                SV2A
              </text>
            </g>

            {/* Enzima Mitocondrial MAO-B (Rasagilina / Selegilina) */}
            <g transform="translate(560, 90)">
              <ellipse
                cx="35"
                cy="25"
                rx="35"
                ry="22"
                fill="#081325"
                stroke={farmacoActivo === 'rasagilina' ? '#ffdada' : '#4d463a'}
                strokeWidth={farmacoActivo === 'rasagilina' ? '3' : '1.5'}
              />
              <text x="35" y="29" fill={farmacoActivo === 'rasagilina' ? '#ffdada' : '#d0c5b5'} fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                MAO-B
              </text>
            </g>

            {/* Transportador DAT Presináptico */}
            <g transform="translate(670, 160)">
              <rect width="36" height="24" rx="4" fill="#152032" stroke="#e5c587" strokeWidth="1.5" />
              <text x="18" y="16" fill="#e5c587" fontSize="9" fontWeight="bold" textAnchor="middle">DAT</text>
            </g>

            {/* Hendidura Sináptica Central */}
            <text x="140" y="260" fill="#e5c587" fontSize="12" fontWeight="bold" letterSpacing="1" className="font-mono">
              HENDIDURA SINÁPTICA (~20 nm)
            </text>

            {/* Enzima COMT Extracelular (Entacapona) */}
            <g transform="translate(240, 235)">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="#081325"
                stroke={farmacoActivo === 'entacapona' ? '#e5c587' : '#4d463a'}
                strokeWidth={farmacoActivo === 'entacapona' ? '3' : '1.5'}
              />
              <text x="20" y="24" fill={farmacoActivo === 'entacapona' ? '#e5c587' : '#d0c5b5'} fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono">
                COMT
              </text>
            </g>

            {/* Membrana Postsináptica Dendrítica */}
            <path
              d="M 120 480 C 120 330, 260 290, 450 290 C 640 290, 780 330, 780 480 Z"
              fill="url(#dendriteGlow)"
              stroke="#4d463a"
              strokeWidth="2.5"
            />
            <text x="450" y="440" fill="#d0c5b5" fontSize="11" textAnchor="middle" letterSpacing="2.5" opacity="0.6" className="font-mono">
              MEMBRANA POSTSINÁPTICA SOMATO-DENDRÍTICA
            </text>

            {/* Receptores Dopaminérgicos D2 / D3 (Haloperidol, Pramipexol, Levodopa) */}
            <g transform="translate(360, 275)">
              <rect
                width="50"
                height="32"
                rx="6"
                fill={['pramipexol', 'haloperidol', 'risperidona', 'clozapina', 'levodopa-carbidopa'].includes(farmacoActivo) ? farmacoActual.color : '#152032'}
                stroke={farmacoActual.color}
                strokeWidth={['pramipexol', 'haloperidol', 'risperidona', 'clozapina', 'levodopa-carbidopa'].includes(farmacoActivo) ? '3' : '1.5'}
              />
              <text x="25" y="20" fill={['pramipexol', 'haloperidol', 'risperidona', 'clozapina', 'levodopa-carbidopa'].includes(farmacoActivo) ? '#040e20' : '#e5c587'} fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono">
                D2 / D3
              </text>
            </g>

            {/* Receptor 5-HT2A Cortical (Risperidona / Clozapina) */}
            <g transform="translate(440, 275)">
              <rect
                width="52"
                height="32"
                rx="6"
                fill={['risperidona', 'clozapina'].includes(farmacoActivo) ? '#ff8c93' : '#152032'}
                stroke="#ff8c93"
                strokeWidth={['risperidona', 'clozapina'].includes(farmacoActivo) ? '3' : '1.5'}
              />
              <text x="26" y="20" fill={['risperidona', 'clozapina'].includes(farmacoActivo) ? '#040e20' : '#ff8c93'} fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                5-HT2A
              </text>
            </g>

            {/* Receptor GABA-A Postsináptico de Cl- (Diazepam / Valproato) */}
            <g transform="translate(540, 280)">
              <rect
                width="55"
                height="34"
                rx="7"
                fill={['diazepam', 'valproato'].includes(farmacoActivo) ? '#34d399' : '#152032'}
                stroke="#34d399"
                strokeWidth={['diazepam', 'valproato'].includes(farmacoActivo) ? '3' : '1.5'}
              />
              <text x="27.5" y="21" fill={['diazepam', 'valproato'].includes(farmacoActivo) ? '#040e20' : '#34d399'} fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                GABA-A
              </text>
            </g>

            {/* Canal de Calcio Talámico CaV-T (Etosuximida) */}
            <g transform="translate(630, 290)">
              <rect
                width="50"
                height="32"
                rx="6"
                fill={['etosuximida', 'valproato'].includes(farmacoActivo) ? '#818cf8' : '#152032'}
                stroke="#818cf8"
                strokeWidth={['etosuximida', 'valproato'].includes(farmacoActivo) ? '3' : '1.5'}
              />
              <text x="25" y="20" fill={['etosuximida', 'valproato'].includes(farmacoActivo) ? '#040e20' : '#818cf8'} fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                CaV-T
              </text>
            </g>

            {/* Molécula del Fármaco Activo Interactuando en 3D (Animación de Enlace) */}
            <g transform="translate(450, 230)" filter="url(#ligandGlow)">
              <circle cx="0" cy="0" r="14" fill={farmacoActual.color} stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" fill="#040e20" fontSize="9" fontWeight="extrabold" textAnchor="middle" className="font-mono">
                LIG
              </text>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="450 210; 450 240; 450 210"
                dur="3s"
                repeatCount="indefinite"
              />
            </g>

          </svg>
        ) : (
          /* VISTA ZOOM ULTRA-DETALLADA DEL PORO / BOLSILLO DE UNIÓN */
          <div className="w-full h-full p-8 flex flex-col justify-between text-xs space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#4d463a]/40">
              <span className="text-[#e5c587] font-bold text-sm uppercase">
                🔬 Zoom Biofísico: Sitio Ortostérico &amp; Modulación Conformacional
              </span>
              <span className="px-2.5 py-1 rounded bg-[#111c2e] text-[#43e2d2] border border-[#43e2d2]/40 font-bold">
                {farmacoActual.tipoDiana}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              <div className="p-4 rounded-2xl bg-[#040e20] border border-[#c8aa6e]/30 space-y-2">
                <span className="text-[10px] text-[#e5c587] font-bold uppercase block">1. Conformación Diana</span>
                <p className="text-white text-xs">{farmacoActual.dianaPrincipal}</p>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">{farmacoActual.ubicacionDiana}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#152032] border border-[#43e2d2]/40 space-y-2 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed flex items-center justify-center font-bold text-sm" style={{ borderColor: farmacoActual.color, color: farmacoActual.color }}>
                  POSE 3D
                </div>
                <span className="text-[#43e2d2] font-bold block">{farmacoActual.polaridad.toUpperCase()}</span>
                <p className="text-[11px] text-[#d8e2fc]">{farmacoActual.segundoMensajero}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#040e20] border border-[#ffb4ab]/30 space-y-2">
                <span className="text-[10px] text-[#ffb4ab] font-bold uppercase block">3. Cambio Transduccional</span>
                <p className="text-[#ffdad6] text-xs font-bold">{farmacoActual.flujoIonico}</p>
                <p className="text-[#d0c5b5] text-[11px] leading-relaxed">{farmacoActual.impactoMembrana}</p>
              </div>

            </div>

            <div className="pt-2 text-center text-[11px] text-[#d0c5b5]/70">
              Correlación farmacodinámica basada en Goodman &amp; Gilman 14.ª ed. y Katzung 16.ª ed.
            </div>
          </div>
        )}

        {/* HUD Flotante de Telemetría Molecular */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-lg p-4 rounded-2xl bg-[#040e20]/90 backdrop-blur-md border border-[#c8aa6e]/40 text-xs space-y-2 shadow-2xl">
          <div className="flex items-center justify-between gap-3 pb-1 border-b border-[#4d463a]/30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: farmacoActual.color }}></span>
              <span className="font-display font-bold text-sm sm:text-base text-white">{farmacoActual.nombre}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111c2e] text-[#e5c587] border border-[#c8aa6e]/30 font-bold">
              {farmacoActual.polaridad.toUpperCase()}
            </span>
          </div>

          <p className="text-[#d8e2fc] text-xs leading-relaxed">
            <strong className="text-[#e5c587]">Diana: </strong>
            <span className="font-mono">{farmacoActual.dianaPrincipal}</span>
          </p>

          <p className="text-[#d0c5b5] text-[11px] leading-snug">
            {farmacoActual.mecanismoBiofisico}
          </p>
        </div>

      </div>

      {/* 4. Panel de Telemetría Biofísica Comparativa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-5 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#43e2d2]">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider">
              Tipo de Diana &amp; Ubicación
            </h4>
          </div>
          <p className="text-xs text-[#d8e2fc] font-bold font-mono">{farmacoActual.tipoDiana}</p>
          <p className="text-xs text-[#d0c5b5]">{farmacoActual.ubicacionDiana}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#e5c587]">
            <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider">
              Conductancia / Flujo Iónico
            </h4>
          </div>
          <p className="text-xs text-[#d8e2fc] font-bold font-mono">{farmacoActual.flujoIonico}</p>
          <p className="text-xs text-[#d0c5b5]">{farmacoActual.segundoMensajero}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#152032] border border-[#4d463a]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#ffb4ab]">
            <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider">
              Impacto en Redes Neuronales
            </h4>
          </div>
          <p className="text-xs text-[#ffdad6] leading-relaxed">{farmacoActual.impactoMembrana}</p>
        </div>

      </div>

      {/* 5. Simulador de Co-administración Cruzada */}
      <div className="p-6 rounded-2xl bg-[#081325] border border-[#c8aa6e]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#4d463a]/30">
          <div>
            <h3 className="font-display text-lg font-bold text-[#e5c587]">
              Simulador de Interacción Cruzada &amp; Co-administración
            </h3>
            <p className="text-xs text-[#d0c5b5]">
              Elige un segundo medicamento para evaluar colisiones farmacodinámicas o sinergias terapéuticas en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#d0c5b5] font-mono">Fármaco B:</span>
            <select
              value={farmacoSecundario}
              onChange={(e) => setFarmacoSecundario(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#152032] border border-[#4d463a]/40 text-[#d8e2fc] text-xs font-semibold focus:border-[#43e2d2] focus:outline-none"
            >
              <option value="ninguno">-- Seleccionar segundo fármaco --</option>
              {catalogoFarmacos
                .filter((d) => d.id !== farmacoActivo)
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre} ({d.categoriaLabel})
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Resultado del Cotejo */}
        {interaccionCotejada ? (
          <div className="p-4 rounded-xl bg-[#152032] border border-[#4d463a]/30 space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm" style={{ color: interaccionCotejada.color }}>
                {interaccionCotejada.tipo}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#081325] border border-[#4d463a]/30 text-[#d0c5b5]">
                {interaccionCotejada.severidad}
              </span>
            </div>
            <p className="text-[#d8e2fc] leading-relaxed">
              {interaccionCotejada.descripcion}
            </p>
          </div>
        ) : (
          <p className="text-xs text-[#d0c5b5]/60 italic text-center py-2">
            Selecciona un segundo medicamento en el desplegable para correr la simulación cruzada.
          </p>
        )}
      </div>

    </div>
  );
}
