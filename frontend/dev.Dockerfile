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


# NOTE: FULL dev+prod from parent context (../docker build -f ./frontend/Dockerfile .)
# FROM node:12-alpine as base
# EXPOSE 3000
# WORKDIR /frontend
# COPY ./package*.json ./

# # Intermediate stage, only to build prduction code
# FROM base as build
# RUN npm i
# COPY . .
# RUN npm run build

# FROM build as dev
# CMD [ "npm", "run", "start" ]

# FROM base as prod
# RUN rm -rf node_modules
# RUN npm i --only=prod
# COPY --from=build /frontend/dist ./dist
# COPY --from=build /frontend/src ./src
# CMD ["node", "./dist/main.js"]
