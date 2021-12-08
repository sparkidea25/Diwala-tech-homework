"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _winston = require("winston");

var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    errors = _winston.format.errors,
    label = _winston.format.label,
    printf = _winston.format.printf,
    splat = _winston.format.splat,
    colorize = _winston.format.colorize; // Handles pretty printing objects passed to logger rather than `[object Object]
// Does not handle string + object log message. To log this way, use %o, such as logger.info("some message %o", objectToPrint)
// Ref: https://github.com/winstonjs/winston/issues/1217

var customFormat = printf(function (info) {
  if ((0, _typeof2["default"])(info.message) === 'object') {
    info.message = JSON.stringify(info.message, null, 2);
  }

  return "".concat(info.timestamp, " ").concat(info.level, " [").concat(info.label, "]: ").concat(info.message);
}); // Accepts label to be prepended for logs produced by logger and returns logger
// Example: 
// const logger = require('../config/logger')('userController');
// logger.info('some log')

var _default = function _default() {
  var sourceLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _winston.createLogger)({
    transports: [new _winston.transports.Console()],
    format: combine(label({
      label: sourceLabel
    }), colorize(), timestamp(), errors({
      stack: true
    }), splat(), customFormat),
    exitOnError: false
  });
};

exports["default"] = _default;
//# sourceMappingURL=logger.js.map