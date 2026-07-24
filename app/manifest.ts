import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IMIMED — Ingeniería e Integración de Tecnología Médica",
    short_name: "IMIMED",
    description: "Venta, renta, mantenimiento, pólizas e integración de equipos médicos.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#10252b",
    lang: "es-MX",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
