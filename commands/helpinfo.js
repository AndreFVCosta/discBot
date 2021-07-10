const pagination = require('discord.js-pagination')
const Discord = require('discord.js')

module.exports = {
    name: "helpinfo",
    description: "more adv. help command",

    async execute (bot, message, args) {
   
        const BotInfo = new Discord.MessageEmbed()
        .setColor(0x1b6315)
        .setTitle('Informação Bot')
        .addField('**Prefix**', 'Prefix do bot é: `-`')
        .addField('**Pages**', '`1.Informação do bot`, `2.Informação`, `3.Adminstração`')
        .addField('**Ajuda na navegação**', 'Usa as setas abaixo para percorrer as páginas!')

        const Informação = new Discord.MessageEmbed()
        .setColor(0x1b6315)
        .setTitle('Comandos Gerais')
        .addField('`-ping`', 'Ver os pings dos bots!')
        .addField('`-sugerir`', 'Dar sugestões para o servidor!')
        .addField('`-play`', 'Começar uma musica! (tens de estar dentro de um canal)')
        .addField('`-leave`', 'expulsar o bot da call!')

        const Adminstração = new Discord.MessageEmbed()
        .setColor(0x1b6315)
        .setTitle('Adminstração')
        .addField('`-ban`', 'Punir usuario!')
        .addField('`-mute`', 'silenciar usuario!')
        .addField('`-kick`', 'Expulsar usuario!')
        .addField('`-warn`', 'Avisar usuario!')

        const pages = [
            BotInfo,
            Informação,
            Adminstração,
        ]

        const emojiList = ["⏪", "⏩"]

        const timeout = '600000';

        pagination(message, pages, emojiList, timeout)
    }
}