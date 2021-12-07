import mongoose from "mongoose";
// import bluebird from "bluebird";
import setupLogger from "./logger";
const logger = setupLogger("app");


export default async() => {
  const options = {
    useNewUrlParser: true,
    // promiseLibrary: bluebird,
    // poolSize: 10,
    useUnifiedTopology: true,
    retryWrites:false
  };
  const dbURI = process.env.mongodbURi;
  try {
    await mongoose.connect(dbURI, options);
    return true;
  } catch (error) {
    logger.error('error connecting to db', error)
    return null;
  }
};
