SHELL := /bin/bash

# make init
.PHONY: init
init:
	@echo "Initializing project..."
	@bash ./scripts/init.sh

# make copy from=apps/vanilla-ts to=apps/vanilla
.PHONY: copy
copy:
	@echo "Copying files..."
	rsync -av --files-from=<(git ls-files | grep "^$(from)/" | sed "s|^$(from)/||") $(from) $(to)

