FROM node:13-alpine as base
WORKDIR /app
COPY ./package*.json yarn*lock\
  babel.config.js\
  .eslintrc.js\
  tsconfig.json ./
COPY ./frontend/package.json ./frontend/
RUN apk add --no-cache --virtual .build-deps make gcc g++ python && yarn
ENV PATH=/app/node_modules/.bin:$PATH
ENV ACLOCAL_PATH=/usr/share/aclocal
ENV LIBRARY_PATH=/lib:/usr/lib

FROM base as dev
EXPOSE 1111
WORKDIR /app/frontend
COPY ./frontend .
COPY --from=base /app/frontend .
CMD [ "yarn", "start" ]

FROM base as dev-https
EXPOSE 2222
WORKDIR /app/frontend
COPY ./frontend .
COPY --from=base /app/frontend .
CMD [ "yarn", "start:https" ]

