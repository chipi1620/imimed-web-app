import type { Metadata } from "next";
import { Footer, Header } from "../page";
import { RequestForm } from "../request-form";

export const metadata: Metadata = { title: "Soporte técnico de equipo médico", description: "Reporte una falla con datos del equipo, condición operativa, criticidad, códigos y evidencia." };

export default function SupportPage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero support-hero"><div className="shell"><p className="kicker">Soporte técnico</p><h1>Reporte la condición real del equipo desde el primer contacto.</h1><p>Síntomas, códigos, fecha de inicio, criticidad y evidencia permiten priorizar y preparar una evaluación más útil.</p><div className="criticality-row"><span>Operativo con observaciones</span><span>Operación parcial</span><span>Fuera de servicio</span><span>Crítico detenido</span></div></div></section>
        <section className="section form-section"><div className="shell form-layout"><aside className="form-aside"><p className="eyebrow">Si el equipo representa un riesgo</p><h2>Detenga el uso conforme al protocolo de su institución.</h2><p>No continúe operando un equipo si existe riesgo para pacientes, usuarios o infraestructura. Este formulario no sustituye el proceso interno de seguridad ni la atención de emergencia.</p><a className="button button-dark" href="tel:+529619297841">Llamar a soporte</a></aside><RequestForm kind="soporte" /></div></section>
      </main>
      <Footer />
    </>
  );
}
