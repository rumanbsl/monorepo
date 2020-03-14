FROM node:13-alpine as base
WORKDIR /app
COPY ./package*.json ./yarn*lock ./babel.config.js ./
COPY ./frontend/package.json ./frontend/

FROM base as build
RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
  && yarn \
  && apk del .build-deps
ENV PATH=/app/node_modules/.bin:$PATH
ENV ACLOCAL_PATH=/usr/share/aclocal
ENV LIBRARY_PATH=/lib:/usr/lib
WORKDIR /app/frontend
COPY ./frontend .
COPY --from=base /app/frontend .
RUN yarn build

FROM nginx as prod
WORKDIR /dist
COPY --from=build /app/frontend/dist /usr/share/nginx/html
