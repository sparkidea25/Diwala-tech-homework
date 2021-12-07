import { Middleware } from "Diwala";

export const handleUnhandledError: Middleware = (err, req, res, next) => {
  console.error("unhandled error", err);
  return res.status(500).end();
};
