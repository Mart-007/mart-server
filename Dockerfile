FROM node:16-alpine3.15

ENV NODE_VERSION 16.15.0
ENV HOME /app
ENV PORT 8080

# uncomment this line if you're using localhost as DB_HOST
# or set host.docker.internal in your env file instead
# ENV DB_HOST host.docker.internal

RUN mkdir -p ${HOME}

WORKDIR ${HOME}

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY etsc.config.js ./
COPY .env ./
COPY src ./src
COPY fullchain.pem privkey.pem ./

RUN yarn clean && yarn build

EXPOSE 8080
CMD ["yarn", "prod:start"]
