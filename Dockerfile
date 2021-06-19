FROM node:lts-alpine3.13

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN npm install

RUN npm run build
EXPOSE 3000
CMD npm run start
