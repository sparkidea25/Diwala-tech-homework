"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var Pizza = mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  }
});

var _default = mongoose.model('Pizza', Pizza);

exports["default"] = _default;
//# sourceMappingURL=index.js.map