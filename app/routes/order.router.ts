import {Router} from 'express';
import initializeDb from "../config/db";
import * as Order from '../controller/order';
import {AuthVerify, handleUnauthorizedError} from "../middleware/auth";
import {Middleware} from "Diwala";


const orderRouter = Router();

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
orderRouter.post('/order', AuthVerify, Order.createOrder)
orderRouter.get('/get-order', AuthVerify, Order.getAllOrders)
orderRouter.get('/get-order-by-id/:id', AuthVerify, Order.getOrderById)
orderRouter.use(handleUnauthorizedError);
orderRouter.use(handleUnhandledError);


export default orderRouter;



