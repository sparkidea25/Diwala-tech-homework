import { format, transports, createLogger } from 'winston';
const { combine, timestamp, errors, label, printf, splat, colorize } = format;

// Handles pretty printing objects passed to logger rather than `[object Object]
// Does not handle string + object log message. To log this way, use %o, such as logger.info("some message %o", objectToPrint)
// Ref: https://github.com/winstonjs/winston/issues/1217
const customFormat = printf(info => {
  if (typeof info.message === 'object') {
    info.message = JSON.stringify(info.message, null, 2)
  }
  return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
})

// Accepts label to be prepended for logs produced by logger and returns logger
// Example: 
// const logger = require('../config/logger')('userController');
// logger.info('some log')
export default (sourceLabel = '') => createLogger({
  transports: [
    new transports.Console()
  ],
  format: combine(
    label({ label: sourceLabel }),
    colorize(),
    timestamp(),
    errors({ stack: true }),
    splat(),
    customFormat,
  ),
  exitOnError: false
});
