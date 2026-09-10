FROM directus/directus:12.3.1

USER root

COPY brochure-sources.json /directus/brochure-sources.json
COPY migrate-brochures.mjs /directus/migrate-brochures.mjs
COPY cms-entrypoint.mjs /directus/cms-entrypoint.mjs

RUN chown node:node /directus/brochure-sources.json /directus/migrate-brochures.mjs /directus/cms-entrypoint.mjs

USER node

ENTRYPOINT ["node", "/directus/cms-entrypoint.mjs"]
