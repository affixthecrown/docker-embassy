#!/bin/bash

export SHARE_DIR=src/Obl-web/share
export SCRIPTS_DIR=$SHARE_DIR/scripts
#copy YUI to share
cp -a yui2/* share/yui/

#copy html and css files to share
cp $SHARE_DIR/*.html share/
cp $SHARE_DIR/*.css share/

#copy images to share


cp $SCRIPTS_DIR/*.js share/scripts/
[[ -e js/common.js ]] && rm share/scripts/common.js

rm share/scripts/common.js
for i in $(ls $SCRIPTS_DIR/common); do
  cat $SCRIPTS_DIR/common/$i >> share/scripts/common.js
done

	
