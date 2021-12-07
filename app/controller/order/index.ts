import {Router, Request, Response, NextFunction} from 'express';
import Pizza from '../../model/pizza';


let api = Router();


/** api to order for Pizza, to multiply the Quantity of Pizza type they want and the Price
 * 5% discount when the order_price is above 50, and 10% discount when order_price is above 100
 * 
*/
api.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const pizza_id = req.body.pizza;
        const order_quantity = req.body.quantity;

        const pizza = await Pizza.findOne({_id:pizza_id});

        // console.log(pizza);
        let order_price = order_quantity * pizza.price;
        // console.log(order_price);
        if(order_price > 50) {
            order_price = order_price - (order_price * 0.05);
        } else if(order_price > 100) {
            order_price = order_price - (order_price * 0.1);
        };
        await pizza.save();

        res.status(200).json({
            data: pizza,
            message: "order successful",
            success: true,
            amount: order_price
            
        });
        next();
    } catch(error) {
        console.log(error);
    }
});



export default api;

