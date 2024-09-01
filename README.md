<p align="center">
  <a href="https://docs.erxproject.xyz">
    <img width="500" src="https://github.com/rqnjs/website/blob/main/img/syntx.js.png?raw=true" alt="Syntx.js">
  </a>
</p>

<div align="center">
  <b>Create Discord bots a little faster and easier.</b>
</div>

<br/>

<div align="center">

[![npm version](https://img.shields.io/npm/v/syntx.js.svg?style=flat-square)](https://www.npmjs.org/package/syntx.js) &nbsp; &nbsp;
[![npm downloads](https://img.shields.io/npm/dm/syntx.js.svg)](https://www.npmjs.com/package/syntx.js) &nbsp; &nbsp;
![License](https://img.shields.io/npm/l/syntx.js) &nbsp; &nbsp;
![version](https://img.shields.io/npm/v/syntx.js.svg?color=3182b0) &nbsp; &nbsp;
[![Support Server](https://img.shields.io/badge/Discord-Support_server-5865f2?logo=discord)](https://discord.gg/QQrSgyvykj) &nbsp; &nbsp;
![code helpers](https://img.shields.io/badge/code_helpers-1-5865f2?logo=htmx&logoColor=white) &nbsp; &nbsp;
![finished](https://img.shields.io/badge/finished-15%25-red?logo=hotwire&logoColor=white)
<br/>

  <a href="https://www.npmjs.com/package/dbdteamjs">
    <img width="360" src="https://github.com/rqnjs/website/blob/main/img/dbdteamjs.png?raw=true" alt="Inspired project by dbdteamjs">
  </a>

  <p>
     <a href="https://docs.erxproject.xyz/syntx/readme-1"><b>Documentation</b></a>
  </p>
</div>

Syntx.js is an NPM package designed to simplify and accelerate the creation of Discord bots. Although it is still under development, Syntx.js offers a wide range of functions for enhancing your bot. It utilizes a JSON-based structure for ease of use and flexibility. For further information or assistance, feel free to reach out to us via our [support server](https://discord.gg/invite/QQrSgyvykj) or through our [email syntxjs@gmail.com](https://mail.google.com/mail/u/0/?fs=1&to=syntxjs@gmail.com&su=Help+me&tf=cm).

## Installation
In NPM
```console
$ npm i synxt.js
```

In GitHub (recommended)
```console
$ npm i github:syntx-js/syntx.js
```

# Tables of contents
- [Tables of contents](#tables-of-contents)
  - [How to create a new client](#how-to-create-a-new-client)
    - [Request the library](#request-the-library)
    - [Create the new client](#create-the-new-client)
    - [Run the bot](#run-the-bot)
- [Example using the command method](#example-using-the-command-method)

## How to create a new client
### Request the library
First, we must request `ERXClient` and `Intents` from the `syntx.js` library.
```js
const { ERXClient, Intents } = require("syntx.js")
```
### Create the new client
Next, create a new `ERXClient` instance by passing in a configuration object with the necessary properties.
```js
const client = new ERXClient({
    prefix: "!",
    intents: Intents.All, // This can be changed by numbers. For example, all Discord intents in numbers are: 3276799
    token: "YOUR_DISCORD_BOT_TOKEN"
})
```

|  OPTION   |  TYPE          | DESCRIPTION                                             |
| --------- | -------------- | ------------------------------------------------------- |
| `prefix`  | srting         | The symbol with which you will start all your commands. |
| `intents` | array | number | The number of intents the bot will have. |
| `token`   | string         | your bot token.

### Run the bot
To run the client, we must use the `start` method.
```js
client.start()
```

# Example using the command method
```js
const { ERXClient, Intents } = require("syntx.js")

const client = new ERXClient({
    prefix: "!",
    intents: Intents.All,
    token: "YOUR_DISCORD_BOT_TOKEN"
})

client.ready(() => {
    console.log(`Bot ${client.bot.user.username} ready.`)
})

client.command({
    name: "hi", // Command name.
    content: async (message) => {
        const id = cmd.user.authorId(message)
        const user = await cmd.user.username(id, client)
        cmd.message.send({
            text: `Hello ${user}!`
        }, message)
    }
})

client.start()
```

More information in our [documentation](https://docs.erxproject.xyz/syntx/readme-1).