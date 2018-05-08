protobuf:
	protoc -I ./ERC20/proto ./ERC20/proto/state.proto ./ERC20/proto/payload.proto --go_out=./ERC20/proto/erc20_pb
	pbjs -t static-module -w commonjs -o ./wallet-react-ui/src/proto/payload_pb.js ERC20/proto/payload.proto
	protoc -I ./ERC20/proto ./ERC20/proto/state.proto ./ERC20/proto/payload.proto --js_out=import_style=commonjs,binary:./dev-scripts/proto

network_start: network_down docker_build network_up

network_up:
	docker-compose -f ./sawtooth-erc20.yaml up --force-recreate 

network_down:
	docker-compose -f ./sawtooth-erc20.yaml down 

network_build:
	docker-compose -f ./sawtooth-erc20.yaml build 

docker_build: build_erc20_token_tp build_metrics build_metrics_dash
	
build_erc20_token_tp: 
	docker build -f docker/ERC20/Dockerfile -t erc20-token-tp . 

build_metrics: 
	docker build -f docker/grafana/influxdb/Dockerfile -t sawtooth-metrics docker/grafana/influxdb/. 
build_metrics_dash: 
	docker build -f docker/grafana/Dockerfile -t sawooth-metrics-dashboard docker/grafana/. 

genesis_batch: 
	node ./dev-scripts/genesis.js