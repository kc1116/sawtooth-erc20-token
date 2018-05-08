import { observable } from 'mobx';
import {Account} from '../accounts/account';

export class AccountStore {
  @observable accounts;
  @observable current; 

  constructor() {
   this.accounts = [];
   this.current = null
  }

  switchAccount(publicKey) {
      this.current = this.findAccount(publicKey);
      this.current.init()
  }

  async newAccount(privateKey, encrypt, encryptOptions) {
    try {
      const account = new Account(privateKey, encrypt, encryptOptions);
      if(!this.findAccount(account.publicKey)) {
        await account.init();
        this.accounts.push(account);
        this.current = account;
      }

      return this.current;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAccount(publicKey) {
    return this.accounts.find(account => {return account.publicKey === publicKey});
  }
}

export const accountStore = new AccountStore();