
  (function initHextechApothecary() {
    // Database of pharmacological entries
    const DRUG_DB = {
      epinefrina: {
        name: "Epinefrina (Adrenalina)",
        formula: "C₉H₁₃NO₃ • PM: 183.2 g/mol",
        code: "ATC C01CA24",
        classTitle: "Catecolamina Simpaticomimética",
        badge: "ALTO IMPACTO",
        alertBg: "bg-error-container text-on-error-container",
        icon: "bolt",
        altImg: "Hero shot of epinephrine adrenal crystal reacting inside a hextech glass beaker, cyan spark emissions, fantasy high-stakes pharmacology laboratory equipment.",
        adme: {
          bio: "100% (Infusión IV)",
          t12: "2 - 3 Minutos",
          meta: "MAO / COMT Tisular",
          elim: "Renal (Metabolitos)"
        },
        receptors: [
          { name: "Receptor Alfa-1 (α1)", effect: "Vasoconstricción Periférica", percent: "85%", color: "bg-secondary" },
          { name: "Receptor Beta-1 (β1)", effect: "Inotropismo & Cronotropismo (+)", percent: "95%", color: "bg-primary" },
          { name: "Receptor Beta-2 (β2)", effect: "Broncodilatación Muscular Lisa", percent: "70%", color: "bg-tertiary" }
        ],
        warnings: "Riesgo crítico de arritmias ventriculares, taquicardia severa e isquemia miocárdica en cardiopatía subyacente. Monitoreo ECG continuo obligatorio en infusión continua.",
        calcDose: (w) => `${(Math.min(w * 0.01, 0.5)).toFixed(2)} mg IM (1:1,000)`,
        route: "Intramuscular Vasto Ext."
      },
      digoxina: {
        name: "Digoxina Alquímica",
        formula: "C₄₁H₆₄O₁₄ • PM: 780.9 g/mol",
        code: "ATC C01AA05",
        classTitle: "Glucósido Cardiotónico",
        badge: "MARGEN ESTRECHO",
        alertBg: "bg-error-container text-on-error-container",
        icon: "monitor_heart",
        altImg: "An ornate dark crystal flask containing a viscous golden-amber cardiotonic essence with tiny clockwork gears suspended in the solution, fantasy medical alchemy artifact.",
        adme: {
          bio: "70 - 80% (Vía Oral)",
          t12: "36 - 48 Horas",
          meta: "Hepático Mínimo (16%)",
          elim: "Filtración Glomerular 80%"
        },
        receptors: [
          { name: "Bomba Na+/K+ ATPasa", effect: "Inhibición Sarcolémica", percent: "95%", color: "bg-primary" },
          { name: "Tono Vagal Central", effect: "Disminuye Conducción AV", percent: "88%", color: "bg-secondary" },
          { name: "Acúmulo Ca²⁺ Intracelular", effect: "Inotropismo Positivo", percent: "80%", color: "bg-tertiary" }
        ],
        warnings: "Intoxicación digitálica facilitada por hipopotasemia. Monitorizar niveles séricos objetivo (0.5 - 0.9 ng/mL). Antídoto: Fragmentos Fab específicos.",
        calcDose: (w) => `${(w * 0.015).toFixed(2)} mg (Dosis Impregnación)`,
        route: "Oral o IV Lento (> 5 min)"
      },
      propofol: {
        name: "Propofol Emulsión",
        formula: "C₁₂H₁₈O • PM: 178.27 g/mol",
        code: "ATC N01AX10",
        classTitle: "Hipnótico de Acción Ultracorta",
        badge: "SEDACIÓN UCI",
        alertBg: "bg-surface-container-highest text-secondary",
        icon: "bedtime",
        altImg: "Milky white alchemical infusion solution inside an ethereal glass syringe surrounded by hextech filigree runes, hypnotic soft cyan mist aura.",
        adme: {
          bio: "100% (Vía Intravenosa)",
          t12: "40 - 60 Minutos (Fase β)",
          meta: "Hepático Rápido (Glucurónido)",
          elim: "Renal 88% / Fecal"
        },
        receptors: [
          { name: "Canal GABA-A (Subunidad β)", effect: "Apertura Canal Cloruro", percent: "98%", color: "bg-secondary" },
          { name: "Receptor NMDA", effect: "Inhibición Alostérica", percent: "45%", color: "bg-primary" },
          { name: "Tono Simpático", effect: "Hipotensión Vasodilatadora", percent: "65%", color: "bg-tertiary" }
        ],
        warnings: "Síndrome de Infusión de Propofol (PRIS) en dosis prolongadas (>4-5 mg/kg/h). Puede causar depresión respiratoria profunda y bradicardia severa.",
        calcDose: (w) => `${(w * 2.0).toFixed(0)} - ${(w * 2.5).toFixed(0)} mg (Inducción)`,
        route: "Intravenoso Directo Titulado"
      },
      metformina: {
        name: "Metformina Rúnica",
        formula: "C₄H₁₁N₅ • PM: 129.16 g/mol",
        code: "ATC A10BA02",
        classTitle: "Biguanida Sensibilizadora",
        badge: "1ª LÍNEA DIABETES",
        alertBg: "bg-surface-container-highest text-primary",
        icon: "metabolism",
        altImg: "Geometric crystalline tablet engraved with alchemical glycemic symbols, surrounded by glowing golden hextech circuitry on dark blue marble.",
        adme: {
          bio: "50 - 60% (Digestivo)",
          t12: "6.5 Horas",
          meta: "Sin metabolismo hepático",
          elim: "Renal Tubular Activo 100%"
        },
        receptors: [
          { name: "Quinasa AMPK Hepática", effect: "Supresión Gluconeogénesis", percent: "90%", color: "bg-primary" },
          { name: "Transportador GLUT-4", effect: "Captación Muscular Glucosa", percent: "75%", color: "bg-secondary" },
          { name: "Complejo I Mitocondrial", effect: "Modulación Cadena Respiratoria", percent: "60%", color: "bg-tertiary" }
        ],
        warnings: "Contraindicado en TFG < 30 mL/min/1.73m² por alto riesgo de acidosis láctica letal. Suspender 48h antes de estudios con contraste radiológico yodado.",
        calcDose: (w) => `850 - 1,000 mg c/12h con comidas`,
        route: "Vía Oral Postpandrial"
      },
      ceftriaxona: {
        name: "Ceftriaxona Disódica",
        formula: "C₁₈H₁₈N₈O₇S₃ • PM: 554.58 g/mol",
        code: "ATC J01DD04",
        classTitle: "Cefalosporina 3ª Generación",
        badge: "AMPLIO ESPECTRO",
        alertBg: "bg-surface-container-highest text-secondary",
        icon: "coronavirus",
        altImg: "A crystal phial with luminescent teal antimicrobial powder, arcane runic wards inscribed on the glass to destroy bacterial membranes, fantasy medicine.",
        adme: {
          bio: "100% (IV) / 100% (IM con Lidocaína)",
          t12: "8 Horas (Larga)",
          meta: "No metabolizado (Resistente β-lactamasas)",
          elim: "Renal 60% / Biliar 40%"
        },
        receptors: [
          { name: "PBP-2 y PBP-3 Bacterianas", effect: "Inhibición Transpeptidación", percent: "96%", color: "bg-secondary" },
          { name: "Barrera Hematoencefálica", effect: "Difusión Líquido Cefalorraquídeo", percent: "82%", color: "bg-primary" },
          { name: "Pseudolitiasis Biliar", effect: "Precipitación Calcio Biliar", percent: "30%", color: "bg-tertiary" }
        ],
        warnings: "Contraindicado en neonatos hiperbilirrubinémicos y nunca coadministrar en la misma vía con soluciones que contengan calcio (Ringer Lactato).",
        calcDose: (w) => `${w < 40 ? (w * 50).toFixed(0) + " - " + (w * 100).toFixed(0) + " mg/día" : "2,000 mg c/24h"}`,
        route: "Intravenoso Infusión 30 min"
      },
      warfarina: {
        name: "Warfarina Sódica",
        formula: "C₁₉H₁₆O₄ • PM: 308.33 g/mol",
        code: "ATC B01AA03",
        classTitle: "Antagonista Vitamina K",
        badge: "ALTO RIESGO SANGRADO",
        alertBg: "bg-error-container text-on-error-container",
        icon: "water_drop",
        altImg: "Blood ruby red elixir in an apothecary dropper bottle with brass calibration rings, preventing arcane thrombosis, deep navy backdrop with gold sparkles.",
        adme: {
          bio: "> 95% (Oral Completa)",
          t12: "36 - 42 Horas",
          meta: "Hepático CYP2C9 (S) / CYP3A4 (R)",
          elim: "Renal como metabolitos inactivos"
        },
        receptors: [
          { name: "Enzima VKORC1", effect: "Bloqueo Epóxido Reductasa", percent: "94%", color: "bg-primary" },
          { name: "Factores II, VII, IX, X", effect: "Falta de Carboxilación Glutamato", percent: "92%", color: "bg-tertiary" },
          { name: "Proteínas C y S", effect: "Efecto Protrombótico Inicial", percent: "70%", color: "bg-secondary" }
        ],
        warnings: "Riesgo de hemorragia mortal. Teratogénico absoluto en 1er trimestre del embarazo (Síndrome warfarínico). Ajustar rigurosamente según INR objetivo (2.0 - 3.0).",
        calcDose: (w) => `2.5 - 5.0 mg/día (Titular según INR)`,
        route: "Vía Oral (Misma hora nocturna)"
      },
      omeprazol: {
        name: "Omeprazol Magnésico",
        formula: "C₁₇H₁₉N₃O₃S • PM: 345.42 g/mol",
        code: "ATC A02BC01",
        classTitle: "Inhibidor Bomba Protones",
        badge: "PROFÁRMACO GASTRORRESISTENTE",
        alertBg: "bg-surface-container-highest text-primary",
        icon: "health_and_safety",
        altImg: "An ornate gastric barrier amulet containing a neutralising golden fluid, protected with gold filigree casing against digestive acid corrosion.",
        adme: {
          bio: "40% (Oral) / Aumenta a 65% crónico",
          t12: "0.5 - 1.0 Hora (Efecto >24h)",
          meta: "Hepático CYP2C19 & CYP3A4",
          elim: "Renal 80% / Fecal 20%"
        },
        receptors: [
          { name: "H+/K+ ATPasa Célula Parietal", effect: "Enlace Disulfuro Irreversible", percent: "95%", color: "bg-primary" },
          { name: "Secreción Ácida Basal y Estimulada", effect: "Supresión de H+ > 90%", percent: "92%", color: "bg-secondary" },
          { name: "Afinidad CYP2C19", effect: "Interacción Clopidogrel", percent: "60%", color: "bg-tertiary" }
        ],
        warnings: "El uso crónico prolongado puede asociarse a hipomagnesemia, déficit de vitamina B12 y mayor susceptibilidad a infección por Clostridioides difficile.",
        calcDose: (w) => `20 - 40 mg cada 24h`,
        route: "Oral (30 min antes desayuno) / IV"
      },
      salbutamol: {
        name: "Salbutamol Sulfato",
        formula: "C₁₃H₂₁NO₃ • PM: 239.31 g/mol",
        code: "ATC R03AC02",
        classTitle: "Agonista β2 Adrenérgico Selectivo",
        badge: "BRONCODILATADOR SABA",
        alertBg: "bg-surface-container-highest text-secondary",
        icon: "air",
        altImg: "Brass pneumatic inhaler cartridge glowing with luminous cyan aero-vapors, League of Legends Zaunite apothecary respiratory technology.",
        adme: {
          bio: "Depósito Pulmonar 10-20% (Inhalado)",
          t12: "4 - 6 Horas",
          meta: "Metabolismo Sulfoconjugado",
          elim: "Renal 80% en 24 horas"
        },
        receptors: [
          { name: "Receptor Beta-2 Bronquial", effect: "Aumento de AMPc Intracelular", percent: "92%", color: "bg-secondary" },
          { name: "Receptor Beta-1 Miocárdico", effect: "Taquicardia Refleja o Directa", percent: "35%", color: "bg-primary" },
          { name: "Bomba Na+/K+ Muscular", effect: "Entrada de K+ (Hipopotasemia)", percent: "55%", color: "bg-tertiary" }
        ],
        warnings: "Temblor distal fino dependiente de dosis. Dosis elevadas continuadas inducen hipopotasemia transitoria y prolongación sutil del intervalo QTc.",
        calcDose: (w) => `100 - 200 µg (1-2 puffs) SOS`,
        route: "Inhalatoria con Cámara Espaciadora"
      },
      fenitoina: {
        sourceOnly: true,
        name: "Fenitoína",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Hidantoína • bloqueador de canales Naᵥ",
        badge: "PRECAUCIÓN · EMBARAZO",
        alertBg: "bg-primary-container text-on-primary-container",
        icon: "bolt",
        altImg: "Ficha de estudio de fenitoína, hidantoína que bloquea canales de sodio voltaje dependientes.",
        adme: { bio: "No especificado en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Canal Naᵥ (poro α)", effect: "Estabiliza el estado inactivado; limita descargas de alta frecuencia", color: "bg-secondary" }],
        warnings: "Las lecturas la asocian con efectos teratógenos sin cuantificar el riesgo individual. Contraindicaciones específicas y lactancia: no especificadas en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      carbamazepina: {
        sourceOnly: true,
        name: "Carbamazepina",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Iminoestilbeno • bloqueador de canales Naᵥ",
        badge: "PRECAUCIÓN · EMBARAZO",
        alertBg: "bg-primary-container text-on-primary-container",
        icon: "bolt",
        altImg: "Ficha de estudio de carbamazepina, bloqueador de canales de sodio voltaje dependientes.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Canal Naᵥ (poro α)", effect: "Prolonga el periodo refractario relativo", color: "bg-secondary" }],
        warnings: "Las lecturas la asocian con efectos teratógenos sin cuantificar el riesgo individual. Puede agravar ausencias y crisis mioclónicas; selección con precaución en epilepsias generalizadas. Otras contraindicaciones y lactancia: no especificadas en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      levetiracetam: {
        sourceOnly: true,
        name: "Levetiracetam",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Pirrolidina • ligando de SV2A",
        badge: "MENOR RIESGO RELATIVO*",
        alertBg: "bg-surface-container-highest text-secondary",
        icon: "neurology",
        altImg: "Ficha de estudio de levetiracetam, fármaco anticrisis dirigido a la proteína vesicular SV2A.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Proteína vesicular SV2A", effect: "Blanco farmacológico indicado en el programa", color: "bg-secondary" }],
        warnings: "La banda de embarazo sigue la clasificación didáctica compartida y no es categoría FDA. Riesgo gestacional individual, contraindicaciones específicas y lactancia: no especificados en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      etosuximida: {
        sourceOnly: true,
        name: "Etosuximida",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Succinimida • bloqueador de canales Caᵥ tipo T",
        badge: "PRECAUCIÓN · EVIDENCIA LIMITADA*",
        alertBg: "bg-primary-container text-on-primary-container",
        icon: "neurology",
        altImg: "Ficha de estudio de etosuximida, succinimida que inhibe corrientes de calcio tipo T talámicas.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Canal Caᵥ tipo T talámico", effect: "Inhibe corrientes de bajo umbral", color: "bg-secondary" }],
        warnings: "Indicada en las lecturas para crisis de ausencia típicas; no es eficaz para crisis focales ni tónico-clónicas generalizadas. Riesgo gestacional individual, contraindicaciones específicas y lactancia: no especificados en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      diazepam: {
        sourceOnly: true,
        name: "Diazepam",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Benzodiazepina • modulador alostérico GABA-A",
        badge: "PRECAUCIÓN · EMBARAZO*",
        alertBg: "bg-primary-container text-on-primary-container",
        icon: "neurology",
        altImg: "Ficha de estudio de diazepam, benzodiazepina moduladora alostérica positiva del receptor GABA-A.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Receptor GABA-A", effect: "Modulación alostérica positiva", color: "bg-secondary" }],
        warnings: "Las lecturas describen sedación, tolerancia y abstinencia. La precaución especial en tercer trimestre procede del material compartido; riesgo por trimestre, lactancia y otras contraindicaciones: no especificados en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      lamotrigina: {
        sourceOnly: true,
        name: "Lamotrigina",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Feniltriazina • modulador de canales Naᵥ",
        badge: "MENOR RIESGO RELATIVO*",
        alertBg: "bg-surface-container-highest text-secondary",
        icon: "neurology",
        altImg: "Ficha de estudio de lamotrigina, moduladora de canales de sodio y conductancias de calcio presinápticas.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Canales Naᵥ y Caᵥ presinápticos", effect: "Reduce liberación de glutamato", color: "bg-secondary" }],
        warnings: "El capítulo la incluye entre fármacos asociados con efectos teratógenos sin cuantificar el riesgo individual. La banda de embarazo sigue la clasificación didáctica compartida. Contraindicaciones específicas y lactancia: no especificadas en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      valproato: {
        sourceOnly: true,
        name: "Valproato / Ácido valproico",
        formula: "Dato fisicoquímico no consignado en las lecturas",
        code: "Anticrisis · epilepsia",
        classTitle: "Ácido carboxílico • fármaco multimodal",
        badge: "RIESGO ALTO · EMBARAZO",
        alertBg: "bg-error-container text-on-error-container",
        icon: "warning",
        altImg: "Ficha de estudio de valproato, fármaco anticrisis multimodal asociado con riesgo teratógeno humano.",
        adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas consultadas", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "Blancos multimodales", effect: "Canales Naᵥ y Caᵥ-T; vías de GABA", color: "bg-secondary" }],
        warnings: "Teratógeno humano; las lecturas informan 6–9% de riesgo absoluto de malformaciones mayores con exposición en el primer trimestre. El material compartido lo clasifica en banda de riesgo alto. Lactancia y otras contraindicaciones: no especificadas en las lecturas consultadas.",
        doseAvailable: false,
        calcDose: () => "No especificada en las lecturas consultadas",
        route: "Consultar indicación y prescripción individual"
      },
      levodopa_carbidopa: {
        sourceOnly: true, name: "Levodopa-carbidopa", formula: "No especificado en las lecturas", code: "Antiparkinsoniano · Semana 12",
        classTitle: "Precursor de dopamina + inhibidor periférico de dopa-descarboxilasa", badge: "PRECURSOR / COADYUVANTE", alertBg: "bg-surface-container-highest text-secondary", icon: "neurology",
        altImg: "Ficha educativa de levodopa-carbidopa, precursor de dopamina e inhibidor de dopa-descarboxilasa periférica.",
        adme: { bio: "Levodopa oral; pico 1–2 h", t12: "1–3 h (levodopa plasmática)", meta: "Carbidopa reduce descarboxilación periférica", elim: "No especificada en las lecturas del módulo" },
        receptors: [{ name: "Síntesis de dopamina / dopa-descarboxilasa periférica", effect: "Levodopa entra al SNC; carbidopa disminuye metabolismo periférico", color: "bg-secondary" }],
        warnings: "Estándar de oro en Parkinson. INTERACCIÓN CRÍTICA: Antagonizada frontalmente por neurolépticos típicos (Haloperidol) y atípicos a dosis altas (Risperidona). Si el paciente desarrolla psicosis, no usar antagonistas D₂; emplear Pimavanserina o Clozapina.", warningsOld: "Náusea, arritmias, discinesias, cambios conductuales y fluctuaciones motoras. Carbidopa reduce metabolismo periférico. No se dispone de dosis personalizada en este compendio. Katzung 28, pp. 7–13, 35.",
        doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
      rasagilina: {
        sourceOnly: true, name: "Rasagilina", formula: "No especificado en las lecturas", code: "Antiparkinsoniano · Semana 12", classTitle: "Inhibidor selectivo de MAO-B", badge: "INHIBIDOR ENZIMÁTICO", alertBg: "bg-surface-container-highest text-secondary", icon: "neurology",
        altImg: "Ficha educativa de rasagilina, inhibidor selectivo de MAO-B.", adme: { bio: "No especificada en las lecturas", t12: "No especificada en las lecturas", meta: "MAO-B", elim: "No especificada en las lecturas" },
        receptors: [{ name: "Monoaminooxidasa B", effect: "Reduce degradación de dopamina", color: "bg-secondary" }], warnings: "Adyuvante a levodopa; precaución con otros IMAO, ISRS y tricíclicos. Posible síndrome serotoninérgico teórico. Katzung 28, pp. 18–19.", doseAvailable: false, calcDose: () => "No especificada en las lecturas del curso", route: "Consultar indicación y prescripción individual"
      },
      selegilina: {
        sourceOnly: true, name: "Selegilina", formula: "No especificado en las lecturas", code: "Antiparkinsoniano · Semana 12", classTitle: "Inhibidor selectivo de MAO-B", badge: "INHIBIDOR ENZIMÁTICO", alertBg: "bg-surface-container-highest text-secondary", icon: "neurology",
        altImg: "Ficha educativa de selegilina, inhibidor selectivo de MAO-B.", adme: { bio: "No especificada en las lecturas", t12: "No especificada en las lecturas", meta: "MAO-B", elim: "No especificada en las lecturas" },
        receptors: [{ name: "Monoaminooxidasa B", effect: "Prolonga efecto antiparkinsoniano de levodopa", color: "bg-secondary" }], warnings: "El texto refiere 5 mg con desayuno y comida; puede causar insomnio si se toma tarde. Precauciones con IMAO, ISRS y tricíclicos. Katzung 28, pp. 18–19.", doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
      pramipexol: {
        sourceOnly: true, name: "Pramipexol", formula: "No especificado en las lecturas", code: "Antiparkinsoniano · Semana 12", classTitle: "Agonista D₂/D₃/D₄ según el programa", badge: "AGONISTA DOPAMINÉRGICO", alertBg: "bg-surface-container-highest text-secondary", icon: "neurology",
        altImg: "Ficha educativa de pramipexol, agonista de receptores dopaminérgicos.", adme: { bio: "Oral", t12: "Efecto aprox. 8 h (cuadro resumen)", meta: "No especificado en las lecturas", elim: "No especificada en las lecturas" },
        receptors: [{ name: "Receptores D₂/D₃/D₄", effect: "Agonismo dopaminérgico directo", color: "bg-secondary" }], warnings: "Puede causar náusea, hipotensión postural, discinesias, confusión, impulsividad, somnolencia y edema. Katzung 28, pp. 15–16, 35.", doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
      haloperidol: {
        sourceOnly: true, name: "Haloperidol", formula: "No especificado en las lecturas", code: "Antipsicótico típico · Semana 12", classTitle: "Antagonista D₂", badge: "ANTAGONISTA DOPAMINÉRGICO", alertBg: "bg-error-container text-on-error-container", icon: "psychology",
        altImg: "Ficha educativa de haloperidol, antagonista dopaminérgico D2.", adme: { bio: "Oral, solución, IM y decanoato listados", t12: "No especificada en las lecturas consultadas", meta: "No especificado en las lecturas", elim: "No especificada en las lecturas" },
        receptors: [{ name: "Receptor D₂", effect: "Antagonismo dopaminérgico", color: "bg-error-container" }], warnings: "CONTRAINDICACIÓN ABSOLUTA EN ENFERMEDAD DE PARKINSON. Su bloqueo potente de D₂ estriatal anula por completo el efecto de Levodopa/Pramipexol y desencadena parkinsonismo farmacológico severo, acinesia aguda y riesgo de Síndrome Neuroléptico Maligno.", warningsOld: "Puede asociarse con parkinsonismo, acatisia, distonía, hiperprolactinemia y QT prolongado con formulación IV. Katzung 19, pp. 9, 21, 38, 52.", doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
      risperidona: {
        sourceOnly: true, name: "Risperidona", formula: "No especificado en las lecturas", code: "Antipsicótico atípico · Semana 12", classTitle: "Antagonista D₂ y 5-HT₂A", badge: "ANTAGONISTA DOPAMINA / 5-HT", alertBg: "bg-error-container text-on-error-container", icon: "psychology",
        altImg: "Ficha educativa de risperidona, antagonista D2 y 5-HT2A.", adme: { bio: "No especificada en las lecturas consultadas", t12: "No especificada en las lecturas consultadas", meta: "No especificado", elim: "No especificada" },
        receptors: [{ name: "Receptores D₂ y 5-HT₂A", effect: "Antagonismo dopaminérgico y serotoninérgico", color: "bg-error-container" }], warnings: "Riesgo de EPS, hiperprolactinemia y efectos metabólicos. Vigilar parámetros metabólicos; considerar prolactina ante síntomas. Katzung 19, pp. 23, 48, 51, 73.", doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
      clozapina: {
        sourceOnly: true, name: "Clozapina", formula: "No especificado en las lecturas", code: "Antipsicótico atípico · Semana 12", classTitle: "Antagonista D₂ y 5-HT₂A; multirreceptor", badge: "VIGILANCIA HEMATOLÓGICA", alertBg: "bg-error-container text-on-error-container", icon: "hematology",
        altImg: "Ficha educativa de clozapina, antipsicótico atípico que requiere vigilancia hematológica.", adme: { bio: "60% oral", t12: "2.5 h (pico indicado en cuadro)", meta: "CYP1A2 relevante", elim: "No especificada en las lecturas consultadas" },
        receptors: [{ name: "D₂ y 5-HT₂A", effect: "Antagonismo D₂ más débil y potente antagonismo 5-HT₂A descritos", color: "bg-error-container" }], warnings: "FÁRMACO DE ELECCIÓN EN PSICOSIS POR PARKINSON. Disociación rápida y muy débil afinidad por D₂ estriatal (no empeora parkinsonismo). Requiere vigilancia hematológica estricta (neutropenia/agranulocitosis). Katzung 19, pp. 20–22.", warningsOld: "Neutropenia grave, sedación, hipotensión, efectos metabólicos y estreñimiento. Requiere vigilancia hematológica del recuento absoluto de neutrófilos. Katzung 19, pp. 20, 22, 31–32, 51–53, 72.", doseAvailable: false, calcDose: () => "Consultar esquema clínico citado en la ficha", route: "Consultar indicación y prescripción individual"
      },
        pimavanserina: {
          sourceOnly: true, name: "Pimavanserina", formula: "C₂₅H₃₄FN₃O • PM: 427.56 g/mol", code: "Antipsicótico Específico Parkinson",
          classTitle: "Agonista inverso selectivo del receptor 5-HT₂A", badge: "GOLD STANDARD PSICOSIS PARKINSON", alertBg: "bg-surface-container-highest text-secondary", icon: "psychology",
          altImg: "Ficha educativa de pimavanserina, agonista inverso 5-HT2A sin bloqueo D2.",
          adme: { bio: "Oral (biodisponibilidad alta)", t12: "57 Horas (metabolito activo 200 h)", meta: "CYP3A4 / CYP3A5", elim: "Renal y Fecal" },
          receptors: [
            { name: "Receptor 5-HT₂A", effect: "Agonismo inverso potente (Ki: 0.087 nM)", percent: "98%", color: "bg-secondary" },
            { name: "Receptores Dopaminérgicos (D₁-D₅)", effect: "CERO AFINIDAD (No bloquea D₂)", percent: "0%", color: "bg-surface-variant" }
          ],
          warnings: "Tratamiento de elección aprobado para psicosis y alucinaciones en la Enfermedad de Parkinson. Al no poseer afinidad por D₂, no deteriora en absoluto la función motora nigroestriada ni interfiere con Levodopa. Vigilar intervalo QTc.",
          doseAvailable: false, calcDose: () => "34 mg una vez al día (dosis fija estándar)", route: "Vía Oral"
        },
        entacapona: {
          sourceOnly: true, name: "Entacapona", formula: "C₁₄H₁₅N₃O₅ • PM: 305.28 g/mol", code: "Antiparkinsoniano · iCOMT",
          classTitle: "Inhibidor selectivo y reversible de COMT periférica", badge: "AHORRADOR DE LEVODOPA", alertBg: "bg-surface-container-highest text-secondary", icon: "neurology",
          altImg: "Ficha de entacapona, inhibidor de catecol-O-metiltransferasa periférica.",
          adme: { bio: "35% (Vía oral)", t12: "1.5 - 2.4 Horas", meta: "Glucuronidación hepática", elim: "Biliar/Fecal 90%, Renal 10%" },
          receptors: [
            { name: "Enzima COMT Periférica", effect: "Inhibe degradación de Levodopa a 3-OMD", percent: "92%", color: "bg-primary" },
            { name: "Barrera Hematoencefálica", effect: "No cruza BHE (acción periférica pura)", percent: "0%", color: "bg-surface-variant" }
          ],
          warnings: "Uso obligatorio en combinación con Levodopa/Carbidopa. Reduce las fluctuaciones motoras ('wearing-off'). Causa coloración naranja inofensiva en orina. No interactúa a nivel central con antipsicóticos.",
          doseAvailable: false, calcDose: () => "200 mg con cada toma de Levodopa/Carbidopa (máx 2000 mg/día)", route: "Vía Oral"
        }
    };

    let activeDrugKey = "epinefrina";
    let activeCategory = "all";

    // Select DOM nodes
    const cards = document.querySelectorAll(".drug-card");
    const searchInput = document.getElementById("drug-search");
    const sortSelector = document.getElementById("sort-selector");
    const weightSlider = document.getElementById("weight-slider");
    const weightDisplay = document.getElementById("weight-display");
    const calculatedDose = document.getElementById("calculated-dose");
    const calculatedRoute = document.getElementById("calculated-route");
    const categoryTabs = document.querySelectorAll(".cat-btn");
    const resetBtn = document.getElementById("reset-filters");
    const countLabel = document.getElementById("items-found-label");

    // Inspector nodes
    const inspName = document.getElementById("inspector-name");
    const inspFormula = document.getElementById("inspector-formula");
    const inspClass = document.getElementById("inspector-class");
    const inspCode = document.getElementById("inspector-code");
    const inspBadge = document.getElementById("inspector-alert-pill");
    const inspIcon = document.getElementById("inspector-badge-icon");
    const inspImg = document.getElementById("inspector-img");
    const defaultInspectorImage = inspImg.getAttribute("src");
    const inspWarnings = document.getElementById("inspector-warnings");
    const bioNode = document.getElementById("adme-bio");
    const t12Node = document.getElementById("adme-t12");
    const metaNode = document.getElementById("adme-meta");
    const elimNode = document.getElementById("adme-elim");
    const receptorsContainer = document.getElementById("receptors-container");

    // Update Inspector View with chosen drug
    function renderInspector(key) {
      const data = DRUG_DB[key];
      if (!data) return;

      activeDrugKey = key;

      // Update basic details
      inspName.textContent = data.name;
      inspFormula.textContent = data.formula;
      inspClass.textContent = data.classTitle;
      inspCode.textContent = data.code;
      inspBadge.textContent = data.badge;
      inspBadge.className = `px-space-md py-1 rounded font-label-sm text-label-sm tracking-widest font-bold uppercase shadow-[0_0_10px_rgba(0,0,0,0.4)] ${data.alertBg}`;
      inspIcon.textContent = data.icon;
      inspImg.setAttribute("data-alt", data.altImg);
      if (data.sourceOnly) {
        inspImg.removeAttribute("src");
        inspImg.classList.add("hidden");
      } else {
        inspImg.setAttribute("src", defaultInspectorImage);
        inspImg.classList.remove("hidden");
      }
      inspWarnings.textContent = data.warnings;

      // Update ADME
      bioNode.textContent = data.adme.bio;
      t12Node.textContent = data.adme.t12;
      metaNode.textContent = data.adme.meta;
      elimNode.textContent = data.adme.elim;

      // Update receptors
      receptorsContainer.innerHTML = data.receptors.map(r => `
        <div class="p-space-sm rounded bg-surface-container-high/60 flex flex-col gap-1 transition-all">
          <div class="flex justify-between items-center text-xs">
            <span class="font-label-sm text-label-sm text-primary uppercase font-bold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full ${r.color}"></span> ${r.name}
            </span>
            <span class="text-on-surface font-label-sm text-label-sm font-semibold">${r.effect}</span>
          </div>
          ${r.percent ? `<div class="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden"><div class="h-full ${r.color} transition-all duration-500" style="width: ${r.percent}"></div></div>` : ""}
        </div>
      `).join("");

      const pharmacologyHeading = document.querySelector('#receptors-container')?.previousElementSibling;
      const pharmacologyCaption = pharmacologyHeading?.querySelector('span:last-child');
      if (pharmacologyHeading) pharmacologyHeading.querySelector('span:nth-child(2)').textContent = data.sourceOnly ? 'Dianas y mecanismo de acción' : 'Farmacodinamia & Receptores';
      if (pharmacologyCaption) pharmacologyCaption.textContent = data.sourceOnly ? 'Según lecturas disponibles' : 'Afinidad Relativa';

      const admeTitle = document.querySelector('#adme-bio')?.closest('.flex.flex-col.gap-space-sm')?.querySelector('.font-label-md');
      if (admeTitle) admeTitle.textContent = data.sourceOnly ? 'Datos farmacocinéticos disponibles' : 'Farmacocinética Cuántica (ADME)';

      // Update Calculator
      updateDosing();

      // Highlight active card
      cards.forEach(card => {
        if (card.dataset.id === key) {
          card.classList.add("bg-surface-container", "shadow-[0_0_24px_rgba(200,170,110,0.35)]");
        } else {
          card.classList.remove("bg-surface-container", "shadow-[0_0_24px_rgba(200,170,110,0.35)]");
        }
      });
    }

    // Dynamic Dose Calculation
    function updateDosing() {
      const weight = parseInt(weightSlider.value, 10);
      weightDisplay.textContent = `${weight} kg`;
      const drug = DRUG_DB[activeDrugKey];
      if (drug && drug.doseAvailable === false) {
        calculatedDose.textContent = drug.calcDose();
        calculatedRoute.textContent = drug.route;
      } else if (drug) {
        calculatedDose.textContent = drug.calcDose(weight);
        calculatedRoute.textContent = drug.route;
      }
    }

    // Filter Logic
    function applyFilters() {
      const term = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      cards.forEach(card => {
        const id = card.dataset.id;
        const cat = card.dataset.category || "";
        const drug = DRUG_DB[id];

        const matchesCat = (activeCategory === "all") || cat.includes(activeCategory);
        const matchesSearch = !term || 
          id.toLowerCase().includes(term) || 
          (drug && drug.name.toLowerCase().includes(term)) ||
          (drug && drug.classTitle.toLowerCase().includes(term)) ||
          (drug && drug.warnings.toLowerCase().includes(term));

        if (matchesCat && matchesSearch) {
          card.classList.remove("hidden");
          visibleCount++;
        } else {
          card.classList.add("hidden");
        }
      });

      countLabel.textContent = `Mostrando ${visibleCount} ítem${visibleCount === 1 ? '' : 's'}`;
    }

    // Event Listeners
    cards.forEach(card => {
      card.addEventListener("click", () => {
        renderInspector(card.dataset.id);
      });
    });

    categoryTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        categoryTabs.forEach(t => {
          t.classList.remove("bg-primary-container", "text-on-primary-container", "shadow-[0_0_12px_rgba(200,170,110,0.35)]");
          t.classList.add("bg-surface-container", "text-on-surface-variant");
        });
        tab.classList.remove("bg-surface-container", "text-on-surface-variant");
        tab.classList.add("bg-primary-container", "text-on-primary-container", "shadow-[0_0_12px_rgba(200,170,110,0.35)]");

        activeCategory = tab.dataset.cat;
        applyFilters();
      });
    });

    searchInput.addEventListener("input", applyFilters);

    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      categoryTabs[0].click();
      applyFilters();
    });

    weightSlider.addEventListener("input", updateDosing);

    // Initial render
    renderInspector("epinefrina");
  })();

