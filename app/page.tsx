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
    <>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Atención a hospitales, clínicas y distribuidores</span>
          <span className="utility-detail">Venta · renta · mantenimiento · integración</span>
          <a href="tel:+529619297841">+52 961 929 7841</a>
        </div>
      </div>
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
                  <span className="eyebrow">Imagenología</span>
                  <Link href="/equipos?categoria=rayos-x">Rayos X</Link>
                  <Link href="/equipos?categoria=tomografia">Tomografía</Link>
                  <Link href="/equipos?categoria=ultrasonido">Ultrasonido</Link>
                  <Link href="/equipos?categoria=arcos-en-c">Arcos en C</Link>
                </div>
                <div>
                  <span className="eyebrow">Áreas clínicas</span>
                  <Link href="/equipos?categoria=anestesia">Anestesia</Link>
                  <Link href="/equipos?categoria=monitoreo">Monitoreo</Link>
                  <Link href="/equipos?categoria=quirofano">Quirófano</Link>
                  <Link href="/equipos?categoria=esterilizacion">Esterilización</Link>
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
    </>
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

const services = [
  ["01", "Mantenimiento preventivo", "Detectar desgaste antes de que interrumpa la atención clínica.", "/servicios/mantenimiento-preventivo"],
  ["02", "Diagnóstico y correctivo", "Aislar la causa real de una falla y documentar la intervención.", "/servicios/mantenimiento-correctivo"],
  ["03", "Pólizas de mantenimiento", "Convertir atención reactiva en una cobertura técnica planificada.", "/polizas"],
  ["04", "Instalación y puesta en marcha", "Recibir, verificar e iniciar operación con criterios de ingeniería.", "/servicios/instalacion"],
  ["05", "Integración DICOM / PACS", "Conectar modalidades, visualización y archivo sin perder trazabilidad.", "/servicios/dicom-pacs"],
  ["06", "Capacitación", "Transferir conocimiento operativo al personal clínico y técnico.", "/servicios/capacitacion"],
];

const categories = [
  "Rayos X",
  "Tomografía",
  "Resonancia magnética",
  "Ultrasonido",
  "Arcos en C",
  "Fluoroscopía",
  "Hemodinamia",
  "Mastografía",
  "Anestesia",
  "Monitoreo",
  "Quirófano",
  "Detectores digitales",
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

        <section className="section pillars">
          <div className="shell">
            <p className="kicker light">Una relación, tres capacidades</p>
            <h2 className="light-title">
              Decisiones técnicas conectadas con la operación hospitalaria.
            </h2>
            <div className="pillar-grid">
              <article>
                <span className="pillar-number">01</span>
                <h3>Mantener</h3>
                <p>
                  Prevención, diagnóstico y corrección para reducir
                  interrupciones y sostener el desempeño del equipo.
                </p>
                <ul>
                  <li>Preventivos y correctivos</li>
                  <li>Pólizas y soporte técnico</li>
                  <li>Refacciones y documentación</li>
                </ul>
                <Link href="/soluciones#mantener">Ver continuidad operativa <Chevron /></Link>
              </article>
              <article className="pillar-featured">
                <span className="pillar-number">02</span>
                <h3>Equipar</h3>
                <p>
                  Selección consultiva, venta o renta, instalación y
                  capacitación alineadas a la aplicación clínica.
                </p>
                <ul>
                  <li>Equipo nuevo y seminuevo</li>
                  <li>Evaluación técnica</li>
                  <li>Puesta en marcha</li>
                </ul>
                <Link href="/soluciones#equipar">Explorar equipamiento <Chevron /></Link>
              </article>
              <article>
                <span className="pillar-number">03</span>
                <h3>Integrar</h3>
                <p>
                  Modalidades, información clínica e infraestructura técnica
                  funcionando como un sistema.
                </p>
                <ul>
                  <li>DICOM y PACS</li>
                  <li>Modernización tecnológica</li>
                  <li>Ingeniería clínica</li>
                </ul>
                <Link href="/soluciones#integrar">Ver integración <Chevron /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section services-overview">
          <div className="shell editorial-grid">
            <div className="sticky-intro">
              <p className="kicker">Servicios</p>
              <h2>El problema técnico importa más que la etiqueta del servicio.</h2>
              <p>
                Cada intervención parte del estado operativo, la criticidad y
                el contexto clínico del equipo.
              </p>
              <Link className="inline-link" href="/servicios">
                Ver alcance de servicios <Chevron />
              </Link>
            </div>
            <div className="service-list">
              {services.map(([number, title, copy, href]) => (
                <Link href={href} key={number}>
                  <span className="mono">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <Chevron />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section policy-band">
          <div className="shell policy-grid">
            <div>
              <p className="kicker light">Cobertura técnica</p>
              <h2>Cobertura diseñada alrededor de su operación.</h2>
              <p>
                Defina preventivos, correctivos, prioridad, tiempo de respuesta
                y refacciones sin zonas grises.
              </p>
              <Link className="button button-light" href="/polizas">
                Configurar una póliza <Chevron />
              </Link>
            </div>
            <div className="policy-matrix" aria-label="Resumen de pólizas">
              <div className="matrix-head"><span>Nivel</span><span>Preventivos</span><span>Correctivos</span><span>Refacciones</span></div>
              <div><strong>Preventiva</strong><span>Programados</span><span>—</span><span>—</span></div>
              <div><strong>Integral</strong><span>Incluidos</span><span>Incluidos</span><span>Opcional</span></div>
              <div><strong>Institucional</strong><span>Multiequipo</span><span>Priorizados</span><span>A medida</span></div>
            </div>
          </div>
        </section>

        <section className="section equipment-section">
          <div className="shell split-heading">
            <div><p className="kicker">Equipamiento consultivo</p><h2>Modalidades y áreas clínicas</h2></div>
            <p>Evaluamos aplicación, condición, infraestructura, instalación y soporte antes de recomendar una configuración.</p>
          </div>
          <div className="shell category-grid">
            {categories.map((category, i) => (
              <Link href={`/equipos?categoria=${encodeURIComponent(category.toLowerCase())}`} key={category}>
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
