import { and, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { contentItems } from "../../db/schema";
import { products as seedProducts, type Product } from "./data";

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Partial<Product>;
  return Boolean(
    product.slug &&
    product.name &&
    product.brand &&
    product.model &&
    product.category &&
    product.description &&
    product.image &&
    Array.isArray(product.benefits) &&
    Array.isArray(product.specs),
  );
}

function parseProduct(payload: string): Product | null {
  try {
    const parsed = JSON.parse(payload);
    return isProduct(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function getPublicProducts(): Promise<Product[]> {
  try {
    const rows = await (await getDb())
      .select()
      .from(contentItems)
      .where(and(eq(contentItems.kind, "producto"), eq(contentItems.status, "publicado")));
    const managed = rows.map((row) => parseProduct(row.payload)).filter((product): product is Product => product !== null);
    const managedSlugs = new Set(managed.map((product) => product.slug));
    return [...managed, ...seedProducts.filter((product) => !managedSlugs.has(product.slug))];
  } catch {
    return seedProducts;
  }
}

export async function getPublicProduct(slug: string): Promise<Product | undefined> {
  return (await getPublicProducts()).find((product) => product.slug === slug);
}
