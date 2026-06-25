FROM node:22-alpine AS builder
WORKDIR /app
RUN pnpm install
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && npm install -g pnpm@8 && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
