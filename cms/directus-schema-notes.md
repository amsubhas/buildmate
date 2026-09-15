# Directus Schema Notes

The repository stores a human-readable BuildMate content model in `schema.json`. `bootstrap.mjs` turns that model into Directus collections, fields and content relationships in an empty instance.

After the first production instance is stabilized, export the authoritative Directus schema with the Directus CLI/API and commit that generated snapshot under version control. That snapshot should become the deployment-grade schema artifact; `schema.json` remains the business-facing model documentation.

Do not hand-edit Directus system tables. Use the Directus API/CLI for schema changes.
