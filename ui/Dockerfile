ARG NODE_VERSION=lts-alpine

FROM node:$NODE_VERSION as base

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY /app/node_modules ./node_modules
COPY /app/package.json ./package.json
COPY /app/next.config.js ./
COPY /app/public ./public
COPY --chown=nextjs:nodejs /app/.next ./.next

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

EXPOSE 3000

CMD npm run start