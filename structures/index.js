const {Client, Intents, MessageEmbed, Collection} = require('discord.js');
const client = new Client({ intents: 32767 });
client.commands = new Collection();
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');


const { Token } = require('./config.json');
const prefix = '-';

["events", "commands"].forEach(handler =>{
    require(`./handlers/${handler}`)(client, PG, Ascii);
});
client.login(Token);