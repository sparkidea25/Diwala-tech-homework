import {Router, Request, Response, NextFunction} from "express";
import User, {MIN_LENGTH, PASSWORD_LENGTH_ERROR } from "../../model/user";
// import passport from "passport";
import { handleAuthSuccessResponse, generateAccessToken, passportAuthenticate } from '../auth';
// import AuthVerify from "../../middleware/auth"
import setupLogger from "../../config/logger";
const logger = setupLogger("user")


let api = Router();

api.post("/", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = new User(req.body);
    try {
        User.register(new User(user), req.body.password, (err, createdUser) => {
            if(err) {
                logger.error(`Error registering user ${JSON.stringify(err)}`);
                if(err.name = "MissingPasswordError") {
                    return res.status(400).json(
                        {
                            message: "Please enter a password",
                        }
                    )
                } else if(err.name === PASSWORD_LENGTH_ERROR) {
                    return res.status(409).json({
                        message: `Password must be at least ${MIN_LENGTH} characters long`
                    });
                } else if(err.name === "UsernameExistsError") {
                    return res.status(409).json({
                        message: "Username already exists"
                    });
                }
                return res.status(500).json({
                    message: "Error registering user",
                });
            }
            req.user = createdUser;
            next();
        })
    } catch(err) {
      logger.error(err);
      return res.status(500).json({
          message: "Failed to register user"
      });
    }
},
passportAuthenticate,
handleAuthSuccessResponse,
generateAccessToken
);


export default api;