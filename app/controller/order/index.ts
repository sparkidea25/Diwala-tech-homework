import {Router, Request, Response, NextFunction} from 'express';
import Pizza from '../../model/pizza';


let api = Router();


/** api to order for Pizza, to multiply the Quantity of Pizza type they want and the Price*/
api.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const pizza_id = req.body.pizza;
        const order_quantity = req.body.quantity;

        const pizza = await Pizza.findOne({
            pizza: pizza_id,
        });
        if(order_quantity * pizza.price){
            res.status(200).json({
                data: pizza,
                success: true,
                message: "Order Successfully",
                order_price: order_quantity * pizza.price,
            });
        }
        console.log(pizza);
        res.send(pizza);
    } catch(error) {
        console.log(error);
    }
});

export default api;