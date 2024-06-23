FROM node:lts-alpine as builder

# ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine as deployer

ARG TAG

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/*.yml ./

ENV NUXT_APP_VERSION=$TAG

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]