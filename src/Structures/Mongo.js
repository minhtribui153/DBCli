const mongoose = require("mongoose");

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