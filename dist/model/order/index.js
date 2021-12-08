"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  Time: {
    type: Date,
    "default": Date.now
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
    required: true
  },
  amount: {
    type: Number
  }
});

var _default = mongoose.model('Order', OrderSchema);

exports["default"] = _default;
//# sourceMappingURL=index.js.map