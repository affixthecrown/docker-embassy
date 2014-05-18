#!/bin/bash

#get the IP
DBHOSTIP=$(ifconfig eth0 | perl -n -e 'if (m/inet addr:([\d\.]+)/g) { print $1 }')

echo -n "$DBHOSTIP     " > hosts_addition
echo "dockerhost" >> hosts_addition
