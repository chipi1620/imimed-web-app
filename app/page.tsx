import Link from "next/link";

const Chevron = () => <span aria-hidden="true">↗</span>;

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="IMIMED, inicio">
      <img
        src="/media/imimed-logo.png"
        width="328"
        height="223"
        alt="IMIMED Medical Tech"
      />
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <details className="nav-item">
              <summary>Soluciones</summary>
              <div className="mega-menu">
                <div>
                  <span className="eyebrow">Por necesidad</span>
                  <Link href="/soluciones#mantener">Mantener la operación</Link>
                  <Link href="/soluciones#equipar">Equipar una institución</Link>
                  <Link href="/soluciones#integrar">Integrar tecnología</Link>
                </div>
                <div>
                  <span className="eyebrow">Por etapa</span>
                  <Link href="/soluciones#adquisicion">Adquisición y renta</Link>
                  <Link href="/soluciones#instalacion">Instalación y capacitación</Link>
                  <Link href="/soluciones#renovacion">Actualización y renovación</Link>
                </div>
              </div>
            </details>
            <details className="nav-item">
              <summary>Servicios</summary>
              <div className="mega-menu mega-services">
                <div>
                  <span className="eyebrow">Continuidad operativa</span>
                  <Link href="/servicios/mantenimiento-preventivo">Preventivo</Link>
                  <Link href="/servicios/mantenimiento-correctivo">Correctivo</Link>
                  <Link href="/polizas">Pólizas de mantenimiento</Link>
                </div>
                <div>
                  <span className="eyebrow">Implementación</span>
                  <Link href="/servicios/instalacion">Instalación y puesta en marcha</Link>
                  <Link href="/servicios/dicom-pacs">Integración DICOM / PACS</Link>
                  <Link href="/servicios/capacitacion">Capacitación técnica</Link>
                </div>
              </div>
            </details>
            <Link href="/polizas">Pólizas</Link>
            <details className="nav-item">
              <summary>Equipos</summary>
              <div className="mega-menu mega-equipment">
                <div>
                  <span className="eyebrow">Tipos de imagen</span>
                  <Link href="/equipos#rayos-x">Rayos X</Link>
                  <Link href="/equipos#tomografia">Tomografía</Link>
                  <Link href="/equipos#resonancia">Resonancia</Link>
                  <Link href="/equipos#ultrasonido">Ultrasonido</Link>
                  <Link href="/equipos#arcos-en-c">Arcos en C</Link>
                  <Link href="/equipos#mastografia">Mastografía</Link>
                </div>
              </div>
            </details>
            <Link href="/proyectos">Proyectos</Link>
            <Link href="/recursos">Recursos</Link>
            <Link href="/nosotros">IMIMED</Link>
          </nav>
          <div className="nav-actions">
            <Link className="text-action" href="/soporte">
              Soporte técnico
            </Link>
            <Link className="button button-small" href="/cotizacion">
              Solicitar cotización
            </Link>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Abrir menú">Menú</summary>
            <nav>
              <Link href="/soluciones">Soluciones</Link>
              <Link href="/servicios">Servicios</Link>
              <Link href="/polizas">Pólizas</Link>
              <Link href="/equipos">Equipos</Link>
              <Link href="/proyectos">Proyectos</Link>
              <Link href="/recursos">Recursos</Link>
              <Link href="/nosotros">IMIMED</Link>
              <Link href="/soporte">Soporte técnico</Link>
              <Link href="/cotizacion">Solicitar cotización</Link>
            </nav>
          </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <>
      <footer>
        <div className="shell footer-grid">
          <div>
            <Logo />
            <p>
              Ingeniería e integración de tecnología médica durante todo su ciclo
              de vida.
            </p>
          </div>
          <div>
            <span className="eyebrow">Servicios</span>
            <Link href="/servicios">Mantenimiento</Link>
            <Link href="/polizas">Pólizas</Link>
            <Link href="/servicios/dicom-pacs">DICOM / PACS</Link>
          </div>
          <div>
            <span className="eyebrow">Institucional</span>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/proyectos">Proyectos</Link>
            <Link href="/recursos">Recursos técnicos</Link>
          </div>
          <div>
            <span className="eyebrow">Contacto</span>
            <a href="tel:+529619297841">+52 961 929 7841</a>
            <a href="mailto:immedservicio@outlook.com">immedservicio@outlook.com</a>
            <Link href="/contacto">Contactar a un especialista</Link>
          </div>
        </div>
        <div className="shell footer-legal">
          <span>© {new Date().getFullYear()} IMIMED</span>
          <div>
            <Link href="/aviso-de-privacidad">Aviso de privacidad</Link>
            <Link href="/terminos">Términos y condiciones</Link>
          </div>
        </div>
      </footer>
      <nav className="mobile-action-bar" aria-label="Acciones rápidas">
        <Link href="/cotizacion">Cotizar</Link>
        <a href="tel:+529619297841">Llamar</a>
        <Link href="/soporte">Soporte</Link>
      </nav>
    </>
  );
}

const needs = [
  ["Mantener mis equipos operativos", "/servicios"],
  ["Contratar una póliza", "/polizas"],
  ["Comprar un equipo", "/equipos"],
  ["Rentar equipamiento", "/equipos?operacion=renta"],
  ["Abrir o renovar una clínica", "/soluciones#equipar"],
  ["Integrar DICOM o PACS", "/servicios/dicom-pacs"],
  ["Reportar una falla", "/soporte"],
];

const categories = [
  "Rayos X",
  "Tomografía",
  "Resonancia",
  "Ultrasonido",
  "Arcos en C",
  "Mastografía",
];

const policies = [
  {
    eyebrow: "Póliza Básica",
    title: "Preventiva",
    features: [
      ["2 mantenimientos preventivos anuales", true],
      ["Certificado de calibración", true],
      ["Soporte telefónico 8/5", true],
      ["Refacciones incluidas", false],
    ],
  },
  {
    eyebrow: "Póliza Plus",
    title: "Integral",
    featured: true,
    features: [
      ["2 mantenimientos preventivos anuales", true],
      ["Mantenimientos correctivos ilimitados", true],
      ["Mano de obra incluida", true],
      ["Soporte telefónico 24/7", true],
    ],
  },
  {
    eyebrow: "Póliza Total",
    title: "Todo incluido",
    features: [
      ["Mantenimientos preventivos y correctivos", true],
      ["Mano de obra y viáticos incluidos", true],
      ["Refacciones originales incluidas", true],
      ["Tiempo de respuesta garantizado menor a 24 h", true],
    ],
  },
];

const brands = [
  { name: "Philips", image: "/media/brand-philips.svg", href: "https://www.philips.com/healthcare" },
  { name: "GE HealthCare", image: "/media/brand-ge-healthcare.svg", href: "https://www.gehealthcare.com/" },
  { name: "Mindray", image: "/media/brand-mindray.png", href: "https://www.mindray.com/", className: "brand-icon" },
  { name: "SCHILLER", image: "/media/brand-schiller.svg", href: "https://www.schiller.ch/" },
  { name: "Siemens Healthineers", image: "/media/brand-siemens-healthineers.jpg", href: "https://www.siemens-healthineers.com/", className: "brand-square-raster" },
  { name: "Canon Medical", image: "/media/brand-canon-medical.svg", href: "https://global.medical.canon/" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <div className="hero-placeholder">
              <span>IM / 01</span>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="shell hero-content">
            <p className="kicker">Ingeniería para continuidad clínica</p>
            <h1>Tecnología médica operativa cuando más importa.</h1>
            <p className="hero-copy">
              Ayudamos a hospitales, clínicas y centros de diagnóstico a
              adquirir, mantener e integrar tecnología médica con respaldo
              técnico durante todo su ciclo de vida.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/soluciones">
                Explorar soluciones <Chevron />
              </Link>
              <Link className="button button-ghost" href="/cotizacion">
                Solicitar evaluación
              </Link>
            </div>
          </div>
          <div className="hero-index shell">
            <span>Adquisición</span>
            <span>Mantenimiento</span>
            <span>Integración</span>
          </div>
        </section>

        <section className="trust-strip">
          <div className="shell trust-grid">
            <div><strong>Multimarca</strong><span>Atención técnica</span></div>
            <div><strong>Campo</strong><span>Ingeniería especializada</span></div>
            <div><strong>Documentada</strong><span>Trazabilidad del servicio</span></div>
            <div><strong>Ciclo completo</strong><span>De adquisición a renovación</span></div>
          </div>
          <p className="shell data-note">
            Los indicadores cuantitativos se publicarán únicamente con datos
            verificables.
          </p>
        </section>

        <section className="section brand-section">
          <div className="shell brand-heading">
            <div>
              <p className="kicker">Tecnología multimarcas</p>
              <h2>Marcas con las que trabajamos.</h2>
            </div>
            <p>
              Integramos, mantenemos y configuramos tecnología de fabricantes
              reconocidos de acuerdo con la aplicación y la infraestructura de
              cada institución.
            </p>
          </div>
          <div className="shell brand-grid">
            {brands.map((brand) => (
              <a
                className={`brand-card ${brand.className ?? ""}`}
                href={brand.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visitar el sitio de ${brand.name}`}
                key={brand.name}
              >
                <span className="brand-visual">
                  <img src={brand.image} alt={`Logo de ${brand.name}`} />
                </span>
                <strong>{brand.name}</strong>
              </a>
            ))}
          </div>
          <p className="shell brand-note">
            Las marcas y logotipos pertenecen a sus respectivos titulares. La
            disponibilidad y el alcance de servicio se confirman para cada
            modelo y proyecto.
          </p>
        </section>

        <section className="section needs-section">
          <div className="shell split-heading">
            <div>
              <p className="kicker">Punto de partida</p>
              <h2>¿Qué necesita resolver?</h2>
            </div>
            <p>
              No todos los proyectos empiezan con un equipo. Algunos empiezan
              con una falla, una necesidad clínica o un riesgo operativo.
            </p>
          </div>
          <div className="shell needs-list">
            {needs.map(([label, href], index) => (
              <Link href={href} key={label}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <Chevron />
              </Link>
            ))}
          </div>
        </section>

        <section className="section policy-comparison">
          <div className="shell">
            <div className="policy-heading">
              <div>
                <p className="kicker">Cobertura técnica</p>
                <h2>Una póliza para cada nivel de operación.</h2>
              </div>
              <p>
                Compare el alcance de cada cobertura. La configuración final se
                ajusta al tipo, cantidad y criticidad de sus equipos.
              </p>
            </div>
            <div className="policy-cards">
              {policies.map((policy) => (
                <article
                  className={`policy-card${policy.featured ? " policy-card-featured" : ""}`}
                  key={policy.title}
                >
                  {policy.featured && <span className="policy-badge">Más popular</span>}
                  <p className="policy-label">{policy.eyebrow}</p>
                  <h3>{policy.title}</h3>
                  <ul>
                    {policy.features.map(([feature, included]) => (
                      <li className={included ? "" : "not-included"} key={feature}>
                        <span aria-hidden="true">{included ? "✓" : "—"}</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`button ${policy.featured ? "" : "button-dark"}`}
                    href={`/cotizacion?poliza=${encodeURIComponent(policy.title.toLowerCase())}`}
                  >
                    Cotizar <Chevron />
                  </Link>
                </article>
              ))}
            </div>
            <p className="policy-note">
              La cobertura está sujeta a evaluación técnica, ubicación y
              condiciones particulares de cada equipo.
            </p>
          </div>
        </section>

        <section className="section equipment-section">
          <div className="shell split-heading">
            <div><p className="kicker">Equipamiento consultivo</p><h2>Modalidades y áreas clínicas</h2></div>
            <p>Evaluamos aplicación, condición, infraestructura, instalación y soporte antes de recomendar una configuración.</p>
          </div>
          <div className="shell category-grid">
            {categories.map((category, i) => (
              <Link href={`/equipos#${category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-")}`} key={category}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{category}</strong>
                <Chevron />
              </Link>
            ))}
          </div>
          <div className="shell section-action">
            <Link className="button button-dark" href="/equipos">Explorar catálogo consultivo <Chevron /></Link>
          </div>
        </section>

        <section className="section lifecycle">
          <div className="shell">
            <p className="kicker">Ciclo de vida tecnológico</p>
            <h2>Una decisión afecta todo lo que viene después.</h2>
            <div className="lifecycle-track">
              {["Planeación", "Adquisición", "Instalación", "Capacitación", "Mantenimiento", "Actualización", "Renovación"].map((step, i) => (
                <div key={step}><span className="mono">{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong></div>
              ))}
            </div>
            <p className="lifecycle-copy">
              IMIMED conecta decisiones de compra, infraestructura,
              implementación y servicio para evitar que cada etapa se gestione
              como un problema aislado.
            </p>
          </div>
        </section>

        <section className="section evidence-section">
          <div className="shell evidence-grid">
            <div className="evidence-image">
              <span className="mono">Registro de intervención</span>
            </div>
            <div>
              <p className="kicker">Casos documentados</p>
              <h2>La confianza se construye con evidencia técnica.</h2>
              <p>
                Los casos de éxito se publican con problema inicial,
                diagnóstico, intervención, resultado y evidencia autorizada.
                No usamos testimonios ni cifras inventadas.
              </p>
              <Link className="inline-link" href="/proyectos">Ver proyectos y metodología <Chevron /></Link>
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell final-cta-grid">
            <div>
              <p className="kicker light">Evaluación inicial</p>
              <h2>Cuéntenos qué equipo, proyecto o problema necesita resolver.</h2>
            </div>
            <div>
              <p>
                Describa la necesidad y adjunte la información disponible. El
                equipo técnico o comercial revisará el caso y definirá el
                siguiente paso.
              </p>
              <div className="hero-actions">
                <Link className="button button-light" href="/cotizacion">Solicitar evaluación <Chevron /></Link>
                <Link className="button button-outline-light" href="/soporte">Reportar una falla</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
