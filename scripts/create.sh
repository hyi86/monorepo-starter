#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/ui-utils.sh"

# ------------------------------------------------------------
# interactive UI
# ------------------------------------------------------------
# menu_select "$(color.blue "▶ Select template?")" "hono" "next" "react-router" "vanilla"
menu_select "$(color.blue "▶ Select template?")" "hono" "next"
prompt_input "$(color.blue "▶ Enter package name")"

if [ -d "apps/$INPUT" ]; then
  echo "$(color.warn "Directory 'apps/$INPUT' already exists. Overwrite? (Y/n)")"
  read -r answer
  if [[ "$answer" =~ ^[Nn]$ ]]; then
    echo "$(color.error "Operation cancelled.")"
    exit 0
  fi
else 
  mkdir -p apps/$INPUT
fi

# ------------------------------------------------------------
# call template specific script
# ------------------------------------------------------------
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

echo $SELECTED
echo $SCRIPT_DIR
echo $INPUT

case "$SELECTED" in
  "hono")
    source "$SCRIPT_DIR/templates/hono.sh"
    ;;
  "next")
    source "$SCRIPT_DIR/templates/next.sh"
    ;;
  *)
    echo "$(color.error "Unknown template: $SELECTED")"
    exit 1
    ;;
esac
