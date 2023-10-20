FROM node:21

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 8080

# ENV MONGODB_USERNAME=nil1729
# ENV MONGODB_PASSWORD=password

CMD [ "npm", "run", "dev" ]
