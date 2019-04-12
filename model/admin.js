"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _database = require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Admin =
/*#__PURE__*/
function (_User) {
  _inherits(Admin, _User);

  function Admin() {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, _getPrototypeOf(Admin).apply(this, arguments));
  }

  _createClass(Admin, [{
    key: "deleteAcc",
    // eslint-disable-next-line class-methods-use-this
    value: function deleteAcc(acc, accArray) {
      // eslint-disable-next-line no-console
      var found = accArray.find(function (user) {
        return user.accNumber === acc;
      }); // let found = accArray.indexOf(acc)

      /* if(found === -1){
          return false;
      }else{
          let found = accArray.filter(user => user.accNumber !== acc);
          return found;
      }
        */

      if (!found) {
        return false;
      } // return accArray.filter(user => user.accNumber !== acc);


      var index = accArray.indexOf(found);
      return accArray.splice(index, 1);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "activateAcc",
    value: function activateAcc(acc, accountArr) {
      var found = accountArr.find(function (user) {
        return user.accNumber === acc;
      });
      if (!found) return false;

      if (found.status === 'dormant') {
        found.status = 'active';
      } else if (found.status === 'active') {
        found.status = 'dormant';
      }

      return found;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "findOne",
    value: function findOne(acc, accArray) {
      var result = accArray.find(function (user) {
        return user.accNumber === acc;
      });
      if (!result) return false;
      return result;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "findAll",
    value: function findAll() {
      if (!_database.usersAccount) return false;
      return _database.usersAccount;
    }
  }]);

  return Admin;
}(_user["default"]); //
// module.exports = Admin;


var _default = Admin;
exports["default"] = _default;