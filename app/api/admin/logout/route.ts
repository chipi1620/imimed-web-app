import { clearAdminSessionCookie } from "../../../admin-session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requested = url.searchParams.get("return_to") || "/";
  const returnTo = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  return new Response(null, {
    status: 302,
    headers: { Location: returnTo, "Set-Cookie": clearAdminSessionCookie() },
  });
}
