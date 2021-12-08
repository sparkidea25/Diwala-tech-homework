require("dotenv").config();
import express,{Application} from 'express';
import cors from 'cors';
import winston, { format as winstonFormat, transports } from "winston";
import User from './model/user';
const { combine, timestamp, colorize, printf } = winstonFormat;
const expressWinston = require("express-winston");
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
import userRoute from './routes/user.router';
import pizzaRoute from './routes/pizza.router';
import orderRoute from './routes/order.router';
import setupLogger from './config/logger';
const logger = setupLogger('app');


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(
    expressWinston.logger({
      transports: [new transports.Console()],
      format: combine(
        timestamp(),
        colorize(),
        printf(
          (info: any) =>
            `${info.timestamp} ${info.message} ${info.meta.res.statusCode} ${info.meta.responseTime}ms`
        )
      ),
    })
);

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winstonFormat.combine(
        winstonFormat.colorize(),
        winstonFormat.json()
      ),
    })
);



app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      User.authenticate()
    )
  );

  app.use("/v1", userRoute);
  app.use("/v1", pizzaRoute);
  app.use("/v1", orderRoute);


let port = process.env.PORT || 3000;


app.listen(port, () => {
    logger.info(`⚡️[Server] started on port ${port}`);
})
