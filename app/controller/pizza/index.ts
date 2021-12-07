import {Router, Request, Response} from 'express';
import Pizza from "../../model/pizza";


let api = Router();

api.post("/", async(req: Request, res: Response) => {
    const pizza = new Pizza({
        name: req.body.name,
        price: req.body.price,
    });
    await pizza.save();
    res.status(200).json({pizza});
} );

api.get("/get-pizza", async(req: Request, res: Response) => {
    const pizza = await Pizza.find();
    res.status(200).json({pizza});
});



export default api;

