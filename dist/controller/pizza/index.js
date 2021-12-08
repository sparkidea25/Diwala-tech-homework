"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPizzas = exports.getPizzabyId = exports.createPizza = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pizza = _interopRequireDefault(require("../../model/pizza"));

/** APi to Create Pizza */
var createPizza = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pizza;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pizza = new _pizza["default"]({
              name: req.body.name,
              price: req.body.price
            });
            _context.next = 3;
            return pizza.save();

          case 3:
            res.status(200).json({
              pizza: pizza
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPizza(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/** APi to Get all Pizza */


exports.createPizza = createPizza;

var getPizzas = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pizza;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _pizza["default"].find();

          case 3:
            pizza = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(pizza));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).json({
              message: _context2.t0
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getPizzas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/** APi to Get Pizza by ID */


exports.getPizzas = getPizzas;

var getPizzabyId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pizza;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _pizza["default"].findOne({
              _id: req.params.id
            });

          case 3:
            pizza = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(pizza));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(404).json({
              message: _context3.t0
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getPizzabyId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPizzabyId = getPizzabyId;
//# sourceMappingURL=index.js.map