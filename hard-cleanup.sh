#! /bin/bash

docker compose down
docker image prune -a
docker network prune
docker volume prune
