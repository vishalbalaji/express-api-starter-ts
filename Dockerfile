FROM alpine AS base
RUN apk add --update --no-cache nodejs npm
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT 5000
EXPOSE "$ENV"

FROM base AS dev
CMD [ "npm", "run", "dev" ]

FROM base as builder
RUN npm run build
RUN npm install --omit=dev

FROM alpine as prod
RUN apk add --update --no-cache nodejs npm
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist/src dist
RUN npm install -g pm2
CMD [ "pm2-runtime", "dist/index.js" ]
