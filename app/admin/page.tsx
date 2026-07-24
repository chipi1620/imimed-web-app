import { desc } from "drizzle-orm";
import { requireChatGPTUser } from "../chatgpt-auth";
import { getDb } from "../../db";
import { contentItems, requests } from "../../db/schema";
import { AdminConsole } from "./admin-console";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  let requestRows: typeof requests.$inferSelect[] = [];
  let contentRows: typeof contentItems.$inferSelect[] = [];
  let unavailable = false;
  try {
    const db = await getDb();
    [requestRows, contentRows] = await Promise.all([
      db.select().from(requests).orderBy(desc(requests.createdAt)).limit(150),
      db.select().from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(300),
    ]);
  } catch {
    unavailable = true;
  }

  return (
    <AdminConsole
      user={{ displayName: user.displayName }}
      signOutHref={user.source === "password" ? "/api/admin/logout?return_to=/" : "/signout-with-chatgpt?return_to=/"}
      unavailable={unavailable}
      initialRequests={requestRows.map((row) => ({
        id: row.id,
        type: row.type,
        name: row.name,
        email: row.email,
        phone: row.phone,
        institution: row.institution,
        need: row.product || row.need || row.context || "—",
        urgency: row.urgency || "—",
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      }))}
      initialContent={contentRows.map((row) => ({
        ...row,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      }))}
    />
  );
}
