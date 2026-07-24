import type { Metadata } from "next";
import { Footer, Header } from "../page";
import { Catalog } from "./catalog";
import { getPublicProducts } from "./product-source";

export const metadata: Metadata = {
  title: "Equipos médicos en México",
  description: "Catálogo consultivo de equipos médicos para venta o renta, con instalación, capacitación y soporte técnico.",
  alternates: { canonical: "/equipos" },
};

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const products = await getPublicProducts();
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="inner-hero catalog-hero"><div className="shell"><p className="kicker">Catálogo consultivo</p><h1>El equipo correcto depende de todo lo que lo rodea.</h1><p>Filtre una primera selección. Antes de cotizar confirmamos aplicación clínica, infraestructura, condición, accesorios y soporte requerido.</p></div></section>
        <section className="section catalog-section">
          <Catalog products={products} />
        </section>
      </main>
      <Footer />
    </>
  );
}
