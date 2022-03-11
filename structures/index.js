const {Client, Intents, MessageEmbed, Collection} = require('discord.js');
const client = new Client({ intents: 32767 });
client.commands = new Collection();
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { Token } = require('./config.json');
const prefix = '-';
const { DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

["events", "commands"].forEach(handler =>{
    require(`./handlers/${handler}`)(client, PG, Ascii);
});
client.login(Token);