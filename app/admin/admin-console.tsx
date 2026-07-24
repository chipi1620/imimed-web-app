"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type RequestRow = {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  need: string;
  urgency: string;
  status: string;
  createdAt: string;
};

type ContentRow = {
  id: number;
  kind: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  featured: boolean;
  payload: string;
  createdAt: string;
  updatedAt: string;
};

const kinds = [
  ["producto", "Productos"],
  ["categoria", "Categorías"],
  ["marca", "Marcas"],
  ["servicio", "Servicios"],
  ["poliza", "Pólizas"],
  ["proyecto", "Proyectos"],
  ["articulo", "Artículos"],
  ["recurso", "Recursos"],
  ["fotografia", "Fotografías"],
  ["faq", "Preguntas frecuentes"],
  ["contacto", "Información de contacto"],
] as const;

const productTemplate = {
  slug: "nuevo-equipo",
  brand: "Marca por confirmar",
  model: "Modelo",
  name: "Nombre del equipo",
  category: "Categoría",
  application: "Aplicación clínica",
  specialty: "Especialidad",
  condition: "Nuevo",
  operation: "Venta",
  mobility: "Móvil",
  availability: "Bajo pedido",
  image: "/media/diagnostic-detail.png",
  description: "Descripción técnica breve.",
  benefits: ["Beneficio operativo"],
  specs: [["Configuración", "Por confirmar"]],
  configurations: ["Configuración disponible"],
  included: ["Elemento incluido"],
  optional: ["Elemento opcional"],
  warranty: "Cobertura por confirmar.",
  documents: ["Ficha técnica"],
  faqs: [{ question: "Pregunta frecuente", answer: "Respuesta verificable." }],
};

export function AdminConsole({
  user,
  signOutHref,
  unavailable,
  initialRequests,
  initialContent,
}: {
  user: { displayName: string };
  signOutHref: string;
  unavailable: boolean;
  initialRequests: RequestRow[];
  initialContent: ContentRow[];
}) {
  const [tab, setTab] = useState<"solicitudes" | "contenido">("solicitudes");
  const [requestRows, setRequestRows] = useState(initialRequests);
  const [contentRows, setContentRows] = useState(initialContent);
  const [kindFilter, setKindFilter] = useState("");
  const [editing, setEditing] = useState<ContentRow | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleContent = useMemo(
    () => contentRows.filter((item) => !kindFilter || item.kind === kindFilter),
    [contentRows, kindFilter],
  );

  async function updateRequestStatus(id: number, status: string) {
    const response = await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setNotice("No fue posible actualizar la solicitud.");
      return;
    }
    setRequestRows((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    setNotice("Estado actualizado.");
  }

  async function saveContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = String(form.get("payload") || "{}");
    try {
      JSON.parse(payload);
    } catch {
      setNotice("El bloque de datos no contiene JSON válido.");
      return;
    }
    const body = {
      id: editing?.id,
      kind: form.get("kind"),
      slug: form.get("slug"),
      title: form.get("title"),
      summary: form.get("summary"),
      status: form.get("status"),
      featured: form.get("featured") === "on",
      payload,
    };
    const response = await fetch("/api/admin/content", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setNotice(result.error || "No fue posible guardar el contenido.");
      return;
    }
    setContentRows((rows) => {
      const without = rows.filter((item) => item.id !== result.item.id);
      return [result.item, ...without];
    });
    setEditing(null);
    setShowEditor(false);
    setNotice("Contenido guardado.");
  }

  async function removeContent(item: ContentRow) {
    if (!window.confirm(`Eliminar “${item.title}”? Esta acción no se puede deshacer.`)) return;
    const response = await fetch(`/api/admin/content?id=${item.id}`, { method: "DELETE" });
    if (!response.ok) {
      setNotice("No fue posible eliminar el contenido.");
      return;
    }
    setContentRows((rows) => rows.filter((row) => row.id !== item.id));
    setNotice("Contenido eliminado.");
  }

  function beginCreate() {
    setEditing(null);
    setShowEditor(true);
    setNotice("");
  }

  function beginEdit(item: ContentRow) {
    setEditing(item);
    setShowEditor(true);
    setNotice("");
  }

  if (unavailable) {
    return <main className="admin-page"><div className="admin-empty"><strong>La base de datos no está disponible en este entorno.</strong><p>Ejecute las migraciones o revise la vinculación D1 antes de administrar contenido.</p><Link href="/">Volver al sitio</Link></div></main>;
  }

  return (
    <main className="admin-page">
      <header>
        <div><span className="eyebrow">IMIMED CMS</span><h1>Control de contenido y solicitudes</h1></div>
        <div className="admin-user"><span>{user.displayName}</span><Link href="/">Ver sitio</Link><Link href={signOutHref}>Cerrar sesión</Link></div>
      </header>
      <nav aria-label="Secciones de administración">
        <button className={tab === "solicitudes" ? "active" : ""} onClick={() => setTab("solicitudes")}>Solicitudes <span>{requestRows.length}</span></button>
        <button className={tab === "contenido" ? "active" : ""} onClick={() => setTab("contenido")}>Contenido <span>{contentRows.length}</span></button>
      </nav>
      {notice && <div className="admin-notice" role="status">{notice}</div>}

      {tab === "solicitudes" && (
        <section>
          <div className="admin-section-head"><div><span className="eyebrow">Bandeja operativa</span><h2>Solicitudes recibidas</h2></div><p>Actualice el estado para mantener trazabilidad comercial y técnica.</p></div>
          <div className="admin-table">
            <div className="admin-row admin-head"><span>Folio</span><span>Tipo</span><span>Contacto</span><span>Institución</span><span>Necesidad</span><span>Prioridad</span><span>Estado</span><span>Fecha</span></div>
            {requestRows.map((row) => (
              <div className="admin-row" key={row.id}>
                <span className="mono">IM-{String(row.id).padStart(5, "0")}</span>
                <span>{row.type}</span>
                <span><strong>{row.name}</strong><small>{row.email}</small><small>{row.phone}</small></span>
                <span>{row.institution}</span>
                <span>{row.need}</span>
                <span>{row.urgency}</span>
                <span><select aria-label={`Estado de solicitud ${row.id}`} value={row.status} onChange={(event) => updateRequestStatus(row.id, event.target.value)}><option>nuevo</option><option>en revisión</option><option>contactado</option><option>cotizado</option><option>cerrado</option></select></span>
                <span>{new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(row.createdAt))}</span>
              </div>
            ))}
            {requestRows.length === 0 && <div className="admin-empty">Aún no hay solicitudes registradas.</div>}
          </div>
        </section>
      )}

      {tab === "contenido" && (
        <section>
          <div className="admin-section-head">
            <div><span className="eyebrow">Contenido editable</span><h2>Biblioteca del sitio</h2></div>
            <div className="admin-toolbar"><select aria-label="Filtrar por tipo" value={kindFilter} onChange={(event) => setKindFilter(event.target.value)}><option value="">Todos los tipos</option>{kinds.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><button className="button button-dark" onClick={beginCreate}>Nuevo contenido</button></div>
          </div>
          <div className="content-admin-list">
            {visibleContent.map((item) => (
              <article key={item.id}>
                <div><span className="mono">{item.kind} · {item.status}</span><h3>{item.title}</h3><p>{item.summary || "Sin resumen"}</p></div>
                <div><small>/{item.slug}</small>{item.featured && <span className="admin-badge">Destacado</span>}</div>
                <div><button onClick={() => beginEdit(item)}>Editar</button><button className="danger" onClick={() => removeContent(item)}>Eliminar</button></div>
              </article>
            ))}
            {visibleContent.length === 0 && <div className="admin-empty">No hay contenido de este tipo.</div>}
          </div>
        </section>
      )}

      {showEditor && (
        <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="content-editor-title">
          <form onSubmit={saveContent}>
            <div className="admin-modal-head"><div><span className="eyebrow">Editor</span><h2 id="content-editor-title">{editing ? "Editar contenido" : "Nuevo contenido"}</h2></div><button type="button" onClick={() => setShowEditor(false)} aria-label="Cerrar editor">Cerrar</button></div>
            <div className="form-grid">
              <label><span>Tipo *</span><select name="kind" defaultValue={editing?.kind || "producto"} required>{kinds.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
              <label><span>Estado *</span><select name="status" defaultValue={editing?.status || "borrador"} required><option>borrador</option><option>publicado</option><option>archivado</option><option>vendido</option><option>solo renta</option><option>bajo pedido</option></select></label>
              <label><span>Título *</span><input name="title" defaultValue={editing?.title || ""} required /></label>
              <label><span>Slug *</span><input name="slug" className="mono-input" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={editing?.slug || ""} required /></label>
              <label className="span-2"><span>Resumen</span><textarea name="summary" rows={3} defaultValue={editing?.summary || ""} /></label>
              <label className="span-2"><span>Datos estructurados (JSON) *</span><textarea className="admin-json" name="payload" rows={18} defaultValue={editing?.payload || JSON.stringify(productTemplate, null, 2)} required /><small>Para productos, mantenga todos los campos del ejemplo. Otros tipos pueden guardar un objeto JSON libre.</small></label>
            </div>
            <label className="consent"><input type="checkbox" name="featured" defaultChecked={editing?.featured || false} /><span>Marcar como destacado</span></label>
            <div className="admin-modal-actions"><button type="button" onClick={() => setShowEditor(false)}>Cancelar</button><button className="button button-dark" type="submit">Guardar contenido</button></div>
          </form>
        </div>
      )}
    </main>
  );
}
