FROM node:20.11-alpine3.18 AS default

RUN apk add --no-cache build-base python3

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN chown -R node:node /usr/src/app \
	&& chown -R node:node /home/node

RUN npm i

# ---

FROM default AS development

COPY .env.dev .env

CMD npm run start:dev

# ---

FROM default AS test

COPY .env.test .env

CMD npm run start:debug