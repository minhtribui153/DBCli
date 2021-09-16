// Imports
const Client = require("./Structures/Client");
const config = require('./Data/config.json');

const client = new Client();

// Clear Console
console.clear();

// Start Discord Bot
client.start(config.token);