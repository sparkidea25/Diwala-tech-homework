import {Router, Request, Response, NextFunction} from "express";
import User, {MIN_LENGTH, PASSWORD_LENGTH_ERROR } from "../../model/user";
// import passport from "passport";
import { handleAuthSuccessResponse, generateAccessToken, passportAuthenticate } from '../auth';
// import AuthVerify from "../../middleware/auth"
import setupLogger from "../../config/logger";
const logger = setupLogger("user")


let api = Router();

api.post(
    "/",
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const user = new User(req.body);
      try {
        User.register(new User(user), req.body.password, (err, createdUser) => {
          if (err) {
            logger.error(`Error registering user: ${JSON.stringify(err)}`);
            if (err.name == "MissingPasswordError") {
              return res.status(400).json({
                message: "Please Enter a Password",
              });
            } else if (err.name === PASSWORD_LENGTH_ERROR) {
              return res.status(400).json({
                message: `Password must be atleast ${MIN_LENGTH} characters long`,
              });
            } else if (err.name === "UserExistsError") {
              return res.status(409).json({
                message: "Username already exists",
              });
            }
            return res.status(500).json({
              message: "Error registering user",
            });
          }
          req.user = createdUser;
          next();
        });
      } catch (error) {
        logger.error(error);
        return res.status(500).json({
          message: "Failed to register User",
        });
      }
    },
    passportAuthenticate,
    generateAccessToken,
    handleAuthSuccessResponse
  );


export default api;