FROM node:21

WORKDIR /app

COPY package.json .

RUN npm install

copy . .

EXPOSE 3000

CMD ["node", "app.mjs"]