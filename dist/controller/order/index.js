"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pizza = _interopRequireDefault(require("../../model/pizza"));

var _order = _interopRequireDefault(require("../../model/order"));

// let api = Router();

/** api to order for Pizza, to multiply the Quantity of Pizza type they want and the Price
 * 5% discount when the order_price is above 50, and 10% discount when order_price is above 100
 * 
*/
var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var order, pizza_id, order_quantity, pizza, order_price;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order = new _order["default"](req.body);
            _context.prev = 1;
            pizza_id = req.body.pizza;
            order_quantity = req.body.quantity;
            _context.next = 6;
            return _pizza["default"].findOne({
              _id: pizza_id
            });

          case 6:
            pizza = _context.sent;
            order_price = order_quantity * pizza.price;

            if (order_price > 50) {
              order_price = order_price - order_price * 0.05;
            } else if (order_price > 100) {
              order_price = order_price - order_price * 0.1;
            }

            ; // let amount = order_price;

            _context.next = 12;
            return order.save();

          case 12:
            res.status(200).json({
              data: {
                order: order,
                message: "order successful",
                success: true,
                amount: order_price
              }
            });
            next();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(400).json({
              message: _context.t0
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function createOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/** APi to get all orders */


exports.createOrder = createOrder;

var getAllOrders = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _order["default"].find();

          case 2:
            order = _context2.sent;
            res.status(200).json({
              order: order
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllOrders(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/** APi to get a single order passing an ID */


exports.getAllOrders = getAllOrders;

var getOrderById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _order["default"].findOne({
              _id: req.params.id
            });

          case 3:
            order = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(order));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(400).json({
              message: _context3.t0
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getOrderById(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOrderById = getOrderById;
//# sourceMappingURL=index.js.map