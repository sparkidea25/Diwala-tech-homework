"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _winston = _interopRequireWildcard(require("winston"));

var _user = _interopRequireDefault(require("./model/user"));

var _user2 = _interopRequireDefault(require("./routes/user.router"));

var _pizza = _interopRequireDefault(require("./routes/pizza.router"));

var _order = _interopRequireDefault(require("./routes/order.router"));

var _logger = _interopRequireDefault(require("./config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

require("dotenv").config();

var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    colorize = _winston.format.colorize,
    printf = _winston.format.printf;

var expressWinston = require("express-winston");

var passport = require('passport');

var LocalStrategy = require("passport-local").Strategy;

var logger = (0, _logger["default"])('app');
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(expressWinston.logger({
  transports: [new _winston.transports.Console()],
  format: combine(timestamp(), colorize(), printf(function (info) {
    return "".concat(info.timestamp, " ").concat(info.message, " ").concat(info.meta.res.statusCode, " ").concat(info.meta.responseTime, "ms");
  }))
}));
app.use(expressWinston.errorLogger({
  transports: [new _winston["default"].transports.Console()],
  format: _winston.format.combine(_winston.format.colorize(), _winston.format.json())
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, _user["default"].authenticate()));
app.use("/v1", _user2["default"]);
app.use("/v1", _pizza["default"]);
app.use("/v1", _order["default"]);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  logger.info("\u26A1\uFE0F[Server] started on port ".concat(port));
});
//# sourceMappingURL=index.js.map