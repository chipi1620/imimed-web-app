const SESSION_COOKIE = "imimed_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))));
}

export async function runtimeValue(name: string) {
  try {
    const { env } = await import("cloudflare:workers");
    const value = (env as unknown as Record<string, unknown>)[name];
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

export async function createAdminSession(email: string) {
  const secret = await runtimeValue("ADMIN_SESSION_SECRET");
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({
    email,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  })));
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifyAdminSession(token: string) {
  const secret = await runtimeValue("ADMIN_SESSION_SECRET");
  if (!secret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || await sign(payload, secret) !== signature) return null;
  try {
    const parsed = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { email?: string; expiresAt?: number };
    if (!parsed.email || !parsed.expiresAt || parsed.expiresAt < Date.now()) return null;
    return parsed.email;
  } catch {
    return null;
  }
}

export function adminSessionCookie(token: string) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`;
}

export function clearAdminSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function readAdminSessionCookie(cookieHeader: string | null) {
  if (!cookieHeader) return "";
  const value = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return value ? value.slice(SESSION_COOKIE.length + 1) : "";
}
