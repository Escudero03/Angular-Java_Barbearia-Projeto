FROM node:22.13.1

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /barber-shop-ui

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN yarn global add @angular/cli@19.1.5
#RUN npm i -g @angular/cli@19.1.5  --save-dev

RUN yarn install
#RUN npm install

COPY . .
FROM gradle:8.11.1-jdk-21-and-23

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /barber-shop-api

RUN mkdir $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY . .
