# cd ../../ && docker build -f ./backend/Dockerfile . --target=prod

# !NOTE => Since we are copying files from ../../ the build context is also there, and docker build should be run from there
FROM node:12 as base
EXPOSE 3000

WORKDIR /backend
RUN mkdir project
COPY ./yarn.lock*.json ./backend/package*.json ./
RUN npm i -g yarn && yarn

FROM base as prod
WORKDIR /backend/project
COPY ./backend .
CMD [ "yarn", "start" ]
