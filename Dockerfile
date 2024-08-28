FROM node:20.11-alpine3.18 AS default

RUN apk add --no-cache build-base python3

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN chown -R node:node /usr/src/app \
	&& chown -R node:node /home/node

RUN yarn install --ignore-optional --frozen-lockfile

# ---

FROM default AS development

COPY .env .env

CMD yarn run start:dev
