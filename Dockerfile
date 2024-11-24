FROM node:20.11-alpine3.18 AS default

RUN apk add --no-cache build-base python3

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN chown -R node:node /usr/src/app \
	&& chown -R node:node /home/node

RUN npm install --only=prod

# ---

FROM default AS development

COPY .env .env

CMD npm run start:dev
