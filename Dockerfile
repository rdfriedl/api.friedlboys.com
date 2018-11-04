FROM node:latest
ENV NODE_ENV="production"
ENV PORT=80

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY api api
COPY model model
COPY ./*.mjs ./

EXPOSE 80

CMD [ "npm", "start" ]
