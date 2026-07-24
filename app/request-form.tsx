"use client";

import { useState } from "react";

type FormKind = "cotizacion" | "soporte" | "contacto" | "poliza" | "producto";

export function RequestForm({
  kind,
  product,
  context,
}: {
  kind: FormKind;
  product?: { name: string; brand: string; model: string; category: string };
  context?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isSupport = kind === "soporte";
  const isProduct = kind === "producto" && Boolean(product);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.set("type", kind);
    payload.set("sourceUrl", window.location.href);
    if (context) payload.set("context", context);
    if (product) {
      payload.set("product", product.name);
      payload.set("brand", product.brand);
      payload.set("model", product.model);
      payload.set("category", product.category);
    }

    try {
      const response = await fetch("/api/requests", { method: "POST", body: payload });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "No fue posible registrar la solicitud.");
      form.reset();
      setStatus("success");
      setMessage(`Solicitud IM-${String(result.requestId).padStart(5, "0")} recibida. Revisaremos la información y nos pondremos en contacto.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No fue posible enviar la solicitud.");
    }
  }

  return (
    <form className="request-form" onSubmit={submit} encType="multipart/form-data">
      <label className="form-honeypot" aria-hidden="true">
        Sitio web
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>
      {product && (
        <div className="form-context">
          <span className="eyebrow">Equipo consultado</span>
          <strong>{product.brand} {product.model}</strong>
          <small>{product.category}</small>
        </div>
      )}
      {context && <input type="hidden" name="context" value={context} />}
      <div className="form-grid">
        <label>
          <span>Nombre completo *</span>
          <input name="name" autoComplete="name" minLength={3} maxLength={120} required />
        </label>
        <label>
          <span>Institución o empresa *</span>
          <input name="institution" autoComplete="organization" minLength={2} maxLength={160} required />
        </label>
        <label>
          <span>Puesto o área</span>
          <input name="role" autoComplete="organization-title" maxLength={100} />
        </label>
        <label>
          <span>Correo *</span>
          <input name="email" type="email" autoComplete="email" maxLength={160} required />
        </label>
        <label>
          <span>Teléfono *</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} required />
        </label>
        <label>
          <span>Ciudad y estado *</span>
          <input name="location" autoComplete="address-level1" maxLength={160} required />
        </label>
        <label>
          <span>{isSupport ? "Tipo de equipo" : "Tipo de necesidad"} *</span>
          <select name="need" required defaultValue={isProduct ? "Compra o renta de equipo" : ""}>
            <option value="" disabled>Seleccione una opción</option>
            {isSupport ? (
              <>
                <option>Rayos X / Fluoroscopía</option>
                <option>Tomografía / Resonancia</option>
                <option>Ultrasonido</option>
                <option>Anestesia / Monitoreo</option>
                <option>Esterilización</option>
                <option>Otro equipo</option>
              </>
            ) : (
              <>
                <option>Compra o renta de equipo</option>
                <option>Mantenimiento preventivo</option>
                <option>Mantenimiento correctivo</option>
                <option>Póliza de mantenimiento</option>
                <option>Instalación / Integración</option>
                <option>DICOM / PACS</option>
                <option>Proyecto institucional</option>
              </>
            )}
          </select>
        </label>
        <label>
          <span>Nivel de urgencia *</span>
          <select name="urgency" required defaultValue="">
            <option value="" disabled>Seleccione prioridad</option>
            <option>Planeación / sin urgencia</option>
            <option>Atención en 5 a 10 días</option>
            <option>Atención prioritaria</option>
            <option>Equipo crítico detenido</option>
          </select>
        </label>
        {isSupport && (
          <>
            <label><span>Marca</span><input name="brand" maxLength={100} /></label>
            <label><span>Modelo</span><input name="model" maxLength={100} /></label>
            <label><span>Número de serie</span><input className="mono-input" name="serial" maxLength={100} /></label>
            <label><span>Código de error</span><input className="mono-input" name="errorCode" maxLength={120} /></label>
            <label>
              <span>Estado operativo *</span>
              <select name="criticality" required defaultValue="">
                <option value="" disabled>Seleccione criticidad</option>
                <option>Operativo con observaciones</option>
                <option>Operación parcial</option>
                <option>Fuera de servicio</option>
                <option>Equipo crítico detenido</option>
              </select>
            </label>
            <label><span>Fecha de inicio</span><input type="date" name="startedAt" /></label>
          </>
        )}
        {!isSupport && !isProduct && (
          <>
            <label><span>Equipo o modalidad</span><input name="equipment" maxLength={160} placeholder="Ej. tomógrafo, ultrasonido, sala de RX" /></label>
            <label><span>Marca y modelo</span><input name="equipmentReference" maxLength={160} /></label>
          </>
        )}
        {isProduct && (
          <>
            <label><span>Cantidad requerida *</span><input name="quantity" type="number" min="1" max="99" defaultValue="1" required /></label>
            <label>
              <span>Operación *</span>
              <select name="operation" required><option>Compra</option><option>Renta</option><option>Evaluar ambas</option></select>
            </label>
            <label>
              <span>Condición preferida *</span>
              <select name="condition" required><option>Indistinta</option><option>Nuevo</option><option>Seminuevo</option><option>Reacondicionado</option></select>
            </label>
            <label>
              <span>Fecha estimada de compra</span>
              <select name="estimatedDate" defaultValue="">
                <option value="">Aún no definida</option><option>0 a 30 días</option><option>1 a 3 meses</option><option>3 a 6 meses</option><option>Más de 6 meses</option>
              </select>
            </label>
            <label className="span-2"><span>Necesidad clínica</span><textarea name="clinicalNeed" rows={3} maxLength={1200} /></label>
            <label className="span-2"><span>Accesorios o configuración requerida</span><textarea name="accessories" rows={3} maxLength={1200} /></label>
            <fieldset className="span-2 form-options">
              <legend>Servicios requeridos</legend>
              <label><input type="checkbox" name="installationRequired" value="Sí" /> Instalación</label>
              <label><input type="checkbox" name="trainingRequired" value="Sí" /> Capacitación</label>
              <label><input type="checkbox" name="maintenanceRequired" value="Sí" /> Póliza de mantenimiento</label>
            </fieldset>
          </>
        )}
        <label className="span-2">
          <span>{isSupport ? "Descripción de la falla" : isProduct ? "Comentarios" : "Equipo, proyecto o necesidad"} *</span>
          <textarea name="description" rows={6} minLength={10} maxLength={5000} required />
        </label>
        <label className="span-2 file-field">
          <span>Archivos de referencia</span>
          <input name="attachment" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.mp4,.mov" />
          <small>Hasta 4 fotografías, videos o documentos; máximo 10 MB por archivo.</small>
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" required name="privacy" />
        <span>Acepto el tratamiento de mis datos conforme al aviso de privacidad.</span>
      </label>
      <button className="button button-dark" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : isSupport ? "Enviar reporte técnico" : isProduct ? "Enviar solicitud de cotización" : "Solicitar evaluación"}
        <span aria-hidden="true">↗</span>
      </button>
      <div className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
        {status === "error" && <> También puede llamar al <a href="tel:+529619297841">+52 961 929 7841</a>.</>}
      </div>
    </form>
  );
}
