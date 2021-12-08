import {Request, Response, NextFunction} from 'express';
import Pizza from '../../model/pizza';
import Order from '../../model/order';
import setupLogger from '../../config/logger';
const logger = setupLogger('order');


// let api = Router();


/** api to order for Pizza, to multiply the Quantity of Pizza type they want and the Price
 * 5% discount when the order_price is above 50, and 10% discount when order_price is above 100
 * 
*/

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const order = new Order(req.body);
    try {
        const pizza_id = req.body.pizza;
        const order_quantity = req.body.quantity;
        const pizza = await Pizza.findOne({_id:pizza_id})
        let order_price = order_quantity * pizza.price;
        if(order_price > 50) {
            order_price = order_price - (order_price * 0.05);
        } else if(order_price > 100) {
            order_price = order_price - (order_price * 0.1);
        };
        // let amount = order_price;
        order.amount = order_price;
        await order.save();
        const findCreatedOrder = await Order.findOne({_id: order.id}).populate('pizza');
        let saveCreatedOrder = await findCreatedOrder.save();
         res.status(200).json({
            order: saveCreatedOrder,
            message: "order successful",
            success: true,
        });
        next();
    } catch(error: any) {
        logger.error(error);
        return res.status(400).json({
            message: error
        })
    }
};


/** APi to get all orders */
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.find();
    res.status(200).json({order});
};

/** APi to get a single order passing an ID */
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findOne({_id:req.params.id});
    return res.status(200).json(order);
    }catch(error) {
        logger.error(error);
        return res.status(400).json({
            message: error
        })
    }
};







