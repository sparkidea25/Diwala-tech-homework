require("dotenv").config();
import expressJwt from "express-jwt";
import { ISSUER } from "../../controller/auth";
import setupLogger from "../../config/logger";
const logger = setupLogger("middleware/auth");
import { Middleware } from "Diwala";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log("[-] JWT_SECRET is no set. Auth wont function correctly");
}

export const AuthVerify = expressJwt({
  secret: JWT_SECRET || "",
  algorithms: ["HS256"],
  issuer: ISSUER,
});


export const handleUnauthorizedError: Middleware = (err, _req, res, next) => {
  if (err.name === "UnauthorizedError") {
    logger.error(err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  next();
};
