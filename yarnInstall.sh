#!/bin/bash
CONTAINER=$1;
# PACKAGES=$( IFS=$'\n\n'; echo "${PACKAGES_ARR[*]}" );

if [ -n "$$CONTAINER" ]; then
    echo $(
        docker-compose stop $CONTAINER && yarn &&/
        docker-compose run $CONTAINER sh -c "cd .. && yarn" &&/
        docker-compose start $CONTAINER
    )
fi
