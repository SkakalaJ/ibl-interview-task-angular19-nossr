FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@19

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
