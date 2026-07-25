import type { Metadata } from "next";
import { Footer, Header } from "../page";
import { Catalog } from "./catalog";
import { getPublicProducts } from "./product-source";

export const metadata: Metadata = {
  title: "Equipos de imagenología en México",
  description: "Equipos reales de Rayos X, tomografía, resonancia, ultrasonido, arcos en C y mastografía, con instalación y soporte técnico.",
  alternates: { canonical: "/equipos" },
};

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const products = await getPublicProducts();
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero catalog-hero"><div className="shell"><p className="kicker">Equipos de imagenología</p><h1>Modalidades reales, configuradas para su operación.</h1><p>Explore equipos vigentes por tipo de imagen. Antes de cotizar confirmamos aplicación clínica, infraestructura, accesorios, disponibilidad y soporte requerido.</p></div></section>
        <section className="section catalog-section">
          <Catalog products={products} />
        </section>
      </main>
      <Footer />
    </>
  );
}
