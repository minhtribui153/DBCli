// Imports
const Client = require("./Structures/Client");
const config = require('./Data/config.json');

const client = new Client();

// Clear Console
console.clear();

// Setup
client.setup({
    sourcesFolder: 'src',
    commandFolder: 'Commands',
    eventsFolder: 'Events',
    token: config.token,
    mongoDB: {
        username: config.mongoDB.username,
        password: config.mongoDB.password,
        host: config.mongoDB.host,
        port: config.mongoDB.port,
        database: config.mongoDB.database,
    },
    botConfig: {
        prefix: config.prefix,
        ownerID: config.ownerID,
        password: config.password,
    }
})

// Start Discord Bot
client.start();