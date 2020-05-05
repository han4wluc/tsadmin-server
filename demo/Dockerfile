
FROM node:12.13.1 as node_cache

WORKDIR /cache/
COPY package.json /cache
COPY yarn.lock /cache

RUN yarn install

FROM node:12.13.1
WORKDIR /app
COPY --from=node_cache /cache/ /app
COPY . /app

RUN yarn build
RUN npm prune

EXPOSE 8002
CMD ["yarn", "start:prd"]

