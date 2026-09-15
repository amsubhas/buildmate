# BuildMate CMS — Directus Foundation

This directory establishes the first production-oriented CMS layer for the existing BuildMate React/Vite website.

## Architecture

- **Frontend:** existing React/Vite application remains in the root project.
- **CMS:** Directus 12.3.1.
- **Database:** PostgreSQL 18.6.
- **Media:** Directus Files; production should use durable S3-compatible object storage.
- **Public API:** Directus REST/GraphQL, consumed read-only by the website.
- **Source control:** GitHub remains authoritative for code, deployment configuration and CMS schema/bootstrap tooling.
- **Business content:** Directus becomes authoritative for products, brochures, projects, resources, media metadata and structured technical content.

Directus exposes REST endpoints for collection items and supports SDK/GraphQL interfaces. The website queries published records only and never contains an admin token.

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

The migration uploads each PDF to Directus Files and creates/updates a canonical brochure record keyed by slug. Existing matching files are reused, so rerunning the migration does not intentionally create duplicate PDF assets. The 11 existing production brochures are seeded as `published` content because they are already approved website material.

## Frontend integration

Set the public CMS URL in the frontend environment:

```bash
VITE_DIRECTUS_URL=https://cms.buildmate.in
```

The browser adapter in `src/cms/directus.js` is read-only and defaults collection requests to `status=published`. It never accepts or stores an administrator token. The Brochures page is the first CMS-connected page; it uses the existing visual design and temporarily falls back to the committed brochure data until the CMS has content.

## Production requirements before launch

1. Put Directus behind HTTPS at a dedicated hostname such as `cms.buildmate.in`.
2. Use PostgreSQL 18.6 with automated backups/PITR or a managed PostgreSQL service that supports the required major version.
3. Use S3-compatible object storage for PDFs/images instead of the local Docker volume.
4. Restrict the Public role to read access on published content only and read access to required Directus assets.
5. Create separate editor/reviewer/admin roles; do not share the administrator account.
6. Keep admin credentials and the Directus secret outside GitHub.
7. Add staging and production Directus environments and version the schema snapshot after the first production schema is stabilized.
8. Configure CORS only for the real website origins in staging/production; do not leave wildcard CORS enabled.
9. Migrate the React frontend collection-by-collection; do not switch every page to CMS data in one release.
10. Keep the current static frontend fallback until each CMS collection has been verified in staging, then remove the fallback in a dedicated release.

## Current implementation state

The foundation branch is `cms/directus-foundation`. The repository contains the Docker configuration, schema/bootstrap tooling, brochure migration, public read adapter, and the first Brochures page integration. The Directus instance itself still needs to be deployed to a staging environment before bootstrap and migration can be executed against a live database.
