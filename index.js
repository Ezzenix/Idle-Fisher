const Discord = require("discord.js")
const Config = require("./config.json")
const { readdirSync } = require("fs")

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })
const mongoose = require("mongoose")

// Comamnd handler
client.commands = new Discord.Collection(readdirSync("./commands").map(cmd => (cmd = require(`./commands/${cmd}`), [cmd.data.name, cmd])))

// Event handler
for (const event of readdirSync("./events")) client.on(event.split(".")[0], require(`./events/${event}`).bind(null))

// Connect
client.login(Config.token).then(() => mongoose.connect(Config.mongo))