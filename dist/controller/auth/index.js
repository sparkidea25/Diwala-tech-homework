"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportAuthenticate = exports.handleAuthSuccessResponse = exports.generateAccessToken = exports["default"] = exports.TOKEN_EXPIRATION = exports.JWT_SECRET = exports.ISSUER = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _os = _interopRequireDefault(require("os"));

var _auth = require("../../middleware/auth");

require("dotenv").config();

var TOKEN_EXPIRATION = 60 * 60 * 24 * 365; //1 Year

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
var ISSUER = process.env.NODE_ENV === "production" ? _os["default"].hostname() : "localhost";
exports.ISSUER = ISSUER;
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;

var passportAuthenticate = _passport["default"].authenticate("local", {
  session: false,
  scope: []
});

exports.passportAuthenticate = passportAuthenticate;

var generateAccessToken = function generateAccessToken(req, res, next) {
  if (!req.token) {
    req.token = _jsonwebtoken["default"].sign({
      id: req.user._id,
      username: req.user.username
    }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
      algorithm: 'HS256',
      issuer: ISSUER
    });
  }

  next();
};

exports.generateAccessToken = generateAccessToken;

var handleAuthSuccessResponse = function handleAuthSuccessResponse(req, res) {
  var returnedUser = req.user.toObject();
  delete returnedUser.salt;
  delete returnedUser.hash;
  delete returnedUser.__v;
  delete returnedUser.password;
  return res.status(200).json({
    message: "User authenticated successfully.",
    success: true,
    data: {
      token: req.token,
      user: returnedUser
    }
  });
};

exports.handleAuthSuccessResponse = handleAuthSuccessResponse;
var api = (0, _express.Router)();
api.post("/", passportAuthenticate, generateAccessToken, handleAuthSuccessResponse);
api.post("/logout", _auth.AuthVerify, function (req, res, next) {
  req.logout();
  return res.status(200).end();
});
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=index.js.map