


import * as namespaces from './namespace_prefixes';

const {createHash} = require('crypto');
const uuidv4 = require('uuid/v4');
const protobuf = require('sawtooth-sdk/protobuf');
const payloads = require('../proto/payload_pb').erc20_pb;
const gp = require('../proto/payload_pb').google;
const FAMILY_NAME = 'erc20-token';
const FAMILY_VERSION = '1.0';
const REST_API = process.env.NODE_ENV === 'development' ? "http://localhost:3010/batches" : 'http://127.0.0.1:8008/batches';

const newSingleBatch = (inputs, outputs, signer, dependencies, payload) => {
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: FAMILY_NAME,
        familyVersion: FAMILY_VERSION,
        inputs: [...inputs],
        outputs: [...outputs],
        signerPublicKey: signer.getPublicKey().asHex(), 
        nonce: uuidv4(),
        // In this example, we're signing the batch with the same private key,
        // but the batch can be signed by another party, in which case, the
        // public key will need to be associated with that key.
        batcherPublicKey: signer.getPublicKey().asHex(),
        // In this example, there are no dependencies.  This list should include
        // an previous transaction header signatures that must be applied for
        // this transaction to successfully commit.
        // For example,
        // dependencies: ['540a6803971d1880ec73a96cb97815a95d374cbad5d865925e5aa0432fcf1931539afe10310c122c5eaae15df61236079abbf4f258889359c4d175516934484a'],
        dependencies: dependencies,
        payloadSha512: createHash('sha512').update(payload).digest('hex')
    }).finish()

    const transactionSignature = signer.sign(transactionHeaderBytes)
    const transaction = protobuf.Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: transactionSignature,
        payload: payload
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
    return protobuf.BatchList.encode({
        batches: [batch]
    }).finish()
}

const submitBatch = async (batch) => {
    try {
        const request = new Request(REST_API, {
            method: 'POST', 
            body: batch, 
            headers: new Headers({'Content-Type': 'application/octet-stream'})
        });
        const response = await window.fetch(request);
        return await response.json();
    } catch (error) {
        throw new Error(error)
    }
}

export const transfer = async (to, tokens, signer) => {    
    try {
        const from = signer.getPublicKey().asHex();
        const transfer = payloads.TransferPayload.create({to: to, tokens: tokens});

        // we are going to wrap this data in google.protobuf.any, to allow for arbitrary data passing in our 1 transaction handler many subhandler scheme 
        const transferAny = gp.protobuf.Any.create({type_url: 'github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb.TransferPayload', value: payloads.TransferPayload.encode(transfer).finish()})

        const payload = getPayload(transferAny, payloads.ERC20Action.TRANSFER);
        const namespaceAddresses = [
            namespaces.makeAddress(namespaces.BALANCES, from),
            namespaces.makeAddress(namespaces.BALANCES, to)
        ];

        console.log('namespaceAddresses', namespaceAddresses)

        const inputs = [...namespaceAddresses], outputs = [...namespaceAddresses];
        return await submitBatch(newSingleBatch(inputs, outputs, signer, [], payload));
    } catch (error) {
        throw new Error(error);
    }
}

const getPayload = (anyData, action) => {
    const data = payloads.AnyData.create({data: anyData})
    const payload = payloads.Payload.create({action: action, data: data});
    return payloads.Payload.encode(payload).finish();
}

export const approve = async (spender, tokens, signer) => {    
    try {

        const approver = signer.getPublicKey().asHex();
        const approval = payloads.ApprovePayload.create({spender, tokens});

        // we are going to wrap this data in google.protobuf.any, to allow for arbitrary data passing in our 1 transaction handler many subhandler scheme 
        const approvalAny = gp.protobuf.Any.create({type_url: 'github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb.ApprovePayload', value: payloads.ApprovePayload.encode(approval).finish()})

        const payload = getPayload(approvalAny, payloads.ERC20Action.APPROVE);

        const namespaceAddresses = [
            namespaces.makeAddress(namespaces.ALLOWED, approver.concat(spender))
        ];
        const inputs = [...namespaceAddresses], outputs = [...namespaceAddresses];

        return await submitBatch(newSingleBatch(inputs, outputs, signer, [], payload));
    } catch (error) {
        throw new Error(error);
    }
}

export const transferFrom = async (to, from, tokens, signer) => {    
    try {
        const spender = signer.getPublicKey().asHex();
        const transerFrom = payloads.TransferFromPayload.create({from, to, tokens});
        // we are going to wrap this data in google.protobuf.any, to allow for arbitrary data passing in our 1 transaction handler many subhandler scheme 
        const transferFromAny = gp.protobuf.Any.create({type_url: 'github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb.TransferFromPayload', value: payloads.TransferFromPayload.encode(transerFrom).finish()})
        const payload = getPayload(transferFromAny, payloads.ERC20Action.TRANSFER_FROM);

        const namespaceAddresses = [
            namespaces.makeAddress(namespaces.ALLOWED, from.concat(spender)),
            namespaces.makeAddress(namespaces.BALANCES, from),
            namespaces.makeAddress(namespaces.BALANCES, to)
        ];
        const inputs = [...namespaceAddresses], outputs = [...namespaceAddresses];

        return await submitBatch(newSingleBatch(inputs, outputs, signer, [], payload));
    } catch (error) {
        throw new Error(error);
    }
}

