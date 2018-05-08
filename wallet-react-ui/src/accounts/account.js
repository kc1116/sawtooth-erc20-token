
import {default as utils} from '../token_utils';
import { observable } from 'mobx';
import { BigNumber } from 'bignumber.js';

const moment = require('moment');
const cryptico = require('cryptico');
const {prefixes, batchWatcher} = utils;

const {createContext, CryptoFactory} = require('sawtooth-sdk/signing');
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1');
const context = createContext('secp256k1');

const REST_API = process.env.NODE_ENV === 'development' ? "http://localhost:3010/state" : 'http://127.0.0.1:8008/state';

export class Account {
    @observable balance; 
    @observable transactions;

    constructor(privateKey, encrypt, encryptOptions) {
        this.transactions = []
        privateKey ?
            this.signer = new CryptoFactory(context).newSigner(new Secp256k1PrivateKey(Buffer.from(privateKey, 'hex'))) : 
            this.signer = new CryptoFactory(context).newSigner(context.newRandomPrivateKey());
        
        this.accountStrPlain = JSON.stringify({publicKey: this.publicKey, privateKey: this.signer._privateKey.asHex()});
        this.publicKey = this.signer.getPublicKey().asHex();
        if(encrypt) {
            this.accountAccessKeys = encryptOptions;
            console.log(this.accountAccessKeys.priv);
            console.log(this.accountAccessKeys.priv.toJSON());
            this.encryptedAccountStr = this.accountAccessKeys.priv.encrypt(this.accountStrPlain, encryptOptions.pub);
        }
        this.encrypted = encrypt;

        this.balance = new BigNumber(0);        
        this.namespaceAddresses = {
            balance: prefixes.makeAddress(prefixes.BALANCES, this.publicKey), 
            allowed: prefixes.makeAddress(prefixes.ALLOWED, this.publicKey),
        };
        this.batchStatusWatcher = new batchWatcher.BatchStatusWatcher(this.transactions.push.bind(this.transactions));
    }

    getDownloadStr() {
        if(this.encrypted) {
            return JSON.stringify({
                account: this.encryptedAccountStr, 
                encrypted: true
            });
        }

        return this.accountStrPlain;
    }

    async init() {
        try {
            await this.getBalance();
        } catch (error) {
            throw new Error(error);
        }
    }

    async transfer(to, tokens){
        try {
            console.log(to, tokens, this.signer.getPublicKey().asHex());
            const response = await utils.token.transfer(to, tokens, this.signer);
            const batchForWatch = new batchWatcher.Batch(response.link, new batchWatcher.MetaData('TRANSFER', `Transfered ${tokens} tokens to ${to}`, moment().toString()));
            this.batchStatusWatcher.subscribe(batchForWatch, (status) => {
                if(status === 'COMMITTED') this.balance = this.balance.minus(tokens); 
            });
        } catch (error) {
            throw new Error(error)(error);
        }
    }

    async approve(spender, tokens){
        try {
            const response = await utils.token.approve(spender, tokens, this.signer);
            const batchForWatch = new batchWatcher.Batch(response.link, new batchWatcher.MetaData('APPROVE', `Approved ${tokens} tokens for spending by ${spender}`, moment().toString()));
            this.batchStatusWatcher.subscribe(batchForWatch, (status) => {
                if(status === 'COMMITTED') console.log('DONE WITH APPROVAL'); 
            });
        } catch (error) {
            throw new Error(error)(error);
        }
    }

    async transferFrom(from, to, tokens){
        try {
            const response = await utils.token.transferFrom(to, from, tokens, this.signer);
            const batchForWatch = new batchWatcher.Batch(response.link, new batchWatcher.MetaData('TRANSFER FROM', `Transfered ${tokens} tokens approved by ${from} to ${to}`, moment().toString()));
            this.batchStatusWatcher.subscribe(batchForWatch, (status) => {
                if(status === 'COMMITTED') console.log('DONE WITH TRANSFER FROM'); 
            });
        } catch (error) {
            throw new Error(error)(error);
        }
    }
    async getBalance() {
        try {
            const results =  await this.queryState(this.namespaceAddresses.balance);
            results.data.length > 0 ? this.balance = new BigNumber(atob(results.data[0].data)) : this.balance = this.balance;
            return this.balance;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllowed() {
        try {
            return await this.queryState(this.namespaceAddresses.allowed);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTransactions() {
        try {
            return await this.queryState(this.namespaceAddresses.balance);
        } catch (error) {
            throw new Error(error);
        }
    }

    async queryState(address) {
        try {
            const uri = `${REST_API}?address=${address}`;
            const init = {method: 'GET', headers: {'Content-Type': 'application/json'}};

            const response = await window.fetch(new Request(uri, init));
            return JSON.parse(await response.json());
        } catch (error) {
            throw new Error(error);
        }
    }
}