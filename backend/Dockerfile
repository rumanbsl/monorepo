FROM node:12-alpine as base
EXPOSE 3000
WORKDIR /backend
COPY ./package*.json ./

# Intermediate stage, only to build prduction code
FROM base as build
RUN npm i
COPY . .
RUN npm run build

FROM build as dev
CMD [ "npm", "run", "start" ]

FROM base as prod
RUN rm -rf node_modules
RUN npm i --only=prod
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/src ./src
CMD ["node", "./dist/main.js"]
