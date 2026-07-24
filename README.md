# IMIMED — Plataforma corporativa

Sitio corporativo full-stack para IMIMED: servicios, pólizas, catálogo consultivo, páginas de producto, solicitudes de cotización, soporte técnico y administración de contenido.

## Requisitos

- Node.js 22.13 o posterior.
- npm 10 o posterior.
- Visual Studio Code.

## Ejecutar en Visual Studio Code

1. Descomprime el proyecto.
2. Abre la carpeta completa en VS Code.
3. Abre **Terminal → New Terminal**.
4. Instala dependencias:

   ```bash
   npm install
   ```

5. Inicia el entorno local:

   ```bash
   npm run dev
   ```

6. Abre la dirección que indique la terminal, normalmente `http://localhost:5173`.

Para detenerlo, presiona `Control + C`.

## Rutas principales

- `/` — Inicio.
- `/servicios` — Servicios.
- `/polizas` — Comparador y configuración de pólizas.
- `/equipos` — Catálogo consultivo.
- `/soporte` — Reporte técnico.
- `/cotizacion` — Solicitud comercial.
- `/admin` — Panel de solicitudes y contenido.

## Datos y archivos

- Las solicitudes se guardan en D1.
- Los adjuntos se guardan en R2.
- El catálogo incluye contenido inicial en `app/equipos/data.ts`.
- Los productos publicados desde el CMS sustituyen a los productos iniciales con el mismo `slug`.
- Las imágenes incluidas son referencias editoriales y deben sustituirse por fotografías reales autorizadas.

## Correo transaccional

El formulario siempre registra la solicitud. Si se configuran `RESEND_API_KEY`, `IMIMED_FROM_EMAIL` e `IMIMED_NOTIFICATION_EMAIL`, también envía confirmación al cliente y aviso al equipo de IMIMED.

## Despliegue

Consulta [DEPLOY.md](DEPLOY.md) para la publicación paso a paso en Cloudflare Workers, creación de D1/R2, migraciones, secretos, acceso administrativo y dominio.
