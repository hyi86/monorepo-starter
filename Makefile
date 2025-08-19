SHELL := /bin/bash

.PHONY: clean compress copy create init du status

# 프로젝트 의존성 전체 초기화
clean:
	@bash ./scripts/clean.sh

# 모든 파일을 tar.gz으로 압축
# e.g. make compress to=apps/next-full-stack/public
compress:
	@bash ./scripts/compress.sh $(to)

# git 으로 관리되는 파일만 복사하는 스크립트
# e.g. make copy from=apps/next-full-stack to=apps/next-full-stack-copy
copy:
	@bash ./scripts/copy.sh $(from) $(to)

# 신규 패키지 생성 (대화형 UI)
# e.g. make create
create:
	@bash ./scripts/create.sh

# git clean 후, 프로젝트 초기화 명령어
init:
	@bash ./scripts/init.sh

# 디스크 사용량 표시
du:
	@du -sh ./apps/* ./packages/* | sort -hr

# 프로젝트 상태 확인
status:
	@bash ./scripts/system-status.sh
