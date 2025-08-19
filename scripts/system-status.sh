#!/bin/bash

# ------------------------------------------------------------
# 프로젝트 상태 요약 스크립트
# ------------------------------------------------------------

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# 구분선 함수
print_separator() {
    echo -e "${CYAN}──────────────────────────────────────────────────────────────${NC}"
}

# 섹션 헤더 함수
print_section() {
    echo -e "\n${WHITE}$1${NC}"
    print_separator
}

# 정보 출력 함수
print_info() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 메인 헤더
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    📦 프로젝트 상태 대시보드                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# 1. 프로젝트 기본 정보
print_section "📋 프로젝트 기본 정보"
print_info "프로젝트명: $(basename $(pwd))"
print_info "경로: $(pwd)"
print_info "Git 브랜치: $(git branch --show-current 2>/dev/null || echo 'Git 저장소가 아닙니다')"
print_info "Git 상태: $(git status --porcelain | wc -l | xargs)개 변경사항"

# 2. 프로젝트 구조
print_section "📁 프로젝트 구조"

# 전체 프로젝트 구조
echo -e "${YELLOW}전체 프로젝트:${NC}"
print_info "총 디렉토리: $(find . -type d -not -path './node_modules/*' -not -path './.git/*' | wc -l | xargs)개"
print_info "총 파일: $(git ls-files | wc -l)개"

# 각 앱별 상세 구조
if [ -d "apps" ]; then
    echo -e "\n${YELLOW}애플리케이션별 상세 구조:${NC}"
    for app in apps/*/; do
        if [ -d "$app" ]; then
            app_file_count=$(git ls-files | grep -E "^$app" | wc -l)
            printf "  ${BLUE}📱 %-28s${NC} %s개 파일\n" "$app" "$app_file_count"
        fi
    done
fi

# 각 패키지별 상세 구조
if [ -d "packages" ]; then
    echo -e "\n${YELLOW}패키지별 상세 구조:${NC}"
    for pkg in packages/*/; do
        if [ -d "$pkg" ]; then
            pkg_file_count=$(git ls-files | grep -E "^$pkg" | wc -l)
            printf "  ${PURPLE}📦 %-28s${NC} %s개 파일\n" "$pkg" "$pkg_file_count"
        fi
    done
fi

# 3. 파일 확장자별 분석
print_section "📊 파일 확장자별 분석"
if command -v git >/dev/null 2>&1 && git rev-parse --git-dir >/dev/null 2>&1; then
    echo -e "${YELLOW}Git 추적 파일 기준:${NC}"
    git ls-files | sed 's/.*\.//' | sort | uniq -c | sort -nr | head -10 | while read count ext; do
        if [ ! -z "$ext" ]; then
            printf "  %-8s %s개\n" ".$ext" "$count"
        fi
    done
else
    echo -e "${YELLOW}전체 파일 기준:${NC}"
    find . -type f -not -path './node_modules/*' -not -path './.git/*' | sed 's/.*\.//' | sort | uniq -c | sort -nr | head -10 | while read count ext; do
        if [ ! -z "$ext" ]; then
            printf "  %-8s %s개\n" ".$ext" "$count"
        fi
    done
fi

# 4. 디스크 사용량
print_section "💾 디스크 사용량"
total_size=$(du -sh . 2>/dev/null | awk '{print $1}')
print_info "프로젝트 전체: $total_size"

du -sh ./apps/* ./packages/* 2>/dev/null | sort -hr | awk '{printf "  %-30s %s\n", $2, $1}'


# 가장 용량이 큰 파일 20개
echo -e "\n${YELLOW}가장 용량이 큰 파일 (상위 20개, 이미지/폰트/압축 제외):${NC}"

# 파일 리스트 소스: git이 있으면 추적 파일 기준, 없으면 find로 전체 파일
if command -v git >/dev/null 2>&1 && git rev-parse --git-dir >/dev/null 2>&1; then
    __file_iter_cmd="git ls-files -z"
else
    __file_iter_cmd="find . -type f -not -path './.git/*' -print0"
fi

{ eval "$__file_iter_cmd" | while IFS= read -r -d '' __file; do
    __ext=$(printf '%s' "${__file##*.}" | tr '[:upper:]' '[:lower:]')
    case "$__ext" in
        png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff|avif|woff|woff2|ttf|otf|eot|zip|gz|tar|tgz|bz2|xz|7z|rar)
            continue ;;
    esac
    __size=$(stat -f%z "$__file" 2>/dev/null || stat -c%s "$__file" 2>/dev/null || echo 0)
    printf "%s\t%s\n" "$__size" "$__file"
done; } | sort -nr -k1,1 | head -20 | awk -F '\t' '
function human(x,  i, unit){
  unit[1]="B"; unit[2]="KB"; unit[3]="MB"; unit[4]="GB"; unit[5]="TB"; unit[6]="PB";
  i=1; while (x>=1024 && i<6) { x/=1024; i++ }
  return sprintf("%.1f%s", x, unit[i])
}
{ printf "  %-8s %s\n", human($1), $2 }'

# 7. 최근 변경사항
print_section "🕒 최근 변경사항"
if command -v git >/dev/null 2>&1 && git rev-parse --git-dir >/dev/null 2>&1; then
    echo -e "${YELLOW}최근 커밋:${NC}"
    git log --oneline -3 | while read line; do
        echo -e "  ${CYAN}•${NC} $line"
    done
    
    echo -e "\n${YELLOW}최근 변경된 파일:${NC}"
    git diff --name-only HEAD~1 2>/dev/null | head -5 | while read file; do
        echo -e "  ${CYAN}•${NC} $file"
    done
else
    print_warning "Git 저장소가 아닙니다"
fi

# 8. 환경 정보
print_section "🖥️  환경 정보"
print_info "운영체제: $(uname -s) $(uname -r)"
print_info "Node.js: $(node --version 2>/dev/null || echo '설치되지 않음')"
print_info "npm: $(npm --version 2>/dev/null || echo '설치되지 않음')"
print_info "pnpm: $(pnpm --version 2>/dev/null || echo '설치되지 않음')"

# 9. 각 앱/패키지별 의존성 분석
print_section "📦 앱/패키지별 의존성 분석"

# 루트 의존성
if [ -f "package.json" ]; then
    echo -e "${YELLOW}루트 프로젝트:${NC}"
    if command -v jq >/dev/null 2>&1; then
        deps_count=$(jq '.dependencies | length' package.json 2>/dev/null || echo "0")
        dev_deps_count=$(jq '.devDependencies | length' package.json 2>/dev/null || echo "0")
        printf "  %-15s %s개 (개발: %s개)\n" "의존성" "$deps_count" "$dev_deps_count"
    else
        print_info "의존성 정보 확인을 위해 jq 설치 필요"
    fi
fi

# apps 디렉토리 분석
if [ -d "apps" ]; then
    echo -e "\n${YELLOW}애플리케이션별:${NC}"
    for app in apps/*/; do
        if [ -d "$app" ] && [ -f "$app/package.json" ]; then
            app_name=$(basename "$app")
            if command -v jq >/dev/null 2>&1; then
                deps_count=$(jq '.dependencies | length' "$app/package.json" 2>/dev/null || echo "0")
                dev_deps_count=$(jq '.devDependencies | length' "$app/package.json" 2>/dev/null || echo "0")
                total_deps=$((deps_count + dev_deps_count))
                printf "  %-20s %s개 (개발: %s개)\n" "$app_name" "$total_deps" "$dev_deps_count"
            else
                printf "  %-20s %s\n" "$app_name" "jq 필요"
            fi
        fi
    done
fi

# packages 디렉토리 분석
if [ -d "packages" ]; then
    echo -e "\n${YELLOW}패키지별:${NC}"
    for pkg in packages/*/; do
        if [ -d "$pkg" ] && [ -f "$pkg/package.json" ]; then
            pkg_name=$(basename "$pkg")
            if command -v jq >/dev/null 2>&1; then
                deps_count=$(jq '.dependencies | length' "$pkg/package.json" 2>/dev/null || echo "0")
                dev_deps_count=$(jq '.devDependencies | length' "$pkg/package.json" 2>/dev/null || echo "0")
                total_deps=$((deps_count + dev_deps_count))
                printf "  %-20s %s개 (개발: %s개)\n" "$pkg_name" "$total_deps" "$dev_deps_count"
            else
                printf "  %-20s %s\n" "$pkg_name" "jq 필요"
            fi
        fi
    done
fi

# 10. 의존성 사용 빈도 분석
print_section "🏆 의존성 사용 빈도 분석"

if command -v jq >/dev/null 2>&1; then
    echo -e "${YELLOW}가장 많이 사용되는 의존성 (상위 15개):${NC}"
    
    # 모든 package.json에서 의존성 추출
    all_deps=""
    
    # 루트 package.json
    if [ -f "package.json" ]; then
        deps=$(jq -r '.dependencies // {} | keys[]' package.json 2>/dev/null)
        dev_deps=$(jq -r '.devDependencies // {} | keys[]' package.json 2>/dev/null)
        all_deps="$all_deps"$'\n'"$deps"$'\n'"$dev_deps"
    fi
    
    # apps 디렉토리의 package.json들
    if [ -d "apps" ]; then
        for app in apps/*/package.json; do
            if [ -f "$app" ]; then
                deps=$(jq -r '.dependencies // {} | keys[]' "$app" 2>/dev/null)
                dev_deps=$(jq -r '.devDependencies // {} | keys[]' "$app" 2>/dev/null)
                all_deps="$all_deps"$'\n'"$deps"$'\n'"$dev_deps"
            fi
        done
    fi
    
    # packages 디렉토리의 package.json들
    if [ -d "packages" ]; then
        for pkg in packages/*/package.json; do
            if [ -f "$pkg" ]; then
                deps=$(jq -r '.dependencies // {} | keys[]' "$pkg" 2>/dev/null)
                dev_deps=$(jq -r '.devDependencies // {} | keys[]' "$pkg" 2>/dev/null)
                all_deps="$all_deps"$'\n'"$deps"$'\n'"$dev_deps"
            fi
        done
    fi
    
    # 빈 줄 제거하고 정렬하여 카운트
    echo "$all_deps" | grep -v '^$' | sort | uniq -c | sort -nr | head -15 | while read count dep; do
        if [ ! -z "$dep" ]; then
            printf "  %-36s %s개 프로젝트\n" "$dep" "$count"
        fi
    done
fi

# 푸터
echo -e "\n${BLUE}"
print_separator
echo -e "${GREEN}🎉 프로젝트 상태 확인 완료!${NC}"
echo -e "${BLUE}"
print_separator
echo -e "${NC}"
