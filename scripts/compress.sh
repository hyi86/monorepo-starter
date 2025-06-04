#!/bin/bash

FILE_NAME="source-codes.tar.gz"

rm -rf $FILE_NAME

# git ls-files | grep '^apps/web/' | grep -Ev '\.(log|tmp|bak|png|ico|svg|webp|woff2|ttf)$$' | while read -r f; do
git ls-files | grep -Ev '\.(log|tmp|bak|png|ico|svg|webp|woff2|ttf)$$' | while read -r f; do
  [[ -e "$f" ]] && echo "$f"
done > filelist.txt

tar -czf $FILE_NAME -T filelist.txt

rm -rf filelist.txt

# e.g. make compress to=apps/next-full-stack/public
if [ -n "$1" ]; then
  mv $FILE_NAME $1
fi

# tar -xOzf archive-2.tar.gz trubo.json
