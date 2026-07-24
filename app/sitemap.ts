import type { MetadataRoute } from "next";
import { products } from "./equipos/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://imimed.mx";
  const routes = [
    "",
    "/soluciones",
    "/servicios",
    "/servicios/mantenimiento-preventivo",
    "/servicios/mantenimiento-correctivo",
    "/servicios/instalacion",
    "/servicios/dicom-pacs",
    "/servicios/capacitacion",
    "/polizas",
    "/equipos",
    "/proyectos",
    "/recursos",
    "/nosotros",
    "/soporte",
    "/contacto",
    "/cotizacion",
    "/aviso-de-privacidad",
    "/terminos",
  ];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .8 })),
    ...products.map((product) => ({ url: `${base}/equipos/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .7 })),
  ];
}
