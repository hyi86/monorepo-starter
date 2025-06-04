SHELL := /bin/bash

.PHONY: clean compress copy create init du project-clean

# clean empty directories
clean:
	@find . -type d -empty -delete

# compress all files managed by git
compress:
	@bash ./scripts/compress.sh $(to)

# Copy files except those listed in .gitignore
copy:
	@bash ./scripts/copy.sh $(from) $(to)

# create package by templates
create:
	@bash ./scripts/create.sh $(package-name) $(type)

# initialize project
init:
	@bash ./scripts/init.sh

# show disk usage
du:
	@du -sh ./apps/* ./packages/* | sort -hr

# clean project
project-clean:
	@git clean -xfd
	@rm -f pnpm-lock.yaml
