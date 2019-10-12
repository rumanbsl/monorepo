FROM node:12-alpine as base
EXPOSE 3000
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./package*.json ./
RUN npm i

FROM base as build
WORKDIR /app/backend
COPY . /app/backend
RUN npm run build

FROM base as prod
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/src ./src
COPY --from=base /app/package-*lock.json ./
RUN npm i --only=production
CMD ["node", "./dist/main.js"]
