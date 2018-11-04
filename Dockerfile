FROM node:latest
ENV NODE_ENV="production"
ENV PORT="80"
ENV CHEVERETO_DB_PREFIX="chv_"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY api api
COPY model model
COPY ./*.mjs ./

EXPOSE 80

CMD [ "npm", "start" ]
