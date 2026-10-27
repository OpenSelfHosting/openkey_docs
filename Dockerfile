# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

# lastUpdated reads git history
RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- --header='Host: openkey.openselfhosting.com' http://127.0.0.1/ >/dev/null || exit 1
