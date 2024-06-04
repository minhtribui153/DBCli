# <img src="https://cdn.discordapp.com/avatars/881172367898976277/d5446ca4d9af309e63bd22101d44af3b.png?size=128" style="border-radius: 50%"><br><br><b>DBCli Discord Bot</b>

Gaming, Music, Entertainment, Personal, Moderation, Logging, All in One!

> ## <b>What's in store?</b>
> - <b>Built-in Command handler</b><br>
This project has a built-in command handler that handles both slash and text commands. The code for this project has been refactored from my previous Commando-based Discord Bot with a custom command handler.
> - <b>Among Us Command</b><br>
This command can help to make it easier to play Among Us with friends by creating a corresponding voice channel and deletes the channel when they are no longer used.
> - <b>Thanks Leaderboard and Thanks Command</b><br>
Sometimes, we need to thank people for helping us in some ways such as coding, educating or tutoring. These commands sets a leaderboard of thanks and will display how many thanks a user has.
> - <b>Built-in Features</b><br>
There are about 7 features created to help develop this bot. These features can be useful to turn your server into an automated one.
> - <b>Suggestions</b><br>
In order to have a stable server for everyone, this command helps to let you set a channel for suggestions and accept or deny suggestions from members.

## Setup

Copy the [config.json.example]('src/Data/config.json.example'), create a config.json file in Data and paste it inside.

```json
{
  "token": "<bot_token>",
  "intents": "32767",
  "prefix": "<bot_prefix>",
  "ownerID": "<your_id>",
  "mongoDB": {
    "username": "<username>",
    "password": "<password>",
    "host": "<mongo_ip>",
    "port": "<mongo_port>",
    "database": "<db_name>"
  }
}
```

Then, paste this code into your index.js:
```javascript
// Imports
const Client = require("./Structures/Client");
const config = require('./Data/config.json');

const client = new Client();

// Clear Console
console.clear();

// Setup
client.setup({
    sourcesFolder: '<source_folder>',
    commandFolder: '<command_folder>',
    eventsFolder: '<events_folder>',
    token: config.token,
    mongoDB: {
        username: config.mongoDB.username,
        password: config.mongoDB.password,
        host: config.mongoDB.host,
        port: config.mongoDB.port,
        database: config.mongoDB.database,
    }
});

// Start Discord Bot
client.start();
```

Once done, use either Yarn/NPM to install packages

```bash
# Yarn
yarn
# NPM
npm install
```

To start, use this command:

```bash
# Yarn
yarn start/dev
# NPM
npm start/run dev
```

> Note: This bot is under MIT License. Please check LICENSE for details
