# BuildMate CMS — Directus Foundation

This directory establishes the first production-oriented CMS layer for the existing BuildMate React/Vite website.

## Architecture

- **Frontend:** existing React/Vite application remains in the root project.
- **CMS:** Directus 12.3.1.
- **Database:** PostgreSQL 16.
- **Media:** Directus Files; production should move the storage driver to durable S3-compatible object storage.
- **Public API:** Directus REST/GraphQL, consumed read-only by the website.
- **Source control:** GitHub remains authoritative for code, deployment configuration and CMS schema/bootstrap tooling.
- **Business content:** Directus becomes authoritative for products, brochures, projects, resources, media metadata and structured technical content.

Directus exposes REST endpoints for collection items and supports SDK/GraphQL interfaces. The website should query only published/approved records and must never expose an admin token.

## Collections

`company`, `product_categories`, `products`, `product_specifications`, `solutions`, `projects`, `brochures`, `articles`, `news`, `events`, `faqs`, `downloads`, `customers`, `testimonials`, `partners`, `careers`.

Directus' built-in `directus_files` remains the media library; we do not duplicate the file store in a custom media table.

## Workflow

`draft → review → approved → published`

The workflow is deliberately explicit because technical/marketing claims must be verified before publication.

## Local startup

```bash
cd cms
cp .env.example .env
# edit .env and set strong secrets

docker compose up -d

# after Directus is healthy
DIRECTUS_URL=http://localhost:8055 ADMIN_EMAIL="$ADMIN_EMAIL" ADMIN_PASSWORD="$ADMIN_PASSWORD" node bootstrap.mjs
```

Open `http://localhost:8055` and sign in with the admin credentials from `.env`.

## Brochure migration

The repository already contains the 11 current PDFs under `public/brochures/pdf/`. After the CMS schema is bootstrapped:

```bash
cd cms
DIRECTUS_URL=http://localhost:8055 ADMIN_EMAIL="$ADMIN_EMAIL" ADMIN_PASSWORD="$ADMIN_PASSWORD" node migrate-brochures.mjs
```

The migration uploads each PDF to Directus Files and creates/updates a canonical brochure record keyed by slug. It is safe to re-run; existing brochure records are updated rather than duplicated.

## Production requirements before launch

1. Put Directus behind HTTPS at a dedicated hostname such as `cms.buildmate.in`.
2. Use managed PostgreSQL with automated backups/PITR.
3. Use S3-compatible object storage for PDFs/images instead of the local Docker volume.
4. Restrict public permissions to published content and required asset reads only.
5. Create separate editor/reviewer/admin roles; do not share the administrator account.
6. Keep admin credentials and Directus secret outside GitHub.
7. Add staging and production Directus environments and version the schema snapshot after the first production schema is stabilized.
8. Migrate the React frontend collection-by-collection; do not switch every page to CMS data in one release.
