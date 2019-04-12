"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersAccount = exports.usersData = void 0;
var usersData = [{
  id: 1,
  email: 'solomon@yahoo.com',
  first: 'solomon',
  last: 'rock',
  password: '123456',
  type: 'staff',
  isAdmin: true,
  token: 'y88y8y8y8yyyyy'
}, {
  id: 2,
  email: 'solomon11@yahoo.com',
  first: 'solomon',
  last: 'rock',
  password: '123456',
  type: 'staff',
  isAdmin: true,
  token: 'y88y8y8y8yyyyy'
}];
exports.usersData = usersData;
var usersAccount = [{
  id: 1,
  email: 'solo@yahoo.com',
  first: 'solo',
  last: 'rock',
  userId: 2,
  accNumber: 5555555,
  Balance: 10000,
  status: 'dormant',
  type: 'savings'
}]; // export default usersData;

exports.usersAccount = usersAccount;