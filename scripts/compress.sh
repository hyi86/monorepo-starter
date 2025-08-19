#!/bin/bash

# ------------------------------------------------------------
# 프로젝트내 모든 파일을 tar.gz으로 압축하는 스크립트
# ------------------------------------------------------------

# 압축 파일 이름
FILE_NAME="source-codes.tar.gz"

# 기존 압축 파일 삭제
rm -rf $FILE_NAME

# 압축 대상 파일 목록이 저장된 텍스트 파일 생성
git ls-files | grep -Ev '\.(log|tmp|bak|png|ico|svg|webp|woff2|ttf)$$' | while read -r f; do
  [[ -e "$f" ]] && echo "$f"
done > filelist.txt

# filelist.txt에 저장된 파일 목록을 읽어와서 압축 파일 생성
tar -czf $FILE_NAME -T filelist.txt

# 임시 텍스트 파일 삭제
rm -rf filelist.txt

# to 파라미터가 있으면 압축 파일을 이동 (e.g. make compress to=apps/next-full-stack/public)
if [ -n "$1" ]; then
  mv $FILE_NAME $1
fi
