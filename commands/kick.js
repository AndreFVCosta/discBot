const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "kick command",

    async execute (bot, message,args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Não tens cargo para usar este comando!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");//.kick <args(0) aka @member> | <args(1) aka reason>    
        if (!reason) reason = "No reason given";
        
        const kickembed = new Discord.MessageEmbed()
        .setTitle(`You were kicked from**${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter( bot.user.tag, bot.user.displayAvatarURL());
        
        var channel = message.guild.channels.cache.find(c => c.name === 'logs');

        var log = new Discord.MessageEmbed()
        .setTitle('User kick')
        .addField('User:', mentionMember, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        

        if (!args[0]) return message.channel.send("-kick <@jogador> <razão>");

        if(!mentionMember) return message.channel.send("Este usuario não é valido / Tens que marcar a pessoa que queres expulsar!");

        if(!mentionMember.kickable) return message.channel.send("Não consigo expulsar esse usuario porque tem um cargo superior!");

        
        try {
            await mentionMember.send(kickembed);
            await channel.send(log);
        } catch (err) {

        }
            
        try {
            await mentionMember.kick(reason);
        }catch (err) {
            return message.channel.send("EU não consigo expulsar esse usario! Desculpe...") 
        }
    } 

}