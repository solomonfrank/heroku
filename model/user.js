/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line prettier/prettier
import session from 'express-session';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line prettier/prettier
// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
// eslint-disable-next-line prettier/prettier
// import jwt from "jsonwebtoken";
import { usersData } from './database';

// const counter = 1;
// eslint-disable-next-line prettier/prettier
const secret = 'banka';

// const usersData = session.users;
session.users = usersData;
class User {
  // generic user class

  constructor(
    firstName,
    lastName,
    password,
    email,
    type = 'client',
    isAdmin = false,
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._type = type;
    this._isAdmin = isAdmin;
    this._loggedIn = false;

    // eslint-disable-next-line no-underscore-dangle
    // this._id = counter; // user id to keep track of users

    // counter += 1;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password) {
    this._password = password;
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
    this.email = email;
  }

  getType() {
    return this._type;
  }

  setType() {
    this._type = true;
  }

  getIsAdmin() {
    return this._isAdmin;
  }

  setIsAdmin() {
    this.isAdmin = true;
  }

  getId() {
    return this._id;
  }

  static getLoggedIn() {
    return this._loggedIn;
  }

  static setLoggedIn() {
    this._loggedIn = true;
  }

  save() {
    const first = this.getFirstName();
    const last = this.getLastName();
    const email = this.getEmail();
    const password = this.getPassword();
    const type = this.getType();
    const isAdmin = this.getIsAdmin();
    // const id = this.getId();

    const token = jwt.sign(
      {
        last,
        first,
        email,
      },
      secret,
    );

    const users = {
      id: usersData.length + 1,
      email,
      first,
      last,
      password,
      type,
      isAdmin,
      token,
    };

    let lastInsert;
    if (usersData.push(users)) {
      lastInsert = {
        id: usersData.length,
        token,
        email,
        first,
        last,
        type,
      };
      return lastInsert;
      // eslint-disable-next-line no-else-return
    } else {
      lastInsert = false;
      return lastInsert;
    }
  }

  static login(email, password) {
    const found = usersData.find(
      user => user.email === email && user.password === password,
    );

    if (!found) return false;

    // this._loggedIn = true;
    found.isLoggedIn = true;
    session.loggedIn = found.isLoggedIn;
    if (found.type === 'staff') {
      session.staffId = found.id;
      session.type = found.type;
    } else if (found.type === 'cashier') {
      session.cashierId = found.id;
      session.type = found.type;
    } else {
      session.userId = found.id;
      session.type = found.type;
    }

    return found;
  }

  static logout() {
    session.loggedIn = false;
  }
}

// console.log(usersData);

// module.exports = User;
export default User;
