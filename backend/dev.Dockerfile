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


# NOTE: FULL dev+prod from parent context (../docker build -f ./backend/Dockerfile .)
# FROM node:12-alpine as base
# EXPOSE 3000
# WORKDIR /backend
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
# COPY --from=build /backend/dist ./dist
# COPY --from=build /backend/src ./src
# CMD ["node", "./dist/main.js"]
