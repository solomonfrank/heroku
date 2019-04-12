"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressSession = _interopRequireDefault(require("express-session"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const counter = 1;
// eslint-disable-next-line prettier/prettier
var secret = 'banka'; // const usersData = session.users;

_expressSession["default"].users = _database.usersData;

var User =
/*#__PURE__*/
function () {
  // generic user class
  function User(firstName, lastName, password, email) {
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'client';
    var isAdmin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, User);

    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._type = type;
    this._isAdmin = isAdmin;
    this._loggedIn = false; // eslint-disable-next-line no-underscore-dangle
    // this._id = counter; // user id to keep track of users
    // counter += 1;
  }

  _createClass(User, [{
    key: "getPassword",
    value: function getPassword() {
      return this._password;
    }
  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this._password = password;
    }
  }, {
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
      this.email = email;
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
    key: "getIsAdmin",
    value: function getIsAdmin() {
      return this._isAdmin;
    }
  }, {
    key: "setIsAdmin",
    value: function setIsAdmin() {
      this.isAdmin = true;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this._id;
    }
  }, {
    key: "save",
    value: function save() {
      var first = this.getFirstName();
      var last = this.getLastName();
      var email = this.getEmail();
      var password = this.getPassword();
      var type = this.getType();
      var isAdmin = this.getIsAdmin(); // const id = this.getId();

      var token = _jsonwebtoken["default"].sign({
        last: last,
        first: first,
        email: email
      }, secret);

      var users = {
        id: _database.usersData.length + 1,
        email: email,
        first: first,
        last: last,
        password: password,
        type: type,
        isAdmin: isAdmin,
        token: token
      };
      var lastInsert;

      if (_database.usersData.push(users)) {
        lastInsert = {
          id: _database.usersData.length,
          token: token,
          email: email,
          first: first,
          last: last,
          type: type
        };
        return lastInsert; // eslint-disable-next-line no-else-return
      } else {
        lastInsert = false;
        return lastInsert;
      }
    }
  }], [{
    key: "getLoggedIn",
    value: function getLoggedIn() {
      return this._loggedIn;
    }
  }, {
    key: "setLoggedIn",
    value: function setLoggedIn() {
      this._loggedIn = true;
    }
  }, {
    key: "login",
    value: function login(email, password) {
      var found = _database.usersData.find(function (user) {
        return user.email === email && user.password === password;
      });

      if (!found) return false; // this._loggedIn = true;

      found.isLoggedIn = true;
      _expressSession["default"].loggedIn = found.isLoggedIn;

      if (found.type === 'staff') {
        _expressSession["default"].staffId = found.id;
        _expressSession["default"].type = found.type;
      } else if (found.type === 'cashier') {
        _expressSession["default"].cashierId = found.id;
        _expressSession["default"].type = found.type;
      } else {
        _expressSession["default"].userId = found.id;
        _expressSession["default"].type = found.type;
      }

      return found;
    }
  }, {
    key: "logout",
    value: function logout() {
      _expressSession["default"].loggedIn = false;
    }
  }]);

  return User;
}(); // console.log(usersData);
// module.exports = User;


var _default = User;
exports["default"] = _default;