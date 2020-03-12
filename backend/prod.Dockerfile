FROM node:13-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json ./yarn*lock ./babel.config.js ./
COPY ./backend/package.json ./backend/
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  yarn global add node-gyp -g && yarn &&\
  apk del native-deps

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
