# copied from https://github.com/BretFisher/node-docker-good-defaults/blob/master/Dockerfile

FROM node:latest

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "--experimental-modules", "./index.mjs" ]
