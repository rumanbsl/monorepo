FROM node:14-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json ./yarn*lock \
  ./babel.config.js\
  ./.eslintrc.js\
  ./tsconfig.json ./
RUN mkdir backend
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
CMD [ "yarn", "start" ]

FROM base as build
WORKDIR /app/backend
COPY ./backend .
COPY --from=base /app/backend .
RUN yarn build

FROM base as prod
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/src ./src
RUN rm -rf ../node_modules
RUN yarn --production
CMD ["node", "./dist/main.js"]
