import express, {Router, Request, Response} from 'express';
import Pizza from "../../model/pizza";


let api = Router();

api.post("/", async(req: Request, res, Response) => {
    const pizza = new Pizza({
        name: req.body.name,
        price: req.body.price,
    });
    await pizza.save();
} );



export default api;

