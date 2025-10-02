# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

# Install deps
COPY package.json yarn.lock /app/
RUN corepack enable \
  && yarn install --frozen-lockfile

# Copy source (excluding what's in .dockerignore)
COPY . /app

EXPOSE 3000

# Use development command for dev environment
CMD ["yarn", "dev", "-p", "3000"]

# Production stage (uncomment and modify docker-compose.yml to use this for production)
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json yarn.lock /app/
# RUN corepack enable && yarn install --frozen-lockfile
# COPY . /app
# RUN yarn build

# FROM node:20-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# USER nextjs
# EXPOSE 3000
# ENV PORT=3000
# CMD ["node", "server.js"]



