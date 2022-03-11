const { MessageEmbed, Message, WebhookClient } = require('discord.js')
const { WebhookUrl } = require('../../structures/config.json')

module.exports = {
    name: 'messageDelete',
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        const log = new MessageEmbed()
        .setColor("RED")
        .setDescription(`A [message](${message.url}) by ${message.author.tag} was **deleted** in ${message.channel}.\n
        **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1) {
            log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        };

        new WebhookClient({url: WebhookUrl})
        .send({embeds: [log]}).catch(err => console.log(err));
    }
}