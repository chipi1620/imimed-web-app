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

export const products: Product[] = [
  {
    slug: "sistema-rayos-x-digital",
    brand: "Configuración multimarcas",
    model: "DR · Sala fija",
    name: "Sistema de radiografía digital",
    category: "Rayos X",
    application: "Radiografía general",
    specialty: "Imagenología",
    condition: "Nuevo / seminuevo",
    operation: "Venta",
    mobility: "Fijo",
    availability: "Bajo pedido",
    image: "/media/installation-scene.png",
    description:
      "Configuración consultiva de generador, mesa, bucky, detector y estación de adquisición según volumen, infraestructura y aplicación.",
    benefits: [
      "Flujo digital sin chasis",
      "Configuración según infraestructura",
      "Instalación y capacitación disponibles",
    ],
    specs: [
      ["Configuración", "Sala fija"],
      ["Detector", "DR inalámbrico o cableado"],
      ["Aplicación", "Radiografía general"],
      ["Operación", "Venta"],
    ],
    configurations: ["Generador y tubo según carga de trabajo", "Mesa fija o elevable", "Bucky mural", "Detector DR y estación"],
    included: ["Evaluación de configuración", "Inspección de entrega", "Pruebas funcionales"],
    optional: ["Instalación", "Capacitación", "Integración DICOM", "Póliza de mantenimiento"],
    warranty: "La cobertura se confirma por escrito según marca, condición y configuración.",
    documents: ["Ficha técnica de la configuración", "Requisitos de instalación", "Alcance de garantía"],
    faqs: [
      { question: "¿Incluye detector digital?", answer: "Puede incluirlo. Se cotiza la configuración completa después de confirmar tamaño, conectividad y flujo requerido." },
      { question: "¿Se puede integrar con PACS?", answer: "Sí, sujeto a compatibilidad DICOM, licencias disponibles y validación de la red clínica." },
    ],
  },
  {
    slug: "arco-en-c-movil",
    brand: "Configuración multimarcas",
    model: "C-Arm · Quirúrgico",
    name: "Arco en C móvil",
    category: "Arcos en C",
    application: "Cirugía y procedimientos",
    specialty: "Quirófano",
    condition: "Seminuevo / reacondicionado",
    operation: "Venta o renta",
    mobility: "Móvil",
    availability: "Sujeto a disponibilidad",
    image: "/media/installation-scene.png",
    description:
      "Equipo móvil de fluoroscopía seleccionado por aplicación, potencia, detector, geometría y soporte disponible.",
    benefits: [
      "Evaluación técnica previa",
      "Opciones de venta o renta",
      "Póliza e instalación disponibles",
    ],
    specs: [
      ["Configuración", "Móvil"],
      ["Detector", "Intensificador o plano"],
      ["Aplicación", "Quirófano"],
      ["Operación", "Venta / renta"],
    ],
    configurations: ["Intensificador de imagen", "Detector plano", "Monitores móviles", "Paquetes por especialidad"],
    included: ["Revisión funcional", "Inventario de accesorios", "Pruebas de movimientos"],
    optional: ["Entrega e instalación", "Capacitación", "DICOM", "Cobertura técnica"],
    warranty: "Depende de la condición, antigüedad y componentes incluidos en la propuesta.",
    documents: ["Configuración cotizada", "Reporte de condición", "Requisitos eléctricos"],
    faqs: [
      { question: "¿La renta incluye soporte?", answer: "El alcance de soporte, traslados y sustitución debe quedar definido en la propuesta de renta." },
      { question: "¿Qué determina el precio?", answer: "Detector, potencia, año, condición, accesorios, garantía, instalación y periodo de renta o compra." },
    ],
  },
  {
    slug: "ultrasonido-multidisciplinario",
    brand: "Configuración multimarcas",
    model: "US · Multidisciplinario",
    name: "Ultrasonido diagnóstico",
    category: "Ultrasonido",
    application: "Imagen general y especialidades",
    specialty: "Diagnóstico",
    condition: "Nuevo / seminuevo",
    operation: "Venta o renta",
    mobility: "Móvil",
    availability: "Bajo pedido",
    image: "/media/diagnostic-detail.png",
    description:
      "Plataforma de ultrasonido configurada por aplicación clínica, transductores y herramientas de medición.",
    benefits: [
      "Configuración por especialidad",
      "Transductores según estudio",
      "Capacitación y soporte disponibles",
    ],
    specs: [
      ["Aplicación", "Según configuración"],
      ["Transductores", "A definir"],
      ["Formato", "Carro o portátil"],
      ["Operación", "Venta / renta"],
    ],
    configurations: ["Imagen general", "Cardiología", "Obstetricia", "Punto de atención"],
    included: ["Consola configurada", "Transductores cotizados", "Pruebas de imagen"],
    optional: ["Impresora", "DICOM", "Capacitación", "Póliza"],
    warranty: "Se establece según condición, transductores y cobertura del proveedor.",
    documents: ["Ficha de configuración", "Lista de transductores", "Condiciones de garantía"],
    faqs: [
      { question: "¿Puedo elegir los transductores?", answer: "Sí. La propuesta se arma alrededor de los estudios y perfiles de usuario reales." },
      { question: "¿Hay equipos portátiles?", answer: "Sí, la disponibilidad se revisa por especialidad y nivel de desempeño requerido." },
    ],
  },
  {
    slug: "monitor-multiparametrico",
    brand: "Configuración multimarcas",
    model: "Monitor · Multiparamétrico",
    name: "Monitor de signos vitales",
    category: "Monitoreo",
    application: "Vigilancia de parámetros fisiológicos",
    specialty: "Cuidados críticos",
    condition: "Nuevo / seminuevo",
    operation: "Venta o renta",
    mobility: "Portátil",
    availability: "Bajo pedido",
    image: "/media/diagnostic-detail.png",
    description:
      "Monitor configurado por área clínica, parámetros, conectividad, accesorios y nivel de vigilancia requerido.",
    benefits: ["Parámetros definidos por área", "Accesorios compatibles", "Capacitación disponible"],
    specs: [["Parámetros base", "ECG, SpO₂, PANI"], ["Opcionales", "EtCO₂, temperatura, presión invasiva"], ["Formato", "Cabecera o transporte"], ["Operación", "Venta / renta"]],
    configurations: ["Hospitalización", "Urgencias", "Quirófano", "Transporte"],
    included: ["Accesorios cotizados", "Prueba funcional", "Configuración inicial"],
    optional: ["Central de monitoreo", "Capnografía", "Capacitación", "Mantenimiento"],
    warranty: "Se define por marca, condición y accesorios incluidos.",
    documents: ["Ficha de parámetros", "Lista de accesorios", "Guía de instalación"],
    faqs: [
      { question: "¿Incluye todos los parámetros?", answer: "No necesariamente. Se cotizan sólo los módulos y accesorios requeridos por el área clínica." },
      { question: "¿Puede conectarse a una central?", answer: "Depende del modelo, protocolo, licencias y arquitectura de red existente." },
    ],
  },
  {
    slug: "maquina-de-anestesia",
    brand: "Configuración multimarcas",
    model: "Anestesia · Modular",
    name: "Máquina de anestesia",
    category: "Anestesia",
    application: "Administración y ventilación durante procedimientos",
    specialty: "Quirófano",
    condition: "Seminuevo / reacondicionado",
    operation: "Venta",
    mobility: "Móvil",
    availability: "Sujeto a disponibilidad",
    image: "/media/installation-scene.png",
    description:
      "Sistema seleccionado por ventilador, vaporizadores, monitoreo, circuitos, compatibilidad y soporte técnico disponible.",
    benefits: ["Configuración revisada", "Accesorios identificados", "Pruebas y capacitación disponibles"],
    specs: [["Aplicación", "Quirófano"], ["Ventilador", "Según configuración"], ["Vaporizadores", "Por confirmar"], ["Operación", "Venta"]],
    configurations: ["Adulto", "Pediátrico", "Bajo flujo", "Integración con monitoreo"],
    included: ["Evaluación funcional", "Inventario de módulos", "Pruebas de entrega"],
    optional: ["Vaporizadores", "Monitor de gases", "Instalación", "Póliza"],
    warranty: "La cobertura y las exclusiones se documentan en la cotización.",
    documents: ["Configuración técnica", "Reporte de condición", "Alcance de instalación"],
    faqs: [
      { question: "¿Incluye vaporizadores?", answer: "Sólo cuando se especifican en la propuesta. Marca, agente y estado deben confirmarse." },
      { question: "¿Se entrega calibrada?", answer: "Las pruebas, calibraciones y certificados se definen según el alcance contratado." },
    ],
  },
  {
    slug: "detector-digital-radiografia",
    brand: "Configuración multimarcas",
    model: "DR · Detector plano",
    name: "Detector digital para radiografía",
    category: "Detectores digitales",
    application: "Digitalización de radiografía",
    specialty: "Imagenología",
    condition: "Nuevo",
    operation: "Venta",
    mobility: "Portátil",
    availability: "Bajo pedido",
    image: "/media/diagnostic-detail.png",
    description:
      "Detector DR seleccionado por tamaño, centellador, conexión, estación de adquisición y compatibilidad con el generador.",
    benefits: ["Conversión digital", "Flujo de adquisición definido", "Integración y capacitación opcionales"],
    specs: [["Tamaño", "Según aplicación"], ["Conexión", "Cableada o inalámbrica"], ["Estación", "Incluida según paquete"], ["Operación", "Venta"]],
    configurations: ["35 × 43 cm", "43 × 43 cm", "Cableado", "Inalámbrico"],
    included: ["Detector", "Estación según propuesta", "Software de adquisición"],
    optional: ["Generador compatible", "DICOM", "Instalación", "Capacitación"],
    warranty: "Vigencia y cobertura por daño físico se confirman en la propuesta.",
    documents: ["Ficha del detector", "Requisitos de estación", "Compatibilidad declarada"],
    faqs: [
      { question: "¿Funciona con cualquier equipo de rayos X?", answer: "No debe asumirse. Se valida sincronización, rango de exposición, dimensiones y flujo de adquisición." },
      { question: "¿Incluye estación de trabajo?", answer: "Puede incluirla; el alcance debe indicar hardware, software, monitor y licencias." },
    ],
  },
];
