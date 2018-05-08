const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1');
const {createHash} = require('crypto')
const {protobuf} = require('sawtooth-sdk')
const request = require('request')
const fs = require('fs');
const accounts = require('./protos/account_pb');
const payloads = require('./protos/payload_pb');

const context = createContext('secp256k1')
const pk = Buffer.from("e3ddee618d8a8864481e71021e42ed46c3ab410ab1ad7cdf0ff31f6d61739275", 'hex')
const priv = new Secp256k1PrivateKey(pk)
const signer = new CryptoFactory(context).newSigner(priv)
const proto = require('google-protobuf');
const gprotobuf = require('google-protobuf/google/protobuf/any_pb.js');
const account = new accounts.Account();
const publicData = new accounts.Account.PublicData();

publicData.setName("Khalil Claybon");
publicData.setDateofbirth("November 17");
publicData.setAddress("1100 Frank E")
account.setPublickey(signer.getPublicKey().asHex());
account.setPublicdata(publicData);

console.log(account);

const data = new gprotobuf.Any()
data.setValue(publicData.serializeBinary());
data.setTypeUrl(`github.com/BadgeForce/badgeforce-chain-node/accounts/proto/badgeforce_pb.Account.PublicData`);

const payloadData = new payloads.AnyData()
payloadData.setData(data);
const payload = new payloads.Payload();
payload.setAction(payloads.PayloadAction.STOREPUBLICDATA);
payload.setData(payloadData);

const payloadBytes = payload.serializeBinary();

const prefix = createHash('sha512').update('accounts').digest('hex').substring(0, 6)
const namespace = createHash('sha512').update(signer.getPublicKey().asHex()).digest('hex').toLowerCase().substring(0, 64)

const inputs = prefix.concat(namespace);

const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'badgeforce_accounts',
    familyVersion: '1.0',
    inputs: [inputs],
    outputs: [inputs],
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

const signature = signer.sign(transactionHeaderBytes)

const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes
})

const transactions = [transaction]

const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
}).finish()

const signature1 = signer.sign(batchHeaderBytes)

const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature1,
    transactions: transactions
})

const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
}).finish()
console.log(batchListBytes)
console.log("priv", signer._privateKey.asHex())
console.log("pub", signer.getPublicKey().asHex(), '\n')
console.log("namespace", namespace);

request.post({
    url: 'http://127.0.0.1:8008/batches',
    body: batchListBytes,
    headers: {'Content-Type': 'application/octet-stream'}
}, (err, response) => {
    if (err) return console.log(err)
    console.log(response.body)
})

// stateaddr 1cfbb70d5894fbdcdcdcab4e33dc3f540d79e7d093e06a5b1ee618e8a1f297b0
// Inputs 4f5aa21cfbb70d5894fbdcdcdcab4e33dc3f540d79e7d093e06a5b1ee618e8a1f297b0

// priv e3ddee618d8a8864481e71021e42ed46c3ab410ab1ad7cdf0ff31f6d61739275
// pub 02ccb8bc17397c55242a27d1681bf48b5b40a734205760882cd83f92aca4f1cf45
