import express from "express";
import initializeDb from "../config/db";
import user from "../controller/user";
import auth from "../controller/auth";
import * as pizza from "../controller/pizza/index";
import * as order from "../controller/order/index";
import {AuthVerify, handleUnauthorizedError} from "../middleware/auth";
import {Middleware} from "Diwala";

let router = express();

const handleUnhandledError: Middleware = (
    err: any,
    _req: any,
    res: any,
    _next: any
  ) => {
    console.error("unhandled error", err);
    return res.status(500).end();
  };


initializeDb();
router.use('/user', user);
router.use('/auth', auth);
router.use('/pizza', AuthVerify, pizza.createPizza);
router.use('/get-pizza', AuthVerify, pizza.getPizzas);
router.use('/get-pizza-by-id/:id', AuthVerify, pizza.getPizzabyId);
router.use('/order', AuthVerify, order.createOrder);
router.use('/get-order', AuthVerify, order.getAllOrders);
router.use('/get-order-by-id/:id', AuthVerify, order.getOrderById);
router.use(handleUnauthorizedError);
router.use(handleUnhandledError);

export default router;

