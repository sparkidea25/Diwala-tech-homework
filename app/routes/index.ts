import express from "express";
import initializeDb from "../config/db";
import user from "../controller/user";
import auth from "../controller/auth";
import pizza from "../controller/pizza";
import order from "../controller/order";
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
router.use('/pizza', AuthVerify, pizza);
router.use('/order', AuthVerify, order);
router.use(handleUnauthorizedError);
router.use(handleUnhandledError);

export default router;

