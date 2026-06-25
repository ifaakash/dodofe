#!/bin/bash

echo "––– Building image for local registry –––"
docker build -t localhost:5000/dodo-frontend -f Dockerfile .

echo "––– BUILD COMPLETED –––"

echo "––– Pushing image to local reistory –––"
docker push localhost:5000/dodo-frontend

echo "––– IMAGE PUSHED TO LOCAL REGISTRY –––"
