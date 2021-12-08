"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("../config/db"));

var _user = _interopRequireDefault(require("../controller/user"));

var _auth = _interopRequireDefault(require("../controller/auth"));

var _auth2 = require("../middleware/auth");

var router = (0, _express["default"])();

var handleUnhandledError = function handleUnhandledError(err, _req, res, _next) {
  console.error("unhandled error", err);
  return res.status(500).end();
};

(0, _db["default"])();
router.use('/user', _user["default"]);
router.use('/auth', _auth["default"]);
router.use(_auth2.handleUnauthorizedError);
router.use(handleUnhandledError);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.router.js.map