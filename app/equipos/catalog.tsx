"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "./data";

function unique(products: Product[], key: keyof Product) {
  return [...new Set(products.map((product) => String(product[key])))].sort();
}

export function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [application, setApplication] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [operation, setOperation] = useState("");
  const [mobility, setMobility] = useState("");
  const [availability, setAvailability] = useState("");
  const [specialty, setSpecialty] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const searchable = `${product.name} ${product.brand} ${product.model} ${product.category} ${product.application}`.toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!category || product.category === category) &&
        (!application || product.application === application) &&
        (!brand || product.brand === brand) &&
        (!condition || product.condition.toLowerCase().includes(condition.toLowerCase())) &&
        (!operation || product.operation.toLowerCase().includes(operation.toLowerCase())) &&
        (!mobility || product.mobility === mobility) &&
        (!availability || product.availability === availability) &&
        (!specialty || product.specialty === specialty)
      );
    });
  }, [application, availability, brand, category, condition, mobility, operation, products, query, specialty]);

  function reset() {
    setQuery("");
    setCategory("");
    setApplication("");
    setBrand("");
    setCondition("");
    setOperation("");
    setMobility("");
    setAvailability("");
    setSpecialty("");
  }

  return (
    <div className="shell catalog-layout">
      <aside className="filters">
        <p className="eyebrow">Filtrar catálogo</p>
        <label className="filter-search">
          <span>Marca, modelo o equipo</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Ej. ultrasonido" />
        </label>
        <label>
          <span>Categoría</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">Todas</option>
            {unique(products, "category").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Aplicación clínica</span>
          <select value={application} onChange={(event) => setApplication(event.target.value)}>
            <option value="">Todas</option>
            {unique(products, "application").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Marca</span>
          <select value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="">Todas</option>
            {unique(products, "brand").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Condición</span>
          <select value={condition} onChange={(event) => setCondition(event.target.value)}>
            <option value="">Cualquiera</option><option>Nuevo</option><option>Seminuevo</option><option>Reacondicionado</option>
          </select>
        </label>
        <label>
          <span>Operación</span>
          <select value={operation} onChange={(event) => setOperation(event.target.value)}>
            <option value="">Venta o renta</option><option>Venta</option><option>Renta</option>
          </select>
        </label>
        <label>
          <span>Formato</span>
          <select value={mobility} onChange={(event) => setMobility(event.target.value)}>
            <option value="">Cualquiera</option>
            {unique(products, "mobility").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Especialidad</span>
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
            <option value="">Todas</option>
            {unique(products, "specialty").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Disponibilidad</span>
          <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
            <option value="">Cualquiera</option>
            {unique(products, "availability").map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <button className="filter-reset" type="button" onClick={reset}>Limpiar filtros</button>
        <p className="filter-note">La disponibilidad se confirma directamente. No mostramos inventario ni precios sin verificar.</p>
      </aside>
      <div>
        <div className="catalog-summary"><strong>{filtered.length} {filtered.length === 1 ? "configuración" : "configuraciones"} de referencia</strong><span>Sin precios ni compra en línea</span></div>
        <div className="product-list" aria-live="polite">
          {filtered.map((product) => (
            <article key={product.slug}>
              <Link className="product-image" href={`/equipos/${product.slug}`} style={{ backgroundImage: `linear-gradient(0deg,rgba(6,28,33,.3),transparent),url("${product.image}")` }} aria-label={`Ver ${product.name}`} />
              <div className="product-info">
                <div className="product-meta"><span>{product.category}</span><span>{product.condition}</span></div>
                <p className="mono">{product.brand} · {product.model}</p>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-status"><span>{product.operation}</span><span>{product.mobility}</span><span>{product.availability}</span></div>
                <div className="product-actions"><Link className="inline-link" href={`/equipos/${product.slug}`}>Ver equipo <span>↗</span></Link><Link className="button button-dark" href={`/equipos/${product.slug}#cotizar`}>Solicitar cotización</Link></div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <div className="catalog-empty"><strong>No hay una configuración publicada con esos filtros.</strong><p>La ausencia del catálogo no significa que no podamos conseguirla. Envíe la modalidad y aplicación requerida.</p><Link className="button button-dark" href="/cotizacion">Solicitar búsqueda</Link></div>}
        </div>
        <p className="image-disclaimer">Imágenes de referencia preparadas para sustitución por fotografía real y autorizada de cada equipo.</p>
      </div>
    </div>
  );
}
