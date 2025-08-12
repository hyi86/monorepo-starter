#!/bin/bash

# ------------------------------------------------------------
# global variables
# ------------------------------------------------------------
SELECTED=""
INPUT=""

# ------------------------------------------------------------
# ANSI wrapper functions
# ------------------------------------------------------------
color() {
  local code="$1"
  shift
  echo -e "\033[${code}m$*\033[0m"
}

color.gray() { color "0;90" "$@"; }
color.green() { color "0;32" "$@"; }
color.red() { color "0;31" "$@"; }
color.yellow() { color "1;33" "$@"; }
color.blue() { color "0;34" "$@"; }
color.magenta() { color "0;35" "$@"; }
color.cyan() { color "0;36" "$@"; }

color.process() { color "0;90" " ⠋ $@"; }
color.success() { color "0;32" " ✓ $@"; }
color.error() { color "0;31" " ✗ $@"; }
color.warn() { color "1;33" " ⚠ $@"; }
color.info() { color "0;34" " ○ $@"; }
color.example() { color "0;90" " » $@"; }
color.question() { color "0;34" " ▶ $@"; }

# ------------------------------------------------------------
# read arrow key
# ------------------------------------------------------------
_read_arrow_key() {
  IFS= read -rsn1 key
  if [[ "$key" == $'\x1b' ]]; then
    read -rsn2 key
  fi
  echo "$key"
}

# ------------------------------------------------------------
# menu select
# ------------------------------------------------------------
menu_select() {
  local title="$1"
  shift
  local options=("$@")
  local selected=0

  while true; do
    clear
    echo "$title ($(color.gray "↑↓ Move, Enter Select")):"
    for i in "${!options[@]}"; do
      if [[ $i -eq $selected ]]; then
        echo "$(color.green "✓ ${options[$i]}")"
      else
        echo "  ${options[$i]}"
      fi
    done

    local key=$(_read_arrow_key)
    case "$key" in
      '[A') ((selected--)); ((selected < 0)) && selected=$((${#options[@]} - 1)) ;;
      '[B') ((selected++)); ((selected >= ${#options[@]})) && selected=0 ;;
      '') break ;;
    esac
  done

  SELECTED="${options[$selected]}"
}

# ------------------------------------------------------------
# prompt input
# ------------------------------------------------------------
prompt_input() {
  local message="$1"
  local input

  while true; do
    echo -n "$message: "
    IFS= read -r input

    # 유효한 입력범위 지정(소문자 영문, 숫자, 밑줄(_)만 허용)
    if [[ ! "$input" =~ ^[a-z0-9_-]+$ ]]; then
      echo "$(color.error "Invalid input (only lowercase a-z, numbers 0-9, _ and - allowed)")"
      continue
    fi

    break
  done

  INPUT="$input"
}
