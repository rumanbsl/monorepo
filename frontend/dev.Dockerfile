FROM node:12-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./frontend/package*.json\
  babel.config.js\
  .eslintrc\
  tsconfig.json ./
RUN npm i


FROM base as dev
WORKDIR /app/frontend
COPY ./frontend .
RUN rm -rf node_modules
CMD [ "npm", "run", "start" ]
