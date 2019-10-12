FROM node:12-alpine as base
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json ./yarn*lock ./babel.config.js ./
COPY ./frontend/package.json ./frontend/

FROM base as build
RUN npm i -g yarn && yarn
WORKDIR /app/frontend
COPY ./frontend .
COPY --from=base /app/frontend .
RUN yarn build

FROM base as prod
WORKDIR /app/frontend
COPY --from=build /app/frontend/dist ./dist

#TODO nginX
