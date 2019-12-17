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

init i:
	@echo "[init] Initialize repo..."

compose co:
	@echo "[docker-compose] Running docker-compose..."
	@docker-compose build
	@docker-compose up

stop s: 
	@echo "[docker-compose] Stopping docker-compose..."
	@docker-compose down
	
.PHONY: compose co stop s