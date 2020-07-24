#!/bin/sh

CONTAINER=$1;

VALID_CONTAINER=$(
  [ "$1" ] &&
  ([ $CONTAINER == "frontend" ] || [ $CONTAINER == "backend" ]) &&
    echo true || echo false
  );
if [ $VALID_CONTAINER == true ];
then
  DIR=$(([[ $CONTAINER == *"frontend"* ]]) && echo "frontend" || echo "$CONTAINER");

  rm -rf $CONTAINER-build.log &&\
  docker-compose stop $CONTAINER &&\
  cd $DIR && yarn && cd .. &&\
  docker-compose run $CONTAINER sh -c "yarn" &&\
  docker-compose start $CONTAINER &&\
  echo "process complete" 🎊 &&\
  $(nohup docker-compose build $CONTAINER > $CONTAINER-build.log &);
else
  echo "The command is like this: \n./yarnGet.sh <CONTAINER_NAME> <SOME_NODE_PACKAGE_NAME(s)>";
fi
