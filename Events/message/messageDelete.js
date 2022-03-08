const { MessageEmbed, Message, WebhookClient } = require('discord.js')

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
        .setDescription(`A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1) {
            log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        };

        new WebhookClient({url: "https://discord.com/api/webhooks/950785291667525733/Xxi8ebzlU4xBr87nngqSxHIOx_R1VxSY8nBMlFi5UKpaf7OASK8EugmgEsAezk7YlvzN"})
        .send({embeds: [log]}).catch(err => console.log(err));
    }
}