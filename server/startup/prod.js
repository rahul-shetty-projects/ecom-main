const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
    app.use(helmet({crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false}));
    app.use(compression());
}