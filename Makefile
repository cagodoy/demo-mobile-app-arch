NODE_MODULES_PATH=$(HOME)/.nvm/versions/node/v11.15.0/lib/node_modules
PROTOC_GEN_TS_PATH=$(NODE_MODULES_PATH)/ts-protoc-gen/bin/protoc-gen-ts
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

clean-proto cp:
	@echo "[clean] Cleaning proto files..."
	@rm -rf proto/go/*.pb.go || true
	@rm -rf proto/ts/*.ts || true
	@rm -rf proto/ts/*.js || true

proto p: clean-proto
	@echo "[proto] Generating proto file..."
	@protoc --go_out=plugins=grpc:. ./proto/demo.proto 
	@mv proto/*.pb.go proto/go
	@protoc --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" --js_out="import_style=commonjs,binary:." --ts_out="." ./proto/demo.proto
	@mv proto/*.js proto/*.ts proto/ts
	

.PHONY: clean-proto cp proto p