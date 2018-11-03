FROM node:latest
ENV NODE_ENV="production"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY api api
COPY model model
COPY ./*.mjs ./

ENV PORT=80
EXPOSE 80

CMD [ "npm", "start" ]
