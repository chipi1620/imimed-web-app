import type { Metadata } from "next";
import { Footer, Header } from "../page";
import { RequestForm } from "../request-form";

export const metadata: Metadata = { title: "Solicitud de cotización", description: "Solicite una evaluación para venta, renta, mantenimiento, póliza o integración de equipo médico." };

export default function QuotePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero compact-hero"><div className="shell"><p className="kicker">Solicitud consultiva</p><h1>Primero entendemos la necesidad. Después cotizamos.</h1><p>La información técnica evita propuestas incompletas. Comparta lo que ya conoce; el equipo de IMIMED confirmará lo que falte.</p></div></section>
        <section className="section form-section"><div className="shell form-layout"><aside className="form-aside"><p className="eyebrow">Qué sucede después</p><ol><li><span>01</span>Revisamos la modalidad y el objetivo.</li><li><span>02</span>Confirmamos información faltante.</li><li><span>03</span>Definimos configuración y alcance.</li><li><span>04</span>Emitimos una propuesta técnica y comercial.</li></ol><p className="privacy-note">Enviar este formulario no genera una compra, reserva ni compromiso contractual.</p></aside><RequestForm kind="cotizacion" /></div></section>
      </main>
      <Footer />
    </>
  );
}
