# <img src="https://cdn.discordapp.com/avatars/881172367898976277/d5446ca4d9af309e63bd22101d44af3b.png?size=128" style="border-radius: 50%"><br><br><b>DBCli Discord Bot</b>

Gaming, Music, Entertainment, Personal, Moderation, Logging, All in One!

## How to use this Discord Bot?

DBCli uses both Slash and Text Commands. Check it out!

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