FROM directus/directus:12.3.1

USER root

COPY schema.json /directus/schema.json
COPY bootstrap.mjs /directus/bootstrap.mjs
COPY brochure-sources.json /directus/brochure-sources.json
COPY configure-public.mjs /directus/configure-public.mjs
COPY migrate-brochures.mjs /directus/migrate-brochures.mjs
COPY cms-entrypoint.mjs /directus/cms-entrypoint.mjs

RUN chown node:node /directus/schema.json /directus/bootstrap.mjs /directus/brochure-sources.json /directus/configure-public.mjs /directus/migrate-brochures.mjs /directus/cms-entrypoint.mjs

# Render's smallest staging instance is resource-constrained during the one-time
# schema bootstrap. Directus' pressure limiter otherwise turns legitimate startup
# work into 503 responses and the bootstrap aborts, taking the service down.
ENV PRESSURE_LIMITER_ENABLED=false

USER node

ENTRYPOINT ["node", "/directus/cms-entrypoint.mjs"]
