import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const text = Newsreader({
  variable: "--font-text",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imimed.mx"),
  title: {
    default: "IMIMED | Ingeniería e integración de tecnología médica",
    template: "%s | IMIMED",
  },
  description:
    "Venta, renta, mantenimiento, pólizas e integración de equipos médicos para hospitales, clínicas y centros de diagnóstico.",
  openGraph: {
    title: "IMIMED | Tecnología médica operativa cuando más importa",
    description:
      "Ingeniería, continuidad operativa e integración de tecnología médica durante todo su ciclo de vida.",
    type: "website",
    locale: "es_MX",
    siteName: "IMIMED",
    images: [{ url: "/media/hero-engineering.png", width: 1600, height: 1000, alt: "Ingeniería y mantenimiento de tecnología médica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMIMED | Tecnología médica operativa cuando más importa",
    description: "Venta, renta, mantenimiento, pólizas e integración de equipos médicos.",
    images: ["/media/hero-engineering.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "IMIMED",
  legalName: "Ingeniería e Integración de Tecnología Médica",
  url: "https://imimed.mx",
  areaServed: "México",
  description:
    "Ingeniería, mantenimiento, venta, renta e integración de tecnología médica.",
  telephone: "+52 961 929 7841",
  email: "immedservicio@outlook.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52 961 929 7841",
    contactType: "customer support",
    areaServed: "MX",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${text.variable} ${mono.variable}`}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
