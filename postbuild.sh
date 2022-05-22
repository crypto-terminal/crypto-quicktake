#!/usr/bin/env bash

INDEXHTML=dist/index.html
if [[ -f "$INDEXHTML" ]]; then
    mv dist/index.html dist/popup.html 
fi

MANIFEST=public/manifest.json
if [[ -f "$MANIFEST" ]]; then
   cp public/manifest.json dist/
fi