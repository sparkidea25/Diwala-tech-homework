import {Router} from 'express';
import initializeDb from "../config/db";
import * as Pizza from '../controller/pizza';
import {AuthVerify, handleUnauthorizedError} from "../middleware/auth";
import {Middleware} from "Diwala";


const pizzaRouter = Router();

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
pizzaRouter.post('/pizza', AuthVerify, Pizza.createPizza)
pizzaRouter.get('/pizza', Pizza.getPizzas)
pizzaRouter.get('/pizza/:id', Pizza.getPizzabyId)
pizzaRouter.use(handleUnauthorizedError);
pizzaRouter.use(handleUnhandledError);


export default pizzaRouter;



