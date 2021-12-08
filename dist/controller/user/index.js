"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _user = _interopRequireWildcard(require("../../model/user"));

var _auth = require("../auth");

var _logger = _interopRequireDefault(require("../../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import passport from "passport";
// import AuthVerify from "../../middleware/auth"
var logger = (0, _logger["default"])("user");
var api = (0, _express.Router)();
api.post("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _user["default"](req.body);
            _context.prev = 1;

            _user["default"].register(new _user["default"](user), req.body.password, function (err, createdUser) {
              if (err) {
                logger.error("Error registering user ".concat(JSON.stringify(err)));

                if (err.name = "MissingPasswordError") {
                  return res.status(400).json({
                    message: "Please enter a password"
                  });
                } else if (err.name === _user.PASSWORD_LENGTH_ERROR) {
                  return res.status(409).json({
                    message: "Password must be at least ".concat(_user.MIN_LENGTH, " characters long")
                  });
                } else if (err.name === "UsernameExistsError") {
                  return res.status(409).json({
                    message: "Username already exists"
                  });
                }

                return res.status(500).json({
                  message: "Error registering user"
                });
              }

              req.user = createdUser;
              next();
            });

            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            logger.error(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              message: "Failed to register user"
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 5]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(), _auth.passportAuthenticate, _auth.handleAuthSuccessResponse, _auth.generateAccessToken);
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=index.js.map