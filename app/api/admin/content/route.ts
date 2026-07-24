import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { contentItems } from "../../../../db/schema";

const kinds = new Set(["producto", "categoria", "marca", "servicio", "poliza", "proyecto", "articulo", "recurso", "fotografia", "faq", "contacto"]);
const statuses = new Set(["borrador", "publicado", "archivado", "vendido", "solo renta", "bajo pedido"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function authorized() {
  return Boolean(await getChatGPTUser());
}

export async function POST(request: Request) {
  if (!(await authorized())) return Response.json({ error: "No autorizado." }, { status: 401 });
  return write(request);
}

export async function PUT(request: Request) {
  if (!(await authorized())) return Response.json({ error: "No autorizado." }, { status: 401 });
  return write(request, true);
}

async function write(request: Request, update = false) {
  try {
    const input = await request.json() as Record<string, unknown>;
    const id = Number(input.id);
    const kind = clean(input.kind, 40);
    const slug = clean(input.slug, 120).toLowerCase();
    const title = clean(input.title, 180);
    const summary = clean(input.summary, 1200);
    const status = clean(input.status, 40);
    const payload = clean(input.payload, 50000);
    if (!kinds.has(kind) || !statuses.has(status) || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return Response.json({ error: "Revise tipo, estado, título y slug." }, { status: 400 });
    }
    JSON.parse(payload);
    const values = { kind, slug, title, summary, status, featured: Boolean(input.featured), payload, updatedAt: new Date() };
    const db = await getDb();
    const [item] = update && id
      ? await db.update(contentItems).set(values).where(eq(contentItems.id, id)).returning()
      : await db.insert(contentItems).values(values).returning();
    return Response.json({ item: { ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() } });
  } catch (error) {
    const message = error instanceof SyntaxError ? "El bloque de datos no contiene JSON válido." : "No fue posible guardar. Verifique que el slug no esté duplicado.";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return Response.json({ error: "No autorizado." }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "Identificador inválido." }, { status: 400 });
  await (await getDb()).delete(contentItems).where(eq(contentItems.id, id));
  return Response.json({ ok: true });
}
