"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUnhandledError = void 0;

var handleUnhandledError = function handleUnhandledError(err, req, res, next) {
  console.error("unhandled error", err);
  return res.status(500).end();
};

exports.handleUnhandledError = handleUnhandledError;
//# sourceMappingURL=index.js.map