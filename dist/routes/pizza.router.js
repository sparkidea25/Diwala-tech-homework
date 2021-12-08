"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _db = _interopRequireDefault(require("../config/db"));

var Pizza = _interopRequireWildcard(require("../controller/pizza"));

var _auth = require("../middleware/auth");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var pizzaRouter = (0, _express.Router)();

var handleUnhandledError = function handleUnhandledError(err, _req, res, _next) {
  console.error("unhandled error", err);
  return res.status(500).end();
};

(0, _db["default"])();
pizzaRouter.post('/pizza', _auth.AuthVerify, Pizza.createPizza);
pizzaRouter.get('/get-pizza', Pizza.getPizzas);
pizzaRouter.get('/get-pizza-by-id/:id', Pizza.getPizzabyId);
pizzaRouter.use(_auth.handleUnauthorizedError);
pizzaRouter.use(handleUnhandledError);
var _default = pizzaRouter;
exports["default"] = _default;
//# sourceMappingURL=pizza.router.js.map