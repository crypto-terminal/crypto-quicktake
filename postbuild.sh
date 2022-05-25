#!/usr/bin/env bash

./node_modules/.bin/terser --compress -- public/background.js > dist/background.js
./node_modules/.bin/terser --compress -- public/content-script.js > dist/content-script.js
cp public/manifest.json dist/
