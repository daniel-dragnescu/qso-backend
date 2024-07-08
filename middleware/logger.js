const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = (message, logFile) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem); // Log to console during development
    // Logic to save logItem to a file (e.g., using file system module)

    // Example: Saving to a log file (this is a basic example, adjust as needed)
    // fs.appendFileSync(logFile, logItem); // Uncomment if using Node.js file system module
};

const logger = (req, res, next) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${req.method}\t${req.url}\t${req.headers.origin}\n`;

    console.log(logItem); // Log to console during development

    next();
};

module.exports = { logger, logEvents };
