LOCAL_HOST=0.0.0.0
USERS_PORT=5020
AUTH_PORT=5010

prepare pre:
	@echo "[prepare] Preparing lib..."
	@npm install

clean-proto cp:
	@echo "[clean-proto] Cleaning proto files..."
	@rm -rf proto/*.pb.go || true

proto p: clean-proto
	@echo "[proto] Generating proto file..."
	@protoc --go_out=plugins=grpc:. ./proto/demo.proto 

wait-db wd:
	@cd wait-db && GOOS=linux GOARCH=amd64 go build -o $(BIN_PATH)/wait-db 

clean c:
	@echo "[clean] Cleaning dist folder..."
	@rm -rf dist-js || true

typescript ts: clean
	@echo "[typescript] Transpiling code..."
	@node_modules/typescript/bin/tsc

go-test gt: 
	@echo "[go-test] Testing code..."
	@USERS_HOST=$(LOCAL_HOST) USERS_PORT=$(USERS_PORT) go test -count=1 -v clients-go/users/user_test.go
	@AUTH_HOST=$(LOCAL_HOST) AUTH_PORT=$(AUTH_PORT) go test -count=1 -v clients-go/auth/auth_test.go

.PHONY: clean-proto cp proto p wait-db wd typescript ts go-test gt