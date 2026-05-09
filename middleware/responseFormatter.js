/**
 * Middleware to format responses consistently.
 * Usage in controllers: res.sendResponse(data, "Success fetched data");
 */
const formatResponse = (req, res, next) => {
    res.sendSuccess = (data = null, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data
        });
    };

    res.sendError = (message = 'Internal Server Error', statusCode = 500, data = null) => {
        return res.status(statusCode).json({
            success: false,
            message: message,
            data: data
        });
    };

    next();
};

module.exports = formatResponse;
