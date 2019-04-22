FROM node:11.14.0

EXPOSE 3000

WORKDIR /usr/app/src
COPY package.json .

RUN npm install

COPY src/ .

CMD [ "npm", "start" ]
