FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 4567

CMD sleep 5 && npm start