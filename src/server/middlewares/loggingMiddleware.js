const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;

        db.logging.create({
            ip,
            action: originalUrl,
            header: headers,
        });

        next();
    }

module.exports = loggingMiddleware;