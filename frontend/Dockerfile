FROM node:14-alpine as base
WORKDIR /app
COPY ./package*.json ./yarn*lock\
  ./babel.config.js\
  ./.eslintrc.js\
  ./tsconfig.json ./
COPY ./frontend/package.json ./frontend/yarn*lock ./frontend/
RUN apk add --no-cache --virtual .build-deps make gcc g++ python && yarn
ENV PATH=/app/node_modules/.bin:$PATH
ENV ACLOCAL_PATH=/usr/share/aclocal
ENV LIBRARY_PATH=/lib:/usr/lib

FROM base as dev
EXPOSE 1111
WORKDIR /app/frontend
COPY --from=base /app/frontend .
CMD [ "yarn", "dev" ]

# Traefik stuff
# FROM base as build
# WORKDIR /app/frontend
# COPY ./common /app/common
# COPY --from=base /app/frontend .
# COPY ./frontend .

