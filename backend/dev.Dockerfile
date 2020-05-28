FROM node:13-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json yarn*lock\
  babel.config.js\
  .eslintrc.js\
  tsconfig.json ./
COPY ./backend/package.json ./backend/

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  yarn global add node-gyp -g && yarn && \
  echo "Keeping native deps for dev build, because yarn install need it"
# apk del native-deps

FROM base as dev
WORKDIR /app/backend
COPY ./backend .
COPY --from=base /app/backend .
CMD [ "npm", "run", "start" ]
