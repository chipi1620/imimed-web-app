import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../page";
import { RequestForm } from "../../request-form";
import { products as seedProducts } from "../data";
import { getPublicProduct, getPublicProducts } from "../product-source";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  return product
    ? {
        title: `${product.name} | ${product.model}`,
        description: product.description,
        alternates: { canonical: `/equipos/${product.slug}` },
        openGraph: { title: product.name, description: product.description, images: [product.image] },
      }
    : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  if (!product) notFound();
  const related = (await getPublicProducts())
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    model: product.model,
    image: product.image,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    description: product.description,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://imimed.mx" },
      { "@type": "ListItem", position: 2, name: "Equipos", item: "https://imimed.mx/equipos" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://imimed.mx/equipos/${product.slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Header />
      <main id="contenido">
        <nav className="breadcrumbs shell" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/equipos">Equipos</Link><span>/</span><span>{product.name}</span></nav>
        <section className="product-hero shell">
          <div className="product-gallery" style={{ backgroundImage: `linear-gradient(0deg,rgba(6,28,33,.42),transparent),url("${product.image}")` }}><span className="mono">Imagen de referencia · sustituible desde CMS</span></div>
          <div className="product-summary">
            <p className="kicker">{product.category}</p>
            <p className="mono">{product.brand} · {product.model}</p>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="product-status"><span>{product.condition}</span><span>{product.operation}</span><span>{product.availability}</span></div>
            <a className="button button-dark" href="#cotizar">Solicitar cotización <span>↗</span></a>
            <a className="whatsapp-link" href={`https://wa.me/529619297841?text=${encodeURIComponent(`Hola, estoy interesado en cotizar el equipo ${product.brand} ${product.model} que aparece en su página.`)}`}>Consultar por WhatsApp</a>
          </div>
        </section>
        <section className="section"><div className="shell product-detail">
          <div><p className="kicker">Aplicación clínica</p><h2>{product.application}</h2><p>La configuración final se define con el usuario clínico y el responsable técnico antes de emitir una propuesta.</p><h3>Beneficios operativos</h3><ul>{product.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="spec-table"><p className="eyebrow">Especificación inicial</p>{product.specs.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        </div></section>
        <section className="section clinical-bg"><div className="shell product-included"><div><p className="kicker">Configuración</p><h2>Definida alrededor de la aplicación.</h2><p>{product.warranty}</p></div><div className="included-grid">{product.configurations.map((item, index) => <div key={item}><span className="mono">{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></div></section>
        <section className="section"><div className="shell product-scope">
          <div><p className="kicker">Incluido por confirmar</p><h2>Componentes de la propuesta.</h2><ul>{product.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><p className="kicker">Opcionales</p><h2>Servicios y accesorios.</h2><ul>{product.optional.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><p className="kicker">Documentos</p><h2>Información descargable.</h2><ul>{product.documents.map((item) => <li key={item}>{item} <small>Disponible al cotizar</small></li>)}</ul></div>
        </div></section>
        <section className="section faq-section"><div className="shell faq-layout"><div><p className="kicker">Preguntas frecuentes</p><h2>Lo que conviene confirmar antes de decidir.</h2></div><div>{product.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
        {related.length > 0 && <section className="section related-products"><div className="shell"><p className="kicker">Equipos relacionados</p><div className="related-grid">{related.map((item) => <Link href={`/equipos/${item.slug}`} key={item.slug}><span className="mono">{item.category}</span><strong>{item.name}</strong><span>{item.model} ↗</span></Link>)}</div></div></section>}
        <section className="section form-section" id="cotizar"><div className="shell form-layout"><div><p className="kicker">Cotización consultiva</p><h2>Confirme la configuración que necesita.</h2><p>El formulario registra automáticamente este equipo y la página de origen. No crea una compra ni reserva inventario.</p></div><RequestForm kind="producto" product={{ name: product.name, brand: product.brand, model: product.model, category: product.category }} /></div></section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
