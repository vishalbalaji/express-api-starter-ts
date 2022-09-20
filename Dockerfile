FROM node:18 AS base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT 5000
EXPOSE "$ENV"

FROM base AS dev
CMD [ "npm", "run", "dev" ]

FROM base AS prod
RUN npm run build
RUN npm install --omit="dev"
RUN npm install -g pm2
CMD [ "pm2-runtime", "dist/index.js" ]
