#!/bin/bash

export SCRIPTS_DIR=src/Obl-web/share/scripts

cp $SCRIPTS_DIR/*.js js/
[[ -e js/common.js ]] && rm js/common.js

for i in $(ls $SCRIPTS_DIR/common); do
  echo $i
  cat $SCRIPTS_DIR/common/$i >> js/common.js
done

	
