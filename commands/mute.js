const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mute a member!",
    execute(message, args){
        const target = message.mentions.users.first();
        if(target){
            
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Membro');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute'); 

            let memberTarget= message.guild.members.cache.get(target.id);
            
            if(!args[1]){
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> Foi silenciado`);
                return 
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> Foi Silenciado por  ${ms(ms(args[1]))}`);

            setTimeout(function(){
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> foi desmutado!`);  
            }, ms(args[1]));
        } else {
            message.channel.send('Não consigo encotrar esse usuario / usa @!');
        }
    }
}
