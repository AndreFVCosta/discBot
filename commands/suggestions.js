module.exports = {
    name: 'suggestion',
    aliases: ['suggest', 'suggestion'],
    Permissions: [],
    description: 'creates a suggestion!',
    execute(message, args, discord){
        const channel = message.guild.channels.cache.find(c => c.name === 'sugestões');
        if(!channel) return message.channel.send('suggestions channel does not exit!');
    
        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs)
        .setFooter("Tuga Silent CS:GO | Sistema de Sugestões");       
        
        channel.send(embed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    } 
}