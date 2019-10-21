FROM node:12-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json yarn*lock\
  babel.config.js\
  .eslintrc\
  tsconfig.json ./
COPY ./backend/package.json ./backend/
RUN npm i -g yarn && yarn

FROM base as dev
WORKDIR /app/backend
COPY ./backend .
COPY --from=base /app/backend .
CMD [ "npm", "run", "start" ]
