const mongoose = require("mongoose");
const mongoCurrency = require("discord-mongo-currency");

/**
 * 
 * @param {{ username: String, password: String, host: String, port: Number | String, database: String }} config 
 */
module.exports = async (config) => {
    mongoose.connect(

        `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`, 
        {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (error) => (error)
            ? console.error('[STATUS] Database Connection Failed')
            : console.log('[STATUS] Database Connected')
    );
}

/**
 * 
 * @param {{ username: String, password: String, host: String, port: Number | String, database: String }} config 
 */
module.exports.MongoCurrency = async (config) => {
    mongoCurrency.connect(
        `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    )
    .catch((error) => (error) ? '[STATUS] Discord Currency Failed to connect' : '[STATUS] Discord Currency Connected')
};