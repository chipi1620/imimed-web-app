import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../page";
import { RequestForm } from "../request-form";

type PageData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; copy: string; items?: string[] }[];
};

const pages: Record<string, PageData> = {
  soluciones: {
    eyebrow: "Soluciones por necesidad",
    title: "La tecnología funciona cuando las decisiones están conectadas.",
    intro: "IMIMED integra adquisición, servicio e interoperabilidad para que cada decisión técnica responda a la operación clínica y no a una urgencia aislada.",
    sections: [
      { title: "Mantener", copy: "Reducir fallas inesperadas, conocer el estado real del activo y sostener su disponibilidad.", items: ["Mantenimiento preventivo", "Diagnóstico y correctivo", "Pólizas y refacciones", "Reportes técnicos"] },
      { title: "Equipar", copy: "Seleccionar una configuración por aplicación, infraestructura, presupuesto y soporte posterior.", items: ["Venta y renta", "Nuevo, seminuevo o reacondicionado", "Instalación", "Capacitación"] },
      { title: "Integrar", copy: "Conectar modalidades, archivo e información clínica con trazabilidad.", items: ["DICOM / PACS", "Puesta en marcha", "Modernización", "Consultoría de ingeniería clínica"] },
    ],
  },
  servicios: {
    eyebrow: "Ingeniería de campo",
    title: "Servicio técnico orientado a disponibilidad, seguridad y evidencia.",
    intro: "El alcance se define por modalidad, condición del equipo, criticidad y resultado esperado. Cada intervención concluye con documentación técnica.",
    sections: [
      { title: "Preventivo", copy: "Inspección, limpieza técnica, pruebas funcionales y detección de desgaste antes de una interrupción.", items: ["Programa por modalidad", "Lista de verificación", "Reporte de hallazgos", "Recomendaciones priorizadas"] },
      { title: "Correctivo", copy: "Diagnóstico de causa, pruebas dirigidas y recuperación documentada de la operación.", items: ["Evaluación inicial", "Aislamiento de falla", "Cotización de alcance", "Validación operativa"] },
      { title: "Implementación", copy: "Recepción, instalación, configuración, integración y capacitación para iniciar operación correctamente.", items: ["Site planning", "Puesta en marcha", "DICOM / PACS", "Transferencia de conocimiento"] },
    ],
  },
  proyectos: {
    eyebrow: "Proyectos y casos",
    title: "Resultados técnicos que pueden explicarse y verificarse.",
    intro: "Publicamos únicamente proyectos con autorización y evidencia suficiente. Cada caso separa con claridad el problema, diagnóstico, intervención y resultado.",
    sections: [
      { title: "Recuperación operativa", copy: "Casos de diagnóstico y mantenimiento correctivo en modalidades de imagenología.", items: ["Condición inicial", "Pruebas realizadas", "Componentes intervenidos", "Validación final"] },
      { title: "Instalación e integración", copy: "Puesta en marcha de equipos y conectividad clínica dentro de la infraestructura existente.", items: ["Levantamiento", "Requisitos técnicos", "Configuración", "Capacitación"] },
      { title: "Evidencia antes que publicidad", copy: "No publicamos testimonios, logos, tiempos ni resultados que no puedan comprobarse.", items: ["Fotografías autorizadas", "Reportes anonimizados", "Alcance real", "Limitaciones explícitas"] },
    ],
  },
  recursos: {
    eyebrow: "Recursos técnicos",
    title: "Criterios para tomar mejores decisiones sobre equipo médico.",
    intro: "Guías breves para compradores institucionales, responsables de ingeniería clínica y administradores de servicios de diagnóstico.",
    sections: [
      { title: "Cómo elegir una póliza de mantenimiento", copy: "Compare alcance, exclusiones, tiempos de respuesta, viáticos y cobertura de refacciones; el número de preventivos por sí solo no define una buena póliza." },
      { title: "Antes de comprar reacondicionado", copy: "Verifique historial, condición, configuración, horas de uso, disponibilidad de partes, garantía y requisitos de instalación." },
      { title: "Preventivo vs. correctivo", copy: "El preventivo administra desgaste y riesgo; el correctivo recupera la función después de una falla. Confundirlos genera expectativas y presupuestos irreales." },
      { title: "Integración DICOM / PACS", copy: "Documente AE Title, IP, puerto, modalidad, Storage Commitment, Worklist y flujo de lectura antes de iniciar cambios." },
    ],
  },
  nosotros: {
    eyebrow: "IMIMED",
    title: "Ingeniería médica con responsabilidad sobre todo el ciclo de vida.",
    intro: "No nos definimos por un catálogo. Nuestra función es ayudar a adquirir, mantener e integrar tecnología con decisiones técnicamente defendibles.",
    sections: [
      { title: "Cómo trabajamos", copy: "Partimos de la necesidad clínica, revisamos el contexto técnico, delimitamos el alcance y documentamos el resultado.", items: ["Diagnóstico antes de proponer", "Exclusiones claras", "Trazabilidad", "Seguimiento posterior"] },
      { title: "Capacidades", copy: "Ingeniería de campo multimarcas con experiencia en imagenología, instalación, documentación e integración clínica y digital.", items: ["Imagenología", "Anestesia y monitoreo", "Equipamiento hospitalario", "DICOM / PACS"] },
      { title: "Relación con fabricantes", copy: "La experiencia técnica con una marca no implica distribución autorizada. Cualquier relación comercial se comunica únicamente cuando puede verificarse." },
    ],
  },
  contacto: {
    eyebrow: "Contacto",
    title: "Hable con el equipo adecuado desde el primer contacto.",
    intro: "Comparta el tipo de institución, modalidad y necesidad. Dirigiremos la solicitud a servicio técnico, proyectos o equipo comercial.",
    sections: [],
  },
  "aviso-de-privacidad": {
    eyebrow: "Información legal",
    title: "Aviso de privacidad.",
    intro: "IMIMED tratará los datos enviados mediante sus formularios únicamente para atender solicitudes comerciales, técnicas y de servicio.",
    sections: [
      { title: "Datos recabados", copy: "Nombre, institución, información de contacto, ubicación general y datos técnicos proporcionados voluntariamente." },
      { title: "Finalidad", copy: "Evaluar solicitudes, preparar cotizaciones, coordinar atención técnica y mantener comunicación relacionada con el servicio." },
      { title: "Derechos ARCO", copy: "El titular podrá solicitar acceso, rectificación, cancelación u oposición mediante los canales de contacto publicados en este sitio." },
    ],
  },
  terminos: {
    eyebrow: "Información legal",
    title: "Términos y condiciones.",
    intro: "La información del sitio es orientativa. Una cotización, póliza o servicio sólo adquiere validez mediante un documento comercial o contractual emitido por IMIMED.",
    sections: [
      { title: "Disponibilidad", copy: "Los equipos mostrados pueden estar disponibles, bajo pedido, vendidos o sujetos a confirmación técnica y comercial." },
      { title: "Especificaciones", copy: "Configuraciones, accesorios, garantía, alcance e instalación deben confirmarse por escrito antes de contratar." },
      { title: "Marcas", copy: "Las marcas pertenecen a sus respectivos titulares. Su mención describe compatibilidad o experiencia y no implica autorización comercial." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  const contact = slug === "contacto";

  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero">
          <div className="shell">
            <p className="kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
        </section>
        {page.sections.length > 0 && (
          <section className="section">
            <div className="shell content-sections">
              {page.sections.map((section, index) => (
                <article id={section.title.toLowerCase()} key={section.title}>
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.copy}</p>
                    {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        {contact ? (
          <section className="section form-section"><div className="shell narrow"><RequestForm kind="contacto" /></div></section>
        ) : (
          <section className="inner-cta"><div className="shell"><h2>Definamos el siguiente paso.</h2><p>Comparta la modalidad, necesidad o proyecto para preparar una evaluación inicial.</p><Link className="button button-light" href="/cotizacion">Solicitar evaluación <span>↗</span></Link></div></section>
        )}
      </main>
      <Footer />
    </>
  );
}
