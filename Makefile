#
# SO variables
#
# AZURE_USER
# AZURE_PASSWORD
#

#
# Internal variables
#
BIN_PATH=$(PWD)/bin

dependencies dep:
	@echo "[dependencies] Installing dependencies..."
	@npm install -g typescript

prepare pre:
	@echo "[init] Initialize repo..."
	@git submodule init
	@git submodule update
	@echo "[lib] Installing lib dependencies..."
	@cd lib && make prepare && make ts
	@echo "[auth] Preparing auth repository..."
	@cd src && cd auth-api && make prepare && make ts
	@echo "[gateway] Installing auth dependencies..."
	@cd src && cd gateway-api && make prepare && make ts

compose co:
	@echo "[docker-compose] Running docker-compose..."
	@docker-compose build
	@docker-compose up

stop s: 
	@echo "[docker-compose] Stopping docker-compose..."
	@docker-compose down
	
.PHONY: compose co stop s