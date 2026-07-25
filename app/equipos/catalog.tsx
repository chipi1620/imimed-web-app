import Link from "next/link";
import type { Product } from "./data";

const categoryOrder = [
  "Rayos X",
  "Tomografía",
  "Resonancia",
  "Ultrasonido",
  "Arcos en C",
  "Mastografía",
];

const categoryDescriptions: Record<string, string> = {
  "Rayos X": "Sistemas digitales para radiografía general y salas de alto flujo.",
  Tomografía: "Plataformas de tomografía para rutina clínica y estudios avanzados.",
  Resonancia: "Sistemas de resonancia de alto campo para aplicaciones multidisciplinarias.",
  Ultrasonido: "Imagen portátil para evaluación clínica en el punto de atención.",
  "Arcos en C": "Fluoroscopía móvil para quirófano e intervencionismo.",
  Mastografía: "Soluciones para tamizaje, diagnóstico y procedimientos mamarios.",
};

function categoryId(category: string) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function Catalog({ products }: { products: Product[] }) {
  const groups = categoryOrder
    .map((category) => ({
      category,
      products: products.filter((product) => product.category === category),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <div className="shell imaging-catalog">
      <nav className="modality-nav" aria-label="Tipos de equipos de imagenología">
        <span>Explorar por tipo</span>
        <div>
          {groups.map(({ category }) => (
            <a href={`#${categoryId(category)}`} key={category}>
              {category}
            </a>
          ))}
        </div>
      </nav>

      {groups.map(({ category, products: categoryProducts }, groupIndex) => (
        <section className="modality-group" id={categoryId(category)} key={category}>
          <header className="modality-heading">
            <span className="mono">{String(groupIndex + 1).padStart(2, "0")}</span>
            <div>
              <h2>{category}</h2>
              <p>{categoryDescriptions[category]}</p>
            </div>
          </header>
          <div className="imaging-product-grid">
            {categoryProducts.map((product) => (
              <article className="imaging-product-card" key={product.slug}>
                <Link
                  className="imaging-product-image"
                  href={`/equipos/${product.slug}`}
                  style={{ backgroundImage: `url("${product.image}")` }}
                  aria-label={`Ver ${product.brand} ${product.model}`}
                >
                  <span>{product.brand}</span>
                </Link>
                <div className="imaging-product-content">
                  <p className="mono">{product.brand}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <dl>
                    {product.specs.slice(0, 3).map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="imaging-product-actions">
                    <Link className="inline-link" href={`/equipos/${product.slug}`}>
                      Ver equipo <span aria-hidden="true">↗</span>
                    </Link>
                    <Link className="button button-dark" href={`/equipos/${product.slug}#cotizar`}>
                      Cotizar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="image-disclaimer">
        Modelos y datos consultados en fuentes oficiales de cada fabricante.
        Disponibilidad, configuración y comercialización en México se confirman
        antes de emitir una propuesta.
      </p>
    </div>
  );
}
