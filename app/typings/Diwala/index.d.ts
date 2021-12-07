declare module "Diwala" {
    import {Request, Response, NextFunction} from "express";


    export type  Middleware = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => void;

export interface TokenUser {
    id: string;
    username: string;
}
}