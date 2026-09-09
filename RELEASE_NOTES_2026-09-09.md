# Buildmate Website — Stabilized Baseline

This package is based on the uploaded `buildmate-main(2).zip` visual baseline. It preserves the existing design direction while applying a first production-hardening pass.

## Included in this version
- Exact Buildmate primary brand tokens: `#192D78` blue and `#C8281E` red.
- Opaque, high-contrast desktop dropdown styling.
- Local-only image handling; no Unsplash fallback dependency.
- Rasterized malformed JPG/PNG assets that previously contained SVG markup.
- Broken local image references corrected to existing Buildmate assets.
- Vercel image rewrite removed so local `/public/images` assets are served locally.
- Public brochure metadata corrected to avoid fabricated page counts; legacy-source content is marked for validation until redesigned brochures are generated.
- Unsupported future-tech marketing claims removed from visible primary navigation and core portfolio presentation.
- Project and company metrics adjusted toward verifiable source-based information.
- Added `npm run audit` and `npm run check` scripts.

## Validation
`npm run audit` passes with no missing static asset references and no external Unsplash references.

A full Vite production build could not be completed in this environment because the dependency installation timed out before the Vite executable became available.
