#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/ui-utils.sh"

# `git` 으로 관리되는 파일만 복사

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

rsync -azP --filter=":- .gitignore" $FROM/ $TO

echo "$(color.success "Done")"
