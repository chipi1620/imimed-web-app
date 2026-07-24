import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { requests } from "../../../../db/schema";

const statuses = new Set(["nuevo", "en revisión", "contactado", "cotizado", "cerrado"]);

export async function PATCH(request: Request) {
  if (!(await getChatGPTUser())) return Response.json({ error: "No autorizado." }, { status: 401 });
  const input = await request.json() as { id?: number; status?: string };
  const id = Number(input.id);
  const status = typeof input.status === "string" ? input.status : "";
  if (!id || !statuses.has(status)) return Response.json({ error: "Datos inválidos." }, { status: 400 });
  await (await getDb()).update(requests).set({ status }).where(eq(requests.id, id));
  return Response.json({ ok: true });
}
