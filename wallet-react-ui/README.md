# wallet-react-ui

This is a example wallet application written in React for our ERC20 token on Sawtooth

- Supports Transfer, Approve, and TransferFrom from ERC20 spec
- Creating new accounts 
- Encrypt accounts with a password 
- Download and upload account json files encrypted/plain text

## Installation 

To install the dependencies run 
```sh
$ yarn  
```

## Usage 

These instructions assume you have already started the sawtooth docker-compose network. The default wallet is in the default-wallet.json file.

### Webpack Dev Server

First start our REST proxy server. We use this to get around cors issues when using the webpack dev server

```sh
$ yarn start:proxy
```

Now start our webpack dev server and serve the react app. After you can interact with the app and make changes which will hot reload.

```sh 
$ yarn start
```

### Building 

You can build the app and serve it from a different source. 

```sh 
$ yarn build
```

Compiled files are outputted to the build directory. 
