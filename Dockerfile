FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:lts-alpine as deployer

ARG VERSION

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/*.yml ./

ENV NODE_ENV=production
ENV NUXT_APP_VERSION=$VERSION

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]