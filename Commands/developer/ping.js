const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping",
    permission: 'ADMINISTRATOR',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    execute(interaction, client) {
        interaction.reply({content: `${client.ws.ping}ms`});
    }
}