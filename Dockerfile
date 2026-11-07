FROM oven/bun:latest AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile && bun run build
FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
COPY --from=build /app ./
COPY --from=build /usr/local/bin/bun /usr/local/bin/bun
EXPOSE 3000
CMD ["sh", "-c", "bun run db:migrate && node build/index.js"]
