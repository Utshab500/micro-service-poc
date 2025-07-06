FROM node:18-alpine

WORKDIR /app

COPY . /app

ARG ENV
COPY .env.${ENV} .env

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]