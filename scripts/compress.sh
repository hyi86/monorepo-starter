#!/bin/bash

# 프로젝트내 모든 파일을 tar.gz으로 압축하는 스크립트

FILE_NAME="source-codes.tar.gz"

rm -rf $FILE_NAME

# git ls-files | grep '^apps/web/' | grep -Ev '\.(log|tmp|bak|png|ico|svg|webp|woff2|ttf)$$' | while read -r f; do
git ls-files | grep -Ev '\.(log|tmp|bak|png|ico|svg|webp|woff2|ttf)$$' | while read -r f; do
  [[ -e "$f" ]] && echo "$f"
done > filelist.txt

tar -czf $FILE_NAME -T filelist.txt

rm -rf filelist.txt

if [ -n "$1" ]; then
  mv $FILE_NAME $1
fi

# tar -xOzf archive-2.tar.gz trubo.json
