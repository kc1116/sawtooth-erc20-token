

const {createContext, CryptoFactory} = require('sawtooth-sdk/signing');
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1');
const {createHash} = require('crypto');
const {protobuf} = require('sawtooth-sdk');
const BigNumber = require('bignumber.js');
const request = require('request');
const fs = require('fs');
const context = createContext('secp256k1');

const payloads = require('./proto/payload_pb');
const any = require('google-protobuf/google/protobuf/any_pb.js');

// create a signer from a private key hex DEFAULT private key
const privateKey = "e3ddee618d8a8864481e71021e42ed46c3ab410ab1ad7cdf0ff31f6d61739275";
const pk = Buffer.from(privateKey, 'hex');
const priv = new Secp256k1PrivateKey(pk);
const signer = new CryptoFactory(context).newSigner(priv);


// specify the data to use for our token initialization 
const initialTokenData = {
    symbol: 'HODL', 
    name: 'HODL DA TOKEN', 
    decimals: '18', 
    totalSupply: new BigNumber(1).times('10e+9').times('10e+18').toString()
};

const tokenInitData = new payloads.InitTokenStatePayload();
tokenInitData.setSymbol(initialTokenData.symbol);
tokenInitData.setName(initialTokenData.name);
tokenInitData.setDecimals(initialTokenData.decimals);
tokenInitData.setTotalsupply(initialTokenData.totalSupply);

// we are going to wrap this data in google.protobuf.any, to allow for arbitrary data passing in our 1 transaction handler many subhandler scheme 
const tokenInitDataAny = new any.Any()
tokenInitDataAny.setValue(tokenInitData.serializeBinary());
tokenInitDataAny.setTypeUrl('github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb.InitTokenStatePayload');

// set action , and our any data for our Payload protobuf and then serialize the payload for signing 
const action = payloads.ERC20Action.INITIALIZE
const data = new payloads.AnyData()
data.setData(tokenInitDataAny);
const payload = new payloads.Payload();
payload.setAction(action);
payload.setData(data);
const payloadBytes = payload.serializeBinary();

const namespaceData = [
    {prefix: 'erc20-token-symbol', namespace: '-constant'},
    {prefix: 'erc20-token-name', namespace: '-constant'},
    {prefix: 'erc20-token-decimals', namespace: '-constant'},
    {prefix: 'erc20-token-totalSupply', namespace: '-constant'},
    {prefix: 'erc20-token-balances', namespace: signer.getPublicKey().asHex()},
    {prefix: 'erc20-token-INIT', namespace: '-constant'}
]

const inputs = [], outputs = [];
namespaceData.forEach(data => {
    const prefix = createHash('sha512').update(data.prefix).digest('hex').substring(0, 6)
    const namespace = createHash('sha512').update(data.namespace).digest('hex').toLowerCase().substring(0, 64)
    inputs.push(prefix.concat(namespace)); 
    outputs.push(prefix.concat(namespace));
})


const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'erc20-token',
    familyVersion: '1.0',
    inputs: [...inputs],
    outputs: [...outputs],
    signerPublicKey: signer.getPublicKey().asHex(),
    // In this example, we're signing the batch with the same private key,
    // but the batch can be signed by another party, in which case, the
    // public key will need to be associated with that key.
    batcherPublicKey: signer.getPublicKey().asHex(),
    // In this example, there are no dependencies.  This list should include
    // an previous transaction header signatures that must be applied for
    // this transaction to successfully commit.
    // For example,
    // dependencies: ['540a6803971d1880ec73a96cb97815a95d374cbad5d865925e5aa0432fcf1931539afe10310c122c5eaae15df61236079abbf4f258889359c4d175516934484a'],
    dependencies: [],
    payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
}).finish()

// sign transanction 
const transactionSignature = signer.sign(transactionHeaderBytes)
const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: transactionSignature,
    payload: payloadBytes
});

// create and sign batch 
const transactions = [transaction]
const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
}).finish()
const batchSignature = signer.sign(batchHeaderBytes)
const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions
})

// encode our batch
const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
}).finish()

console.log("private key", signer._privateKey.asHex())
console.log("public key", signer.getPublicKey().asHex(), '\n')
console.log("namespace", inputs);

// save our batchListBytes to a genesis.batch file to be used during our network start up 
const configurationDir = "../configuration/genesis/genesis.batch";
fs.writeFile(configurationDir, batchListBytes, console.error)

