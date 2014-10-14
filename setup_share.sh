#!/bin/bash

export SHARE_DIR=src/Obl-web/share
export SCRIPTS_DIR=$SHARE_DIR/scripts

cp $SHARE_DIR/*.html share/

cp $SCRIPTS_DIR/*.js share/scripts/
[[ -e js/common.js ]] && rm share/scripts/common.js

for i in $(ls $SCRIPTS_DIR/common); do
  cat $SCRIPTS_DIR/common/$i >> share/scripts/common.js
done

	
