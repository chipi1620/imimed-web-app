# Despliegue de IMIMED

La versión entregada está preparada para Cloudflare Workers porque utiliza D1 para solicitudes y contenido, R2 para adjuntos y un Worker full-stack.

## 1. Preparar el proyecto

En la terminal de VS Code:

```bash
npm install
npx wrangler login
```

Comprueba primero la compilación portable:

```bash
npm run build:portable
```

## 2. Crear la base de datos y el almacenamiento

```bash
npx wrangler d1 create imimed-db
npx wrangler r2 bucket create imimed-files
```

El primer comando devuelve un `database_id`. Guárdalo.

## 3. Crear la configuración de producción

Duplica `wrangler.example.jsonc` y renómbralo `wrangler.jsonc`.

En `wrangler.jsonc`, reemplaza:

```text
REEMPLAZAR_CON_DATABASE_ID
```

por el identificador obtenido al crear `imimed-db`.

No cambies los bindings `DB`, `BUCKET`, `ASSETS` ni `IMAGES`; el código utiliza esos nombres.

## 4. Crear las tablas

```bash
npx wrangler d1 migrations apply imimed-db --remote --config wrangler.jsonc
```

Confirma la aplicación de las migraciones cuando Wrangler lo solicite.

## 5. Configurar el acceso al panel

Ejecuta cada comando y escribe el valor únicamente cuando la terminal lo solicite:

```bash
npx wrangler secret put ADMIN_EMAIL --config wrangler.jsonc
npx wrangler secret put ADMIN_PASSWORD --config wrangler.jsonc
npx wrangler secret put ADMIN_SESSION_SECRET --config wrangler.jsonc
```

- `ADMIN_EMAIL`: correo del administrador.
- `ADMIN_PASSWORD`: contraseña larga y exclusiva.
- `ADMIN_SESSION_SECRET`: cadena aleatoria de al menos 32 caracteres.

Después del despliegue, el panel estará en `/admin`.

## 6. Configurar correos — opcional

Primero verifica un dominio remitente en Resend. Después configura:

```bash
npx wrangler secret put RESEND_API_KEY --config wrangler.jsonc
npx wrangler secret put IMIMED_FROM_EMAIL --config wrangler.jsonc
npx wrangler secret put IMIMED_NOTIFICATION_EMAIL --config wrangler.jsonc
```

Ejemplo de remitente: `IMIMED <solicitudes@tudominio.com>`.

Sin estas variables, las solicitudes se guardan correctamente, pero no se envían correos.

## 7. Publicar

```bash
npm run deploy:cloudflare
```

Wrangler mostrará la URL `workers.dev`. Abre y revisa:

- Inicio.
- Catálogo y una página de producto.
- Envío de cotización.
- Envío de soporte.
- Acceso a `/admin`.

## 8. Conectar el dominio

En Cloudflare:

1. Abre **Workers & Pages**.
2. Selecciona `imimed-tecnologia-medica`.
3. Entra a **Settings → Domains & Routes**.
4. Agrega el dominio o subdominio.
5. Actualiza `metadataBase`, sitemap y robots en `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts` si el dominio final no será `https://imimed.mx`.

## 9. Actualizaciones futuras

Después de editar el proyecto:

```bash
npm run deploy:cloudflare
```

Si cambias `db/schema.ts`, genera y aplica una migración antes de publicar:

```bash
npm run db:generate
npx wrangler d1 migrations apply imimed-db --remote --config wrangler.jsonc
```

No subas `.dev.vars`, `wrangler.jsonc` con datos de otra cuenta, contraseñas ni claves API a un repositorio público.
