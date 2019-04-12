"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable consistent-return */
// import router from "./routes/route";
var app = (0, _express["default"])(); // eslint-disable-next-line no-use-before-define

app.use(_bodyParser["default"].json()); // eslint-disable-next-line no-use-before-define

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // const debug = Debug("http");

app.use('/api/v1', _route["default"]); // Set environment Port

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log("listening to port ".concat(PORT)); // debug(`listening to port ${PORT}`);
}); // module.exports = app;

var _default = app;
exports["default"] = _default;