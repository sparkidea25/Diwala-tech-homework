"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUnauthorizedError = exports.AuthVerify = void 0;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _auth = require("../../controller/auth");

var _logger = _interopRequireDefault(require("../../config/logger"));

require("dotenv").config();

var logger = (0, _logger["default"])("middleware/auth");
var JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log("[-] JWT_SECRET is no set. Auth wont function correctly");
}

var AuthVerify = (0, _expressJwt["default"])({
  secret: JWT_SECRET || "",
  algorithms: ["HS256"],
  issuer: _auth.ISSUER
});
exports.AuthVerify = AuthVerify;

var handleUnauthorizedError = function handleUnauthorizedError(err, _req, res, next) {
  if (err.name === "UnauthorizedError") {
    logger.error(err);
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  next();
};

exports.handleUnauthorizedError = handleUnauthorizedError;
//# sourceMappingURL=index.js.map