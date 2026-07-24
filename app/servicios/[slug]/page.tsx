import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../page";
import { RequestForm } from "../../request-form";

const serviceData: Record<string, { title: string; lead: string; problem: string; process: string[]; deliverables: string[]; exclusions: string[] }> = {
  "mantenimiento-preventivo": {
    title: "Reduzca fallas inesperadas y documente correctamente el estado de sus equipos.",
    lead: "Mantenimiento preventivo por modalidad, condición, frecuencia de uso y criticidad clínica.",
    problem: "La falta de inspección sistemática oculta desgaste, contaminación, conexiones deficientes y desviaciones que terminan en fallas no planeadas.",
    process: ["Revisión de antecedentes y alcance", "Inspección visual y limpieza técnica", "Pruebas funcionales y de seguridad aplicables", "Registro de hallazgos", "Recomendaciones priorizadas"],
    deliverables: ["Orden de servicio", "Lista de verificación", "Reporte técnico", "Evidencia fotográfica autorizada", "Recomendaciones"],
    exclusions: ["Refacciones salvo cotización", "Correcciones fuera del alcance aprobado", "Calibraciones metrológicas no contratadas"],
  },
  "mantenimiento-correctivo": {
    title: "Diagnostique la causa antes de reemplazar componentes.",
    lead: "Atención correctiva para fallas intermitentes, degradación funcional y equipos fuera de servicio.",
    problem: "Cambiar piezas sin aislar la causa aumenta costo, tiempo detenido y riesgo de reincidencia.",
    process: ["Recepción de síntomas y códigos", "Reproducción segura de la falla", "Pruebas por subsistema", "Diagnóstico y propuesta", "Intervención autorizada", "Validación operativa"],
    deliverables: ["Diagnóstico técnico", "Cotización de alcance", "Registro de intervención", "Resultado de pruebas", "Recomendaciones posteriores"],
    exclusions: ["Refacciones no cotizadas", "Información o respaldos no disponibles", "Daños colaterales no observables en la evaluación inicial"],
  },
  instalacion: {
    title: "Inicie operación con infraestructura, configuración y documentación correctas.",
    lead: "Recepción, instalación, puesta en marcha y capacitación de equipos médicos.",
    problem: "Una instalación incompleta traslada riesgos al usuario: alimentación inadecuada, conectividad pendiente, accesorios sin verificar y operación sin capacitación.",
    process: ["Levantamiento y requisitos", "Recepción e inspección", "Montaje y conexiones", "Configuración", "Pruebas de aceptación", "Capacitación y entrega"],
    deliverables: ["Checklist de instalación", "Configuración registrada", "Pruebas de aceptación", "Acta de entrega", "Registro de capacitación"],
    exclusions: ["Obra civil no contratada", "Adecuaciones eléctricas externas", "Permisos regulatorios del establecimiento"],
  },
  "dicom-pacs": {
    title: "Conecte modalidades, archivo y lectura sin perder trazabilidad clínica.",
    lead: "Integración DICOM, Worklist, almacenamiento y flujos PACS.",
    problem: "AE Titles duplicados, reglas incompletas y metadatos deficientes provocan estudios huérfanos, búsquedas manuales y pérdida de continuidad.",
    process: ["Mapa de flujo y actores", "Inventario de AE Titles, IP y puertos", "Configuración de modalidades", "Pruebas Store / Query / Worklist", "Validación con usuarios", "Documentación final"],
    deliverables: ["Matriz de conectividad", "Registro de configuración", "Pruebas de transferencia", "Incidencias y resolución", "Diagrama del flujo"],
    exclusions: ["Licencias de terceros", "Cambios de red fuera del alcance", "Migración histórica no contratada"],
  },
  capacitacion: {
    title: "Transfiera conocimiento operativo sin sustituir la formación del fabricante.",
    lead: "Capacitación de operación básica, cuidado del equipo y respuesta inicial ante incidencias.",
    problem: "El uso inconsistente acelera desgaste, genera errores evitables y dificulta distinguir una falla técnica de una configuración incorrecta.",
    process: ["Identificación de perfiles", "Objetivos y temario", "Sesión práctica", "Evaluación de comprensión", "Registro de participantes"],
    deliverables: ["Temario", "Material de apoyo", "Lista de asistencia", "Constancia o registro interno", "Recomendaciones"],
    exclusions: ["Certificación de fabricante", "Atribuciones clínicas", "Entrenamiento fuera de la configuración contratada"],
  },
};

export function generateStaticParams() { return Object.keys(serviceData).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const data = serviceData[(await params).slug];
  return data ? { title: data.title, description: data.lead } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = serviceData[slug];
  if (!data) notFound();
  const faqs = [
    { question: "¿Cómo se define el alcance?", answer: "Con modalidad, marca, modelo, condición, ubicación, criticidad y resultado esperado. La cotización delimita actividades, exclusiones y entregables." },
    { question: "¿Las refacciones están incluidas?", answer: "Sólo cuando la propuesta las identifica expresamente. Un diagnóstico no autoriza reemplazos ni genera cobertura automática." },
    { question: "¿Qué información debo enviar?", answer: "Equipo, marca, modelo, número de serie, síntomas, códigos, fecha de inicio, estado operativo y evidencia disponible." },
  ];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.lead,
    provider: { "@type": "Organization", name: "IMIMED" },
    areaServed: "México",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero service-hero"><div className="shell"><p className="kicker">Servicio especializado</p><h1>{data.title}</h1><p>{data.lead}</p><Link className="button" href="/cotizacion">Solicitar servicio <span>↗</span></Link></div></section>
        <section className="section"><div className="shell service-detail-grid"><aside><span className="eyebrow">Problema que resuelve</span><p>{data.problem}</p></aside><div><h2>Proceso de servicio</h2><ol>{data.process.map((step, i) => <li key={step}><span className="mono">{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol></div></div></section>
        <section className="section clinical-bg"><div className="shell dual-list"><div><p className="kicker">Entregables</p><h2>Lo que recibe.</h2><ul>{data.deliverables.map((x) => <li key={x}>{x}</li>)}</ul></div><div className="exclusions"><p className="kicker">Alcance claro</p><h2>Lo que no incluye.</h2><ul>{data.exclusions.map((x) => <li key={x}>{x}</li>)}</ul></div></div></section>
        <section className="section faq-section"><div className="shell faq-layout"><div><p className="kicker">Preguntas frecuentes</p><h2>Alcance antes de intervenir.</h2></div><div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
        <section className="section form-section"><div className="shell form-layout"><div><p className="kicker">Solicitud de servicio</p><h2>Describa el equipo y el estado operativo.</h2><p>Con esa información definiremos evaluación, cobertura, exclusiones y siguiente paso.</p></div><RequestForm kind="cotizacion" context={data.title} /></div></section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
