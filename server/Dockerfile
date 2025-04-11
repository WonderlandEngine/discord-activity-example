ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION}


WORKDIR /usr/src/app/server

COPY . .

RUN yarn install --frozen-lockfile

ENV NODE_ENV production
ENV DISCORD_PORT 3000

EXPOSE 3000

CMD ["yarn", "start"]