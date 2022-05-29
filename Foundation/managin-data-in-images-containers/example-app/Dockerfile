FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# VOLUME [ "/app/feedback" ] # Anonymous Volume
# VOLUME [ "/app/node_modules" ] # Anonymous Volume

CMD ["npm", "start"]