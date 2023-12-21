FROM node:18-alpine

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start"]
