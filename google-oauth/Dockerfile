FROM node:11.14.0-alpine

EXPOSE 3000

WORKDIR /usr/app/src
COPY package.json .

RUN npm install --production

COPY src/ .

CMD [ "npm", "start" ]
