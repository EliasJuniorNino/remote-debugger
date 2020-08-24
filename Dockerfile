FROM node:13.12.0-alpine

ADD . .

RUN yarn install

EXPOSE 3333

CMD [ "yarn", "start" ]