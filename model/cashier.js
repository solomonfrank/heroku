"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// const cashier = require("./cashier");
// const session = require("express-session");
var Cashier =
/*#__PURE__*/
function (_User) {
  _inherits(Cashier, _User);

  function Cashier() {
    _classCallCheck(this, Cashier);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cashier).apply(this, arguments));
  }

  _createClass(Cashier, [{
    key: "debit",
    // eslint-disable-next-line class-methods-use-this
    value: function debit(accNum, accData, cashier, amount) {
      var found = accData.find(function (acc) {
        return acc.accNumber === accNum;
      }); // console.log(found);

      if (!found) return false;

      if (found.Balance < amount) {
        found.Balance = found.Balance;
      } else {
        found.Balance -= amount;
      }

      return _objectSpread({}, found, {
        cashier: cashier,
        transactionType: "debit",
        transactionId: Math.floor(Math.random() * 1000000)
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "credit",
    value: function credit(accNum, accData, cashier, amount) {
      var found = accData.find(function (acc) {
        return acc.accNumber === accNum;
      });
      if (!found) return false;
      found.Balance += amount;
      return _objectSpread({}, found, {
        cashier: cashier,
        transactionType: "credit",
        transactionId: Math.floor(Math.random() * 1000000)
      });
    }
  }]);

  return Cashier;
}(_user["default"]); // module.exports = Cashier;


var _default = Cashier;
exports["default"] = _default;