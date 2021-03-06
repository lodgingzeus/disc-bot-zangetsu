const { CommandInteraction, MessageEmbed, Client} = require('discord.js')

module.exports = {
    name: "music",
    description: 'Play songs of your liking',
    options: [
        {
            name: "play",
            description: 'Play a song',
            type: "SUB_COMMAND",
            options: [{ name:"query", description: 'Provide a song name or link', type: 'STRING', required: true}]
        },
        { 
            name: "volume",
            description: 'Set volume',
            type: "SUB_COMMAND",
            options: [{ name:"percent", description: '10 = 10%', type:"NUMBER", required: true}]
        },
        {
            name: 'settings',
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{ name:"options", description: "Select an option", type: "STRING", required: true,
            choices: [
                {name: "queue", value:"queue"},
                {name: "skip", value:"skip"},
                {name: "pause", value:"pause"},
                {name: "resume", value:"resume"},
                {name: "stop", value:"stop"},
            ]
            }]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const voiceChannel = member.voice.channel;

        if(!voiceChannel) return interaction.reply({ content: 'You must be in a voice channel to use this command', ephemeral: true });

        if(guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({ content: `Already playing music in <#${guild.me.voice.channelId}>`, ephemeral: true });

        try {
            switch(options.getSubcommand()){
                case "play": {
                    client.distube.play( voiceChannel, options.getString("query"), { textChannel: channel, member: member});
                    return interaction.reply({content: "Searching for song"})
                }
                case "volume": {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1) return interaction.reply({content: "Kindly specify a number between 1 and 100."});

                    client.distube.setVolume(voiceChannel, Volume);
                    return interaction.reply({content: `Volume has been set to \`${Volume}%\``});
                }
                case "settings":{
                    const queue = await client.distube.getQueue(voiceChannel);

                    if(!queue) return interaction.reply({ content: "No songs in queue"})

                    switch(options.getString("options")) {
                        case "skip" : 
                            await queue.skip(voiceChannel);
                            return interaction.reply({ content: "Skipped current song"})
                        case "stop" :
                            await queue.stop(voiceChannel);
                            return interaction.reply({ content: "Stopped current song"})
                        case "pause":
                            await queue.pause(voiceChannel);
                            return interaction.reply({ content: "Paused current song"})
                        case "resume":
                            await queue.resume(voiceChannel);
                            return interaction.reply({ content: "Resumed current song"})
                        case "queue":
                            return interaction.reply({embeds: [ new MessageEmbed()
                            .setColor("PURPLE")
                            .setDescription(`${queue.songs.map((song, id) =>
                                `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)
                            }`)
                        ]});
                    }
                    return;
                }
            }


        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`??? Alert: ${e}`)
            return interaction.reply({ embeds: [errorEmbed] })
        }
    }
}