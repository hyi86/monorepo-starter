#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/utils.sh"

# ------------------------------------------------------------
# 버전관리되는 파일만 복사하는 스크립트(`git` 으로 관리되는 파일)
# ------------------------------------------------------------

# args가 없으면 대화형 UI (`sh ./scripts/copy.sh`)
if [ -z "$1" ] || [ -z "$2" ]; then
  cd apps
  TEMPLATES=$(ls)
  cd ..
  menu_select "$(color.question "Select template?")" $TEMPLATES
  prompt_input "$(color.question "Enter new package name")"

  FROM=apps/$SELECTED
  TO=apps/$INPUT
else
  FROM=$1
  TO=$2
fi

echo ""
echo "$(color.process "Copying files...")"
echo "$(color.info "from: $(color.cyan $FROM)")"
echo "$(color.info "to: $(color.cyan $TO)")"

# 파일 복사
rsync -azP --filter=":- .gitignore" $FROM/ $TO

# Log
echo "$(color.success "Done")"
