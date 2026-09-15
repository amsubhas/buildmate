# BuildMate CMS Migration Plan

## Phase 1 — Foundation
- Directus + PostgreSQL deployment definition
- Content model and controlled workflow
- Admin bootstrap
- Public API boundary

## Phase 2 — Media / documents
- Upload the 11 approved 2026 brochures
- Migrate product images and approved company media
- Introduce durable object storage
- Replace hardcoded brochure URLs with CMS records

## Phase 3 — Products
- Migrate product categories and products
- Move specifications into structured records
- Link brochures, FAQs, applications and projects

## Phase 4 — Projects
- Migrate project records and galleries
- Add coordinates and map-ready structured data
- Link projects to products and case studies

## Phase 5 — Knowledge centre
- Articles
- News
- Events
- FAQs
- Downloads

## Phase 6 — Frontend integration
- Add a typed content adapter in React
- Keep the existing design system/components
- Use CMS data only where content is intended to be editable
- Keep animations, routing mechanics, configurator logic and security code in GitHub

## Phase 7 — SEO/AEO
- CMS-controlled SEO title/description/canonical/OG fields
- JSON-LD generated from approved structured records
- Sitemap inputs sourced from published slugs
- No fabricated claims; publish only approved records

## Phase 8 — Operations
- Roles and permissions
- Revision history and review process
- Backups and restore tests
- Staging → production schema promotion
