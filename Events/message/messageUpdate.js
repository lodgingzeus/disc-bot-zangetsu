const { MessageEmbed, Message, WebhookClient } = require('discord.js')

module.exports = {
    name: 'messageUpdate',
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "")
        const Edited = newMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "")

        const log = new MessageEmbed()
        .setColor("DARK_GREEN")
        .setDescription(`A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}. \n
        **Original**:\n ${Original} \n**Edited**:\n ${Edited}`)
        .setFooter(`Memeber: ${newMessage.author.tag} | ID: ${newMessage.author.id}`);

        new WebhookClient({url: "https://discord.com/api/webhooks/950785291667525733/Xxi8ebzlU4xBr87nngqSxHIOx_R1VxSY8nBMlFi5UKpaf7OASK8EugmgEsAezk7YlvzN"})
        .send({embeds: [log]}).catch(err => console.log(err))
    }
}