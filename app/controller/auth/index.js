require("dotenv").config();
import jwt from "jsonwebtoken";
import {Router, Request, Response, NextFunction} from "express";
import passport from "passport";
import os from "os";
import { AuthVerify } from "../../middleware/auth";


export const TOKEN_EXPIRATION = 60 * 60 * 24 * 365; //1 Year
export const ISSUER =
  process.env.NODE_ENV === "production" ? os.hostname() : "localhost";
export const JWT_SECRET = process.env.JWT_SECRET;

export const passportAuthenticate = passport.authenticate("local", {
    session: false,
    scope: [],
  });

  export const generateAccessToken = (
    req,
    res,
    next
  ) => {
    if (!req.token) {
      req.token = jwt.sign({
        id: req.user._id,
        username: req.user.username,
      },
        JWT_SECRET,
        {
          expiresIn: TOKEN_EXPIRATION,
          algorithm: 'HS256',
          issuer: ISSUER,
        }
      )
    }
    next();
  };


  export const handleAuthSuccessResponse = (req, res) => {
    const returnedUser = req.user.toObject();
  
    delete returnedUser.salt;
    delete returnedUser.hash;
    delete returnedUser.__v;
    delete returnedUser.password;
  
    return res.status(200).json({
      message: "User authenticated successfully.",
      success: true,
      data: {
        token: req.token,
        user: returnedUser,
      },
    });
  };


  let api = Router();

api.post("/",
  passportAuthenticate,
  generateAccessToken,
  handleAuthSuccessResponse
);

api.post("/logout", AuthVerify, (req, res, next) => {
  req.logout();
  return res.status(200).end()
});

export default api;