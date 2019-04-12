"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressSession = _interopRequireDefault(require("express-session"));

var _database = require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// let accountCounter = 1;
var Account =
/*#__PURE__*/
function () {
  function Account(firstName, lastName, email, type) {
    var openingBalance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, Account);

    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._type = type;
    this._openingBalance = openingBalance;
    this._balance = this._openingBalance; // this._id = accountCounter;

    this._status = 'dormant';
    this._accountNumber = Math.floor((1 + Math.random()) * 1000000);
  }

  _createClass(Account, [{
    key: "getFirstName",
    value: function getFirstName() {
      return this._firstName;
    }
  }, {
    key: "setFirstName",
    value: function setFirstName(firstName) {
      this._firstName = firstName;
    }
  }, {
    key: "getLastName",
    value: function getLastName() {
      return this._lastName;
    }
  }, {
    key: "setLastName",
    value: function setLastName(lastName) {
      this._lastName = lastName;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this._email;
    }
  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this._email = email;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this._type;
    }
  }, {
    key: "setType",
    value: function setType() {
      this._type = true;
    }
  }, {
    key: "getAccountNumber",
    value: function getAccountNumber() {
      return this._accountNumber;
    }
  }, {
    key: "getBalance",
    value: function getBalance() {
      // eslint-disable-next-line no-return-assign
      return this._balance = this._openingBalance;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this._status;
    }
  }, {
    key: "setStatus",
    value: function setStatus() {
      var balance = this.getBalance();
      if (balance <= 0) this._status = 'dormant';
      this._status = 'active';
    }
  }, {
    key: "save",
    value: function save() {
      var first = this.getFirstName();
      var last = this.getLastName();
      var email = this.getEmail();
      var Balance = this.getBalance();
      var type = this.getType();
      var accNumber = this.getAccountNumber();
      var status = this.getStatus();
      var user = {
        id: _database.usersAccount.length + 1,
        first: first,
        last: last,
        email: email,
        Balance: Balance,
        type: type,
        accNumber: accNumber,
        status: status
      }; // return  accDb.push(user1);
      // if (!session.account) {
      // session.account = [];
      // }

      var lastInsert;

      if (_database.usersAccount.push(user)) {
        lastInsert = {
          // eslint-disable-next-line no-underscore-dangle
          id: _database.usersAccount.length,
          email: email,
          first: first,
          last: last,
          userId: _expressSession["default"].userId || _expressSession["default"].staffId || _expressSession["default"].cashierId,
          accNumber: accNumber,
          Balance: Balance,
          status: status,
          type: type
        };
        return lastInsert;
      }

      lastInsert = false;
      return lastInsert;
    }
  }]);

  return Account;
}(); //
// module.exports = Account;


var _default = Account;
exports["default"] = _default;