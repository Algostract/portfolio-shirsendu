FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

ENV NITRO_PRESET=bun

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-alpine AS runner

ARG VERSION
ARG BUILD_TIME

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV NUXT_APP_VERSION=$VERSION

EXPOSE 3000

ENTRYPOINT ["bun", ".output/server/index.mjs"]