
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/ 
RUN npm i -g @nestjs/cli
RUN npm install

RUN npm run build

COPY . .

CMD npm run start
