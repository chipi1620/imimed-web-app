export type Product = {
  slug: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  application: string;
  specialty: string;
  condition: string;
  operation: string;
  mobility: "Fijo" | "Portátil" | "Móvil";
  availability: string;
  image: string;
  sourceUrl?: string;
  description: string;
  benefits: string[];
  specs: [string, string][];
  configurations: string[];
  included: string[];
  optional: string[];
  warranty: string;
  documents: string[];
  faqs: { question: string; answer: string }[];
};

const commercialScope = {
  condition: "Nuevo",
  operation: "Venta",
  availability: "Bajo pedido",
  warranty:
    "Disponibilidad, configuración, registro aplicable y cobertura se confirman por escrito al preparar la propuesta.",
  included: [
    "Evaluación de aplicación e infraestructura",
    "Configuración técnica de referencia",
    "Alcance comercial documentado",
  ],
  optional: [
    "Instalación y puesta en marcha",
    "Capacitación",
    "Integración DICOM / PACS",
    "Póliza de mantenimiento",
  ],
  documents: [
    "Ficha técnica del fabricante",
    "Requisitos de instalación",
    "Alcance de garantía",
  ],
};

export const products: Product[] = [
  {
    ...commercialScope,
    slug: "ge-definium-tempo",
    brand: "GE HealthCare",
    model: "Definium Tempo",
    name: "Definium Tempo",
    category: "Rayos X",
    application: "Radiografía digital general",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/definium-tempo.jpg",
    sourceUrl:
      "https://www.gehealthcare.com/es-mx/products/radiography/fixed-rad-systems/definium-tempo",
    description:
      "Sistema fijo de radiografía digital diseñado para automatizar el posicionamiento y simplificar el flujo del tecnólogo.",
    benefits: [
      "Posicionamiento y seguimiento automáticos según configuración",
      "Cámara 3D para asistencia de flujo",
      "Detectores FlashPad HD y procesamiento Helix",
    ],
    specs: [
      ["Modalidad", "Radiografía digital"],
      ["Instalación", "Sala fija"],
      ["Detector", "FlashPad HD"],
      ["Flujo", "Intelligent Workflow Suite"],
    ],
    configurations: [
      "Suspensión de techo",
      "Mesa elevable",
      "Soporte mural",
      "Consola en el cabezal del tubo",
    ],
    faqs: [
      {
        question: "¿La configuración es igual para todas las salas?",
        answer:
          "No. La mesa, soporte mural, recorrido de suspensión y detectores se definen según espacio y tipo de estudios.",
      },
      {
        question: "¿Puede conectarse a PACS?",
        answer:
          "La conectividad se valida contra la versión, licencias y arquitectura DICOM de la institución.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "siemens-ysio-xpree",
    brand: "Siemens Healthineers",
    model: "YSIO X.pree",
    name: "YSIO X.pree",
    category: "Rayos X",
    application: "Radiografía digital de alto flujo",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/ysio-xpree.jpg",
    sourceUrl:
      "https://www.siemens-healthineers.com/en-us/radiography/digital-x-ray/ysio-xpree",
    description:
      "Sistema digital suspendido de techo con funciones inteligentes para interacción, posicionamiento y consistencia de imagen.",
    benefits: [
      "Interfaz guiada para flujos consistentes",
      "Cámara 3D para asistencia de posicionamiento",
      "Procesamiento inteligente de imagen",
    ],
    specs: [
      ["Modalidad", "Radiografía digital"],
      ["Montaje", "Suspensión de techo"],
      ["Asistencia", "Cámara 3D"],
      ["Aplicación", "Radiografía general"],
    ],
    configurations: [
      "Mesa de exploración",
      "Bucky mural",
      "Detector inalámbrico",
      "Estación de adquisición",
    ],
    faqs: [
      {
        question: "¿Requiere adecuación de sala?",
        answer:
          "Sí. Se revisan alturas, recorridos, cargas, alimentación, blindaje y condiciones ambientales antes de definir alcance.",
      },
      {
        question: "¿Incluye automatización?",
        answer:
          "Las funciones dependen de la configuración y licencias confirmadas en la propuesta.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "ge-revolution-maxima",
    brand: "GE HealthCare",
    model: "Revolution Maxima",
    name: "Revolution Maxima",
    category: "Tomografía",
    application: "Tomografía computarizada general y avanzada",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/revolution-maxima.jpg",
    sourceUrl:
      "https://www.gehealthcare.com/en-us/products/computed-tomography/revolution/maxima",
    description:
      "Tomógrafo diseñado alrededor de flujos automatizados, posicionamiento asistido por IA y reconstrucción de imagen por aprendizaje profundo.",
    benefits: [
      "Posicionamiento automático asistido por IA",
      "Reconstrucción TrueFidelity DL",
      "Aplicaciones para cardiología, ictus y oncología",
    ],
    specs: [
      ["Modalidad", "Tomografía computarizada"],
      ["Cobertura de detector", "40 mm"],
      ["Resolución espacial", "0.28 mm"],
      ["Reconstrucción", "TrueFidelity DL"],
    ],
    configurations: [
      "Imagen general",
      "Cardiología",
      "Oncología",
      "Evaluación de ictus",
    ],
    faqs: [
      {
        question: "¿Qué obra requiere un tomógrafo?",
        answer:
          "Se evalúan sala, blindaje, climatización, potencia, UPS, inyector, control y rutas de acceso antes de cotizar.",
      },
      {
        question: "¿Las aplicaciones avanzadas vienen incluidas?",
        answer:
          "No debe asumirse. Cada paquete clínico y licencia se detalla en la configuración propuesta.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "siemens-somatom-go-top",
    brand: "Siemens Healthineers",
    model: "SOMATOM go.Top",
    name: "SOMATOM go.Top",
    category: "Tomografía",
    application: "Tomografía computarizada clínica multipropósito",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/somatom-go-top.jpg",
    sourceUrl:
      "https://www.siemens-healthineers.com/computed-tomography/somatom/somatom-go-platform/somatom-go-top",
    description:
      "Plataforma de tomografía para procedimientos rutinarios y aplicaciones avanzadas con un flujo móvil orientado al paciente.",
    benefits: [
      "Flujo móvil para trabajar cerca del paciente",
      "Configuración clínica multipropósito",
      "Herramientas de automatización myExam Companion",
    ],
    specs: [
      ["Modalidad", "Tomografía computarizada"],
      ["Plataforma", "SOMATOM go."],
      ["Flujo", "Móvil y automatizado"],
      ["Aplicación", "Rutina y estudios avanzados"],
    ],
    configurations: [
      "Imagen general",
      "Angiografía por TC",
      "Cardiología según paquete",
      "Aplicaciones de baja dosis",
    ],
    faqs: [
      {
        question: "¿Se puede configurar por carga de trabajo?",
        answer:
          "Sí. La cobertura clínica, software, inyector y posprocesamiento se dimensionan según estudios y volumen.",
      },
      {
        question: "¿Incluye estación de interpretación?",
        answer:
          "La estación y sus aplicaciones se especifican por separado dentro del alcance final.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "ge-signa-architect",
    brand: "GE HealthCare",
    model: "SIGNA Architect",
    name: "SIGNA Architect 3.0T",
    category: "Resonancia",
    application: "Resonancia magnética de cuerpo completo",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/signa-architect.jpg",
    sourceUrl:
      "https://www.gehealthcare.com/en-us/products/magnetic-resonance-imaging/3t-mri-scanners/signa-architect-wide-bore-mri-scanner",
    description:
      "Sistema de resonancia magnética 3.0T de túnel amplio con arquitectura digital y herramientas de reconstrucción por aprendizaje profundo.",
    benefits: [
      "Túnel amplio de 70 cm",
      "Cadena de recepción digital de 128 canales",
      "Reconstrucción AIR Recon DL",
    ],
    specs: [
      ["Campo", "3.0 T"],
      ["Apertura", "70 cm"],
      ["Recepción", "128 canales"],
      ["Gradientes", "44 mT/m a 200 T/m/s"],
    ],
    configurations: [
      "Neuroimagen",
      "Musculoesquelético",
      "Cardiovascular",
      "Oncología y cuerpo",
    ],
    faqs: [
      {
        question: "¿Qué infraestructura especial requiere?",
        answer:
          "Se estudian jaula RF, enfriamiento, energía, seguridad magnética, rutas de instalación y cálculo estructural.",
      },
      {
        question: "¿Las bobinas se cotizan por separado?",
        answer:
          "La selección de bobinas y aplicaciones se arma según las anatomías y especialidades prioritarias.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "ge-vscan-air-cl",
    brand: "GE HealthCare",
    model: "Vscan Air CL",
    name: "Vscan Air CL",
    category: "Ultrasonido",
    application: "Ultrasonido portátil en punto de atención",
    specialty: "Imagenología",
    mobility: "Portátil",
    image: "/media/diagnostic-detail.png",
    sourceUrl:
      "https://www.gehealthcare.com/en-us/products/ultrasound/handheld-ultrasound/vscan-air-cl",
    description:
      "Ultrasonido inalámbrico de bolsillo con arreglo curvo y lineal en una sola sonda para evaluaciones superficiales y profundas.",
    benefits: [
      "Dos transductores en un solo dispositivo",
      "Conexión inalámbrica con teléfono o tableta",
      "Diseño portátil, resistente al agua y a caídas",
    ],
    specs: [
      ["Formato", "Sonda inalámbrica"],
      ["Transductores", "Curvo y lineal"],
      ["Peso", "205 ± 3 g"],
      ["Autonomía", "Hasta 50 min de exploración continua"],
    ],
    configurations: [
      "Abdominal y obstetricia",
      "Vascular",
      "Musculoesquelético",
      "Pulmón y procedimientos",
    ],
    faqs: [
      {
        question: "¿Incluye teléfono o tableta?",
        answer:
          "El dispositivo se conecta a equipos móviles compatibles; el alcance comercial debe indicar si se incluye alguno.",
      },
      {
        question: "¿Es un equipo de diagnóstico?",
        answer:
          "Su uso, indicaciones y disponibilidad regional deben validarse con la documentación regulatoria aplicable.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "siemens-cios-alpha-neo",
    brand: "Siemens Healthineers",
    model: "Cios Alpha.neo",
    name: "Cios Alpha.neo",
    category: "Arcos en C",
    application: "Imagen 2D intraoperatoria",
    specialty: "Imagenología",
    mobility: "Móvil",
    image: "/media/cios-alpha-neo.png",
    sourceUrl:
      "https://www.siemens-healthineers.com/en-us/surgical-c-arms-and-navigation/mobile-c-arms/cios-alpha",
    description:
      "Arco en C móvil de alta definición para cirugía, con detector plano de gran campo y cadena de imagen Retina.",
    benefits: [
      "Detector plano de 30 × 30 cm",
      "Generador de alta potencia",
      "Tecnologías CARE para gestión de dosis",
    ],
    specs: [
      ["Modalidad", "Fluoroscopía móvil 2D"],
      ["Detector", "Plano, 30 × 30 cm"],
      ["Generador", "Hasta 25 kW"],
      ["Aplicación", "Cirugía e intervencionismo"],
    ],
    configurations: [
      "Vascular",
      "Ortopedia y trauma",
      "Columna",
      "Cirugía pélvica",
    ],
    faqs: [
      {
        question: "¿Incluye carro de monitores?",
        answer:
          "Los monitores, accesorios y paquetes de aplicación se confirman en la configuración propuesta.",
      },
      {
        question: "¿Requiere integración con quirófano?",
        answer:
          "Se revisan espacio, energía, conectividad, mesas compatibles y flujo estéril de la sala.",
      },
    ],
  },
  {
    ...commercialScope,
    slug: "ge-senographe-pristina",
    brand: "GE HealthCare",
    model: "Senographe Pristina",
    name: "Senographe Pristina",
    category: "Mastografía",
    application: "Tamizaje y diagnóstico mamario",
    specialty: "Imagenología",
    mobility: "Fijo",
    image: "/media/senographe-pristina.jpg",
    sourceUrl:
      "https://www.gehealthcare.com/en-us/products/mammography/senographe-pristina",
    description:
      "Sistema de mastografía diseñado para mejorar la experiencia de paciente y tecnólogo, con opciones 2D, tomosíntesis y aplicaciones avanzadas.",
    benefits: [
      "Diseño de gantry orientado a comodidad",
      "Opciones de imagen 2D y 3D",
      "Plataforma ampliable a contraste y biopsia",
    ],
    specs: [
      ["Modalidad", "Mastografía digital"],
      ["Adquisición", "2D / 3D según configuración"],
      ["Compresión", "Asistida por paciente, opcional"],
      ["Aplicaciones", "Tamizaje y diagnóstico"],
    ],
    configurations: [
      "Mastografía 2D",
      "Tomosíntesis 3D",
      "Mamografía con contraste",
      "Biopsia estereotáxica",
    ],
    faqs: [
      {
        question: "¿Incluye tomosíntesis?",
        answer:
          "La modalidad 3D, reconstrucción y licencias deben figurar expresamente en la configuración cotizada.",
      },
      {
        question: "¿Puede ampliarse a biopsia?",
        answer:
          "La plataforma contempla opciones avanzadas; se valida compatibilidad y disponibilidad regional.",
      },
    ],
  },
];
