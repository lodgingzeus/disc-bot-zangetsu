const { Client } = require("discord.js")
// const mongoose = require('mongoose')
const { Database } = require('../../structures/config.json')

module.exports = {
    name: "ready", 
    once: true,
    /**
     * @param {Client} client
     */
    execute(client){
        console.log("The bot is now on")
        client.user.setActivity("Hello!", {type: "WATCHING"})

        // if(!Database) return;
        // mongoose.connect(Database, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }).then(() => {
        //     console.log("Bot is connected to DataBase")
        // }).catch((err) =>{
        //     console.log(err)
        // })
    }
}