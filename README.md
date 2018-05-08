# sawtooth-erc20-token

This project serves as a good example of how to develop transaction processors with Golang in Hyperledger Sawtooth. We are using the ERC20 specification to develop a transaction processors that handles token functionality such as Transfer, Approve, and TransferFrom. An example wallet ui can be found in the wallet-react-ui directory. 

## Usage 

### Building 

Sawtooth uses docker-compose to create a network of containers that interact with each other. The sawtooth-erc20.yaml file contains our network configuration. You will notice the images we are using from the hyperledger docker repo. Our ERC20 transaction processor also is configured in this .yaml file. The container is built from the dockerfile located in the ./docker/ERC20 . We can build our image using the handy makefile provided. 

```sh
$ make docker_build
```

This will build our image so docker-compose can use it as a base for our ERC20 transaction processor container. 

### Starting the network

There are also commands in the makefile for bringing our network up/down and starting the network. To start our network completely, the following command will bring down the current network, build our ERC20 image and bring the network up. 

```sh
$ make network_start 
```

We can also bring our network up and down with the following commands

```sh 
$ make network_up 
$ make network_down
```

Once our network is up we can query our state on the port specified in the docker-compose file. Our metrics database name is sawtooth-metrics, and the Grafana dashboard running on port 3000 has a default username and password for the admin account: {username: admin. password: admin}. We are all set and can now start our wallet ui and interact with our tokens. 

## Configuration

Notice the entry for our validator in the .yaml file. You will see that we attach a volume to the container that contains the configuration directory at the top level of this project. The configuration.sh file in this directory will then get executed when the validator starts, allowing us to specify some default keypairs etc for things  like our validator, network etc. 

We do the same thing with our sawtooth-shell container, attaching a volume that contains a our genesis.batch file. This is a sawtooth transaction signed with our default privatekey specified in the configuration.sh file. This genesis.batch transaction is a 'initializeToken' transaction and when submitted will set some token defaults like name, symbol, total-supply etc and also give our set the owner of all the tokens to the publickey corresponding to our default private key.

### Generating Genesis Batch

To generate a new genesis.batch file, modify the genesis.js file in the ./dev-scripts directory with the parameters you want. Then run the genesis.js file, it will sign the transaction with the default private key and write the bytes to the genesis.batch file. 

```sh
$ cd dev-scripts
$ yarn
$ yarn genesis
```
