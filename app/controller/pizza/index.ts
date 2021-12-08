import {Request, Response} from 'express';
import Pizza from "../../model/pizza";
import setupLogger from '../../config/logger';
const logger = setupLogger('order');




/** APi to Create Pizza */
export const createPizza = async (req: Request, res: Response) => {
    const pizza = new Pizza({
        name: req.body.name,
        price: req.body.price,
    });
    await pizza.save();
    res.status(200).json({pizza});
};


/** APi to Get all Pizza */
export const getPizzas = async (req: Request, res: Response) => {
    try {
        const pizza = await Pizza.find();
        return res.status(200).json(pizza);
    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: error});
    }
};

/** APi to Get Pizza by ID */
export const getPizzabyId = async (req: Request, res: Response) => {
    try {
        const pizza = await Pizza.findOne({_id: req.params.id});
        return res.status(200).json(pizza);
    } catch(error) {
        logger.error(error);
        return res.status(404).json({message: error});
    }
}










