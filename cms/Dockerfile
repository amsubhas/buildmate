FROM directus/directus:12.3.1

USER root

COPY bootstrap.mjs /directus/bootstrap.mjs
COPY brochure-sources.json /directus/brochure-sources.json
COPY configure-public.mjs /directus/configure-public.mjs
COPY migrate-brochures.mjs /directus/migrate-brochures.mjs
COPY cms-entrypoint.mjs /directus/cms-entrypoint.mjs

RUN chown node:node /directus/bootstrap.mjs /directus/brochure-sources.json /directus/configure-public.mjs /directus/migrate-brochures.mjs /directus/cms-entrypoint.mjs

USER node

ENTRYPOINT ["node", "/directus/cms-entrypoint.mjs"]
