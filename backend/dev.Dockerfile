FROM node:14-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json \
  babel.config.js\
  .eslintrc.js\
  tsconfig.json ./
COPY ./backend/package.json ./backend/yarn*lock ./backend/

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  yarn global add node-gyp -g && \
  echo "Keeping native deps for dev build, because yarn install need it"
# apk del native-deps
RUN yarn
FROM base as dev
WORKDIR /app/backend
COPY ./backend .
COPY --from=base /app/backend .
CMD [ "npm", "run", "start" ]
