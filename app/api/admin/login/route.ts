import { adminSessionCookie, createAdminSession, runtimeValue } from "../../../admin-session";

async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

async function passwordsMatch(received: string, expected: string) {
  const [left, right] = await Promise.all([digest(received), digest(expected)]);
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    difference |= (left[index] || 0) ^ (right[index] || 0);
  }
  return difference === 0;
}

export async function POST(request: Request) {
  const configuredPassword = await runtimeValue("ADMIN_PASSWORD");
  const email = await runtimeValue("ADMIN_EMAIL");
  const input = await request.json() as { password?: string };
  if (!configuredPassword || !email || !await runtimeValue("ADMIN_SESSION_SECRET")) {
    return Response.json({ error: "El acceso independiente no está configurado." }, { status: 503 });
  }
  if (!input.password || !(await passwordsMatch(input.password, configuredPassword))) {
    return Response.json({ error: "Credenciales inválidas." }, { status: 401 });
  }
  const token = await createAdminSession(email);
  return Response.json({ ok: true }, { headers: { "Set-Cookie": adminSessionCookie(token) } });
}
