#!/bin/bash
echo "Getting current container id..." &&\
ID=$(sudo docker ps | grep embassy | awk '{printf $1}') && \
sudo docker kill $ID && \
echo "Beginning build of new container..." && \
sudo docker build -t embassy/app . && \
echo "Running new container..." && \
sudo docker run -p 5080:80 -d embassy/app

