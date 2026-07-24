import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../page";
import { RequestForm } from "../request-form";

export const metadata: Metadata = { title: "Pólizas de mantenimiento de equipo médico", description: "Cobertura preventiva, integral e institucional con alcance, exclusiones y tiempos de atención definidos." };

const rows = [
  ["Preventivos", "Programados", "Incluidos", "Por parque"],
  ["Correctivos", "No incluidos", "Incluidos", "Priorizados"],
  ["Mano de obra", "Preventiva", "Preventiva y correctiva", "Según matriz"],
  ["Refacciones", "No incluidas", "Opcionales", "Bolsa o alcance"],
  ["Tiempo de respuesta", "Programado", "Acordado", "SLA acordado"],
  ["Reportes técnicos", "Incluidos", "Incluidos", "Consolidables"],
  ["Cobertura", "Por equipo", "Por equipo", "Multiequipo"],
];

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero policy-hero"><div className="shell"><p className="kicker">Pólizas de mantenimiento</p><h1>La cobertura debe ser clara antes de que ocurra una falla.</h1><p>Configure frecuencia, prioridad, correctivos, refacciones, viáticos y exclusiones según el riesgo operativo de cada modalidad.</p><a className="button" href="#configurar">Configurar una póliza <span>↗</span></a></div></section>
        <section className="section"><div className="shell"><div className="split-heading"><div><p className="kicker">Comparador</p><h2>Tres puntos de partida.</h2></div><p>El alcance definitivo se formaliza por equipo, ubicación, condición y vigencia. Esta tabla no sustituye una propuesta técnica.</p></div>
          <div className="comparison-table">
            <div className="compare-head"><span>Alcance</span><strong>Preventiva</strong><strong>Integral</strong><strong>Institucional</strong></div>
            {rows.map((row) => <div key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span></div>)}
          </div>
        </div></section>
        <section className="section exclusions-band"><div className="shell dual-list"><div><p className="kicker">Transparencia</p><h2>Lo que la póliza puede cubrir.</h2><ul>{["Preventivos programados", "Correctivos dentro del alcance", "Mano de obra", "Prioridad de atención", "Reportes técnicos", "Escalamiento"].map((x) => <li key={x}>{x}</li>)}</ul></div><div className="exclusions"><p className="kicker">Debe quedar escrito</p><h2>Lo que no cubre.</h2><ul>{["Refacciones o consumibles no contratados", "Daño por factores externos", "Obra civil e instalaciones", "Software o licencias de terceros", "Equipos no incluidos", "Traslados fuera de cobertura"].map((x) => <li key={x}>{x}</li>)}</ul></div></div></section>
        <section className="section form-section" id="configurar"><div className="shell form-layout"><div><p className="kicker">Configuración inicial</p><h2>Describa el parque de equipos y la cobertura esperada.</h2><p>Revisaremos modalidades, ubicaciones, criticidad, historial y nivel de respuesta antes de proponer el alcance.</p><Link className="whatsapp-link" href={`https://wa.me/529619297841?text=${encodeURIComponent("Hola, deseo información sobre una póliza para equipo médico.")}`}>Consultar por WhatsApp</Link></div><RequestForm kind="poliza" /></div></section>
      </main>
      <Footer />
    </>
  );
}
