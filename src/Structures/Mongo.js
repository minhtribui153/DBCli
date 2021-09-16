const mongoose = require("mongoose");
const mongoCurrency = require("discord-mongo-currency");
const config = require("../Data/config.json");
const mongoURI = `mongodb://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`;

module.exports = async () => {
    mongoose.connect(
        mongoURI, 
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

module.exports.MongoCurrency = async () => {
    mongoCurrency.connect(mongoURI).catch((error) => (error) ? '[STATUS] Discord Currency Failed to connect' : '[STATUS] Discord Currency Connected')
};