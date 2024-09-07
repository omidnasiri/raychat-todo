ARG NODE_VERSION=20.13.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production
ENV MONGO_HOST=
ENV MONGO_PORT=
ENV MONGO_USER=
ENV MONGO_PASS=
ENV MONGO_DB=

CMD [ "node", "dist/main.js" ]
