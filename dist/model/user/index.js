"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PASSWORD_LENGTH_ERROR = exports.MIN_LENGTH = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var emailRegEx = '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    regex: emailRegEx
  },
  username: {
    type: String
  },
  __v: {
    type: Number,
    select: false
  }
});
var MIN_LENGTH = 6;
exports.MIN_LENGTH = MIN_LENGTH;
var PASSWORD_LENGTH_ERROR = 'PasswordLengthError';
exports.PASSWORD_LENGTH_ERROR = PASSWORD_LENGTH_ERROR;

var passwordValidator = function passwordValidator(password, cb) {
  if (password.trim().length < MIN_LENGTH) {
    return cb({
      name: PASSWORD_LENGTH_ERROR,
      password: "Please password should have at least 6 characters"
    });
  }

  return cb();
};

userSchema.plugin(_passportLocalMongoose["default"], {
  passwordValidator: passwordValidator,
  usernameField: 'email'
});
;
;

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;
//# sourceMappingURL=index.js.map