/* eslint-disable no-underscore-dangle */

import session from 'express-session';
// const User = require("./user");
import { usersAccount } from './database';


// let accountCounter = 1;
class Account {
  constructor(firstName, lastName, email, type, openingBalance = 0) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._type = type;
    this._openingBalance = openingBalance;
    this._balance = this._openingBalance;
    // this._id = accountCounter;
    this._status = 'dormant';

    this._accountNumber = Math.floor((1 + Math.random()) * 1000000);
  }

  getFirstName() {
    return this._firstName;
  }

  setFirstName(firstName) {
    this._firstName = firstName;
  }

  getLastName() {
    return this._lastName;
  }

  setLastName(lastName) {
    this._lastName = lastName;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this._email = email;
  }

  getType() {
    return this._type;
  }

  setType() {
    this._type = true;
  }

  getAccountNumber() {
    return this._accountNumber;
  }

  getBalance() {
    // eslint-disable-next-line no-return-assign
    return (this._balance = this._openingBalance);
  }

  getStatus() {
    return this._status;
  }

  setStatus() {
    const balance = this.getBalance();
    if (balance <= 0) this._status = 'dormant';

    this._status = 'active';
  }

  save() {
    const first = this.getFirstName();
    const last = this.getLastName();
    const email = this.getEmail();
    const Balance = this.getBalance();
    const type = this.getType();
    const accNumber = this.getAccountNumber();
    const status = this.getStatus();

    const user = {
      id: usersAccount.length + 1,
      first,
      last,
      email,
      Balance,
      type,
      accNumber,
      status,
    };
    // return  accDb.push(user1);
    // if (!session.account) {
    // session.account = [];
    // }
    let lastInsert;
    if (usersAccount.push(user)) {
      lastInsert = {
        // eslint-disable-next-line no-underscore-dangle
        id: usersAccount.length,
        email,
        first,
        last,
        userId: session.userId || session.staffId || session.cashierId,
        accNumber,
        Balance,
        status,
        type,
      };
      return lastInsert;
    }
    lastInsert = false;
    return lastInsert;
  }
}

//
// module.exports = Account;
export default Account;
