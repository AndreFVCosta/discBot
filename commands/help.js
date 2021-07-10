const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "simple help command",

    async execute (bot, message, args) {

        const help = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Prefix: `-`')
        .setAuthor('Command List', message.author.displayAvatarURL())

        .addFields({
            name: 'Sobre este bot',
            value: 'Bot com sistema de ticket,sugestões.welcome,musica e varios outros comandos que iram aparecer se utilizares o comando debaixo!',
        },
        {
            name: 'Queres mais informação sobre os comandos? (utiliza o comando debaixo)',
            value: '`-helpinfo`',
        })
        message.channel.send(help)
    }
}