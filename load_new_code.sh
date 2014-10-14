#!/bin/bash

echo "Setting up the web share..."
./setup_share.sh
echo "Looking for current container id..."
ID=$(sudo docker ps | grep ourbucketlist | awk '{printf $1}')
[[ -n $ID ]] && sudo docker kill $ID 
echo "Beginning build of new container..."
sudo docker build -t ourbucketlist/app .
echo "Running new container..."
sudo docker run -p 80:80 -d ourbucketlist/app

