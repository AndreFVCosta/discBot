const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban command",

    async execute (bot, message,args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("you cant use this command!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");//.ban <args(0) aka @member> | <args(1) aka reason>    
        if (!reason) reason = "No reason given";
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`You were banned from**${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        var channel = message.guild.channels.cache.find(c => c.name === 'logs');

        var log = new Discord.MessageEmbed()
        .setTitle('User Ban')
        .addField('User:', mentionMember, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)


        if (!args[0]) return message.channel.send("-ban <@jogador> <razão>");

        if(!mentionMember) return message.channel.send("Este usuario não é valido / Tens que marcar a pessoa que queres banir!");

        if(!mentionMember.bannable) return message.channel.send("Não consigo banir esse usuario porque tem um cargo superior!");
        await channel.send(log);
       await mentionMember.send(embed);
       await mentionMember.ban({
           reason: reason  
       }).then(() => message.channel.send("Successfully banned: " + mentionMember.user.tag)); 
    }
}       