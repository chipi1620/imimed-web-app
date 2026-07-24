import { getDb } from "../../../db";
import { requests } from "../../../db/schema";

const allowedTypes = new Set(["cotizacion", "soporte", "contacto", "poliza", "producto"]);
const allowedFileTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "video/mp4",
  "video/quicktime",
]);

function field(data: FormData, name: string, max = 5000) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

async function sendEmail(
  runtime: Record<string, unknown>,
  input: { to: string; subject: string; html: string },
) {
  const apiKey = typeof runtime.RESEND_API_KEY === "string" ? runtime.RESEND_API_KEY : "";
  const from = typeof runtime.IMIMED_FROM_EMAIL === "string" ? runtime.IMIMED_FROM_EMAIL : "";
  if (!apiKey || !from) return;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, ...input }),
  });
  if (!response.ok) throw new Error(`email provider returned ${response.status}`);
}

export async function POST(request: Request) {
  try {
    const { env } = await import("cloudflare:workers");
    const runtime = env as unknown as Record<string, unknown>;
    const data = await request.formData();
    if (field(data, "companyWebsite", 200)) {
      return Response.json({ ok: true, requestId: 0 }, { status: 201 });
    }

    const type = field(data, "type", 30);
    const name = field(data, "name", 120);
    const institution = field(data, "institution", 160);
    const email = field(data, "email", 160).toLowerCase();
    const phone = field(data, "phone", 30);
    const location = field(data, "location", 160);
    const description = field(data, "description");
    const urgency = field(data, "urgency", 100);

    if (!allowedTypes.has(type) || name.length < 3 || !institution || !email || phone.length < 8 || !location || description.length < 10 || !urgency) {
      return Response.json({ error: "Complete correctamente todos los campos requeridos." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "El correo no es válido." }, { status: 400 });
    }

    const attachmentKeys: string[] = [];
    const attachments = data.getAll("attachment").filter((value): value is File => value instanceof File && value.size > 0);
    if (attachments.length > 4) {
      return Response.json({ error: "Puede adjuntar un máximo de 4 archivos." }, { status: 400 });
    }
    for (const attachment of attachments) {
      if (attachment.size > 10 * 1024 * 1024) {
        return Response.json({ error: `El archivo ${attachment.name} supera 10 MB.` }, { status: 400 });
      }
      if (attachment.type && !allowedFileTypes.has(attachment.type)) {
        return Response.json({ error: `El formato de ${attachment.name} no está permitido.` }, { status: 400 });
      }
      const bucket = runtime.BUCKET as R2Bucket | undefined;
      if (!bucket) {
        return Response.json({ error: "El almacenamiento de archivos no está disponible." }, { status: 503 });
      }
      const safeName = attachment.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const attachmentKey = `requests/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
      await bucket.put(attachmentKey, attachment.stream(), {
        httpMetadata: { contentType: attachment.type || "application/octet-stream" },
      });
      attachmentKeys.push(attachmentKey);
    }

    const db = await getDb();
    const [created] = await db.insert(requests).values({
      type,
      name,
      institution,
      email,
      phone,
      role: field(data, "role", 100) || null,
      description,
      location,
      need: field(data, "need", 160) || null,
      urgency,
      equipment: field(data, "equipment", 160) || field(data, "equipmentReference", 160) || null,
      product: field(data, "product", 200) || null,
      brand: field(data, "brand", 100) || null,
      model: field(data, "model", 100) || null,
      category: field(data, "category", 100) || null,
      serial: field(data, "serial", 100) || null,
      errorCode: field(data, "errorCode", 120) || null,
      criticality: field(data, "criticality", 100) || null,
      startedAt: field(data, "startedAt", 20) || null,
      quantity: Number(field(data, "quantity", 4)) || null,
      operation: field(data, "operation", 40) || null,
      condition: field(data, "condition", 40) || null,
      estimatedDate: field(data, "estimatedDate", 80) || null,
      clinicalNeed: field(data, "clinicalNeed", 1200) || null,
      accessories: field(data, "accessories", 1200) || null,
      installationRequired: field(data, "installationRequired", 10) === "Sí",
      trainingRequired: field(data, "trainingRequired", 10) === "Sí",
      maintenanceRequired: field(data, "maintenanceRequired", 10) === "Sí",
      context: field(data, "context", 300) || null,
      sourceUrl: field(data, "sourceUrl", 1000) || null,
      attachmentKey: attachmentKeys.length ? JSON.stringify(attachmentKeys) : null,
    }).returning({ id: requests.id });

    const reference = `IM-${String(created.id).padStart(5, "0")}`;
    const notificationEmail = typeof runtime.IMIMED_NOTIFICATION_EMAIL === "string" ? runtime.IMIMED_NOTIFICATION_EMAIL : "";
    const summaryHtml = `
      <h1>Nueva solicitud ${escapeHtml(reference)}</h1>
      <p><strong>Tipo:</strong> ${escapeHtml(type)}</p>
      <p><strong>Contacto:</strong> ${escapeHtml(name)} · ${escapeHtml(institution)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)} · <strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Prioridad:</strong> ${escapeHtml(urgency)}</p>
      <p><strong>Necesidad:</strong> ${escapeHtml(field(data, "product", 200) || field(data, "need", 160))}</p>
      <p><strong>Descripción:</strong><br>${escapeHtml(description).replace(/\n/g, "<br>")}</p>
    `;
    const emails: Promise<void>[] = [
      sendEmail(runtime, {
        to: email,
        subject: `Recibimos su solicitud ${reference}`,
        html: `<h1>Solicitud recibida</h1><p>Gracias, ${escapeHtml(name)}. Registramos su solicitud con el folio <strong>${reference}</strong>.</p><p>El equipo técnico o comercial revisará la información y confirmará el siguiente paso.</p><p>Este mensaje confirma la recepción; no representa una cotización ni un compromiso contractual.</p>`,
      }),
    ];
    if (notificationEmail) {
      emails.push(sendEmail(runtime, { to: notificationEmail, subject: `Nueva solicitud ${reference} · ${type}`, html: summaryHtml }));
    }
    await Promise.allSettled(emails);

    return Response.json({ ok: true, requestId: created.id }, { status: 201 });
  } catch (error) {
    console.error("request submission failed", error);
    return Response.json({ error: "No fue posible registrar la solicitud. Intente nuevamente." }, { status: 500 });
  }
}
