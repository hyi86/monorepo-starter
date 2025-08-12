SHELL := /bin/bash

.PHONY: clean compress copy create init du project-clean

# 빈 디렉토리를 삭제
clean:
	@find . -type d -empty -delete

# 모든 파일을 tar.gz으로 압축
# e.g. make compress to=apps/next-full-stack/public
compress:
	@bash ./scripts/compress.sh $(to)

# git 으로 관리되는 파일만 복사하는 스크립트
# e.g. make copy from=apps/next-full-stack to=apps/next-full-stack-copy
copy:
	@bash ./scripts/copy.sh $(from) $(to)

# 패키지 생성 (대화형 UI)
# e.g. make create
create:
	@bash ./scripts/create.sh

# git clean 후, 프로젝트 초기화
init:
	@bash ./scripts/init.sh

# 디스크 사용량 표시
du:
	@du -sh ./apps/* ./packages/* | sort -hr

# 의존성 문제 발생 시 프로젝트 전체 초기화
project-clean:
	@git clean -xfd
	@rm -f pnpm-lock.yaml
