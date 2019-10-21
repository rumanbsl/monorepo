FROM node:12-alpine as base
EXPOSE 8090
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json yarn*lock\
  babel.config.js\
  .eslintrc\
  tsconfig.json ./
COPY ./frontend/package.json ./frontend/
RUN npm i -g yarn && yarn

FROM base as dev
WORKDIR /app/frontend
COPY ./frontend .
COPY --from=base /app/frontend .
CMD [ "npm", "run", "start" ]

