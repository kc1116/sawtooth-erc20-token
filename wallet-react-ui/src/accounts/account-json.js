const cryptico = require('cryptico');

export class AccountManager {
    constructor(accountStore, callback) {
        this.accountStore = accountStore;
        this.fileReader = new FileReader();
        this.fileReader.onload = (e) => {
            this.parseFileContents(e.target.result, callback);
        }
    }
    readFile(file) {
        this.fileReader.readAsText(file);
    }

    parseFileContents(contents, callback) {
        try {
            const keys = JSON.parse(contents);
            if(!keys.encrypted) {
                this.import(keys);
            } else {
                console.log(keys);
                callback(keys.account);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async import(keys) {
        try {
            await this.accountStore.newAccount(keys.privateKey);
        } catch (error) {
            throw new Error(error);
        }
    }
    newAccessKeyPair(password) {
        const priv = cryptico.generateRSAKey(password, 1024);
        const pub = cryptico.publicKeyString(priv);
        return {priv, pub}
    }
    async newEncryptedAccount(password) {
        try {
            if(password !== '') {
                const keys = this.newAccessKeyPair(password);
                await this.accountStore.newAccount(null, true, {priv: keys.priv, pub: keys.pub});
            } else {
                await this.accountStore.newAccount(null, false);
            }
        } catch (error) {
        throw new Error(error);
        }
    }

    async decryptAccount(password, encryptedAccount) {
        console.log(encryptedAccount);
        try {
            const keys = this.newAccessKeyPair(password);
            const account = keys.priv.decrypt(encryptedAccount);
            console.log(account);
            await this.accountStore.newAccount(account.privateKey, true, {priv: keys.priv, pub: keys.pub});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
