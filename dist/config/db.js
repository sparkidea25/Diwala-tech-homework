"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _logger = _interopRequireDefault(require("./logger"));

// import bluebird from "bluebird";
var logger = (0, _logger["default"])("app");

var _default = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var options, dbURI;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = {
            useNewUrlParser: true,
            // promiseLibrary: bluebird,
            // poolSize: 10,
            useUnifiedTopology: true,
            retryWrites: false
          };
          dbURI = process.env.mongodbURi;
          _context.prev = 2;
          _context.next = 5;
          return _mongoose["default"].connect(dbURI, options);

        case 5:
          return _context.abrupt("return", true);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          logger.error('error connecting to db', _context.t0);
          return _context.abrupt("return", null);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[2, 8]]);
}));

exports["default"] = _default;
//# sourceMappingURL=db.js.map