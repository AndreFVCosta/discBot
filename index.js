//const { channel } = require('diagnostic_channel');
const Discord = require ('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const enmap = require('enmap');
const{token, prefix} = require('./config.json');
const fs = require('fs');
const WOKCommands = require('wokcommands');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


client.on("guildMemberAdd", async (member) => {
     
     let guild = client.guilds.cache.get("478169611326586882"); //ID do servidor
     let channel = client.channels.cache.get("862990388288815134"); // ID do canal
     let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'welcome');

     if (guild != member.guild) {
        return console.log(`Sai daqui demonio! Voce não é do meu servidor.`);   
     } else {

        let embed = new Discord.MessageEmbed()
        .setColor('#e31e27')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`${emoji} Bem-Vindo ${emoji}`)
        .setImage('https://media3.giphy.com/media/UtEQ8viTEfCdiAOW4Q/giphy.gif')
        .setDescription(`${member.user}, Seja bem vindo ao servidor ${guild.name}! Atualmente estamos com ${member.guild.Count} membros.`)
        .addField('Canais', 'Siga as regras do servidor <#863026189928103936> ')
        .addField('Comunidade', 'Se quiser dar uma sugestão para melhorar o servidor utilize o canal <#863028134030082070> ')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format:"png", size: 1080}))
        .setFooter('ID do usuario:' + member.user.id)
        .setTimestamp();

        await channel.send(embed)
     }
})

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

client.on('ready', () => {
    //console.log('tugasilent.pt ready!');
    
    const arrayOFStatus = [       
        `Bot Oficial do Tuga Silent`,
        `Queres ajuda abre ticket 📩`,
        `prefix is: - `,
        `TugaSilent.pt `,
        `TugaSilent IP - 185.113.141.58:28155`,
        `bot created by Drecos`,
    ];

    let index = 0;
    setInterval(() => {
        if(index === arrayOFStatus.length) index = 0;
        const status = arrayOFStatus [index];
        console.log(status);
        client.user.setActivity(status, { type: "PLAYING" }).catch(console.error)
        index++;
    }, 2000) //in ms

})

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix)!== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "ticket-setup") {
        // ticket-setup #channel

        let channel = message.mentions.channels.first();           
        if(!channel) return message.reply("Usage: `!ticket-setup #channel`");7

       let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Tuga Silent | CS:GO - Suporte")
            .setDescription("***PRECISA DE AJUDA?*** | Abre um ticket e esclarece-te junto de um membro da nossa equipa STAFF. Para tal reage com o seguinte emoji 🎫 !")
            .setFooter("Tuga Silent CS:GO | Sistema de Tickets")
            .setColor("00ff00")
            );   
             
        sent.react('🎫');
        settings.set(`${message.guild.id}-ticket`, sent.id);

        message.channel.send("Configuração do sistema de tickets concluída!")
    }
         
         if(command == "close") {
             if(!message.channel.name.includes("ticket-")) return message.channel.send("você não pode usar isso aqui!")
             message.channel.delete();
        }
        
        else if (command == 'play') {
            client.commands.get('play').execute(message, args);
        } else if (command == 'leave') {
            client.commands.get('leave').execute(message, args);
        }
        else if (command == 'verificar') {
            client.commands.get('verificar').execute(message, args);
        }
        else if (command == 'sugerir') {
            client.commands.get('suggestion').execute(message, args, Discord);
        }
        else if (command == 'help') {
            client.commands.get('help').execute(client, message, args);
        }
        else if (command == 'helpinfo') {
            client.commands.get('helpinfo').execute(client, message, args);
        } 
        else if (command == 'kick') {
            client.commands.get('kick').execute(client, message, args);  
        }
        else if (command == 'ban') {
            client.commands.get('ban').execute(client, message, args);  
        }
        else if (command == 'warn') {
            client.commands.get('warn').execute(client, message, args);  
        }
        else if (command == 'mute') {
            client.commands.get('mute').execute(message, args);
        }
        else if (command == 'unmute') {
            client.commands.get('unmute').execute(message, args);
        }
    });   

client.on('messageReactionAdd', async(reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    if(user.bot) return;
     
    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

    if(!ticketid) return;

    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`,  
             {permissionOverwrites: [
                 {
                     id: user.id,
                     allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                 },
                 {
                      id: reaction.message.guild.roles.everyone,
                      deny: ["VIEW_CHANNEL"]                  
                 }      
          ],
             type: 'text'               
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("bem vindo ao seu ticket!").setDescription("**Aguarde pela resposta de um staff**. *Se quiser fechar ticket -close*").setColor("00ff00"))
        })
    
    } 
});

client.on('guildCreate', async (guild) => {
     
    //let guild = client.guilds.cache.get("478169611326586882"); //ID do servidor
    let channel = client.channels.cache.get("863026189928103936"); // ID do canal
    let emoji = guild.emojis.cache.find(emoji => emoji.name === 'TS');



       let embed = new Discord.MessageEmbed()
       .setColor('#e31e27')
       .setAuthor(client.user.tag, client.user.displayAvatarURL())
       .setTitle(`***${emoji} Tuga Silent - Regras do Discord***`)
       .setImage('https://media3.giphy.com/media/UtEQ8viTEfCdiAOW4Q/giphy.gif')
       .setThumbnail(client.user.displayAvatarURL())
       .setDescription(`É importante que respeitas todas as regras referidas:`)
       .addField('***1º Regra***', 'Não é tolerado o uso de vocabulário agressivo ou desrespeitoso ou qualquer tipo de desrespeito a qualquer integrante do Discord, á nossa equipa ou a qualquer outro aqui dentro')
       .addField('***2º Regra***', 'Não promovas ou divulgues o teu website, servidor Discord, servidor de jogo ou qualquer tipo de serviço público ou privado, a menos que tenhas permissão para o fazer')
       .addField('***3º Regra***', 'Não uses no teu nickname, nomes ofensivos ou que contenham links para outros websites concorrentes, websites ilegais ou de conteúdo indevido. O mesmo se aplica ao teu avatar (foto de perfil)')
       .addField('***4º Regra***', 'Não divulgues links, serviços ou projetos por mensagem privada aos nossos utilizadores Discord, pode resultar num banimento')
       .addField('***5º Regra***', 'Não envies mensagem a nenhum Staff por mensagem privada a pedir suporte, todo o suporte deverá ser feito no nosso chat')
       .addField('***6º Regra***', 'Proibido gravações no Discord só após autorização de um STAFF do mesmo')
       .addField('***7º Regra***', 'Proibido uso de qualquer tipo de imagens suscetíveis a ferir um utilizador em qualquer circunstância')
       .addField('***8º Regra***', 'Proibido o uso Voice Changer')
       .addField('***9º  Regra***', 'É totalmente proibido o uso de ***CHEATS*** nos nossos servidores de jogo bem como o incentivo a uso dos mesmos')
       .addField('***10º Regra***', 'Não toleramos pessoas que estejam envolvidas direta ou indiretamente em **CHEATS**')
       .addField('***11º Regra***', 'Proibida a venda de **CHEATS** , dentro ou fora do servidor')
       .setFooter('Tuga Silent | CS:GO - Regras Discord')
       .setTimestamp()

       await channel.send(embed)
    
});
client.on('guildCreate', async (guild) => {
     
    //let guild = client.guilds.cache.get("478169611326586882"); //ID do servidor
    let channel = client.channels.cache.get("862716845122388049"); // ID do canal
    let emoji = guild.emojis.cache.find(emoji => emoji.name === 'TS');



       let embed = new Discord.MessageEmbed()
       .setColor('#e31e27')
       .setAuthor(client.user.tag, client.user.displayAvatarURL())
       .setTitle(`***Tuga Silent | CS:GO - Verificação***`)
       .setDescription('verifica-te para desbloqueares o servidor!')
       .addField('Comando para verificar!', '```ESCREVE -verificar```')    
       .setFooter('Tuga Silent | CS:GO - Verificação')
       .setThumbnail(client.user.displayAvatarURL())
       .setTimestamp()

       await channel.send(embed)
    
});
client.on('guildCreate', async (guild) => {
     
    //let guild = client.guilds.cache.get("478169611326586882"); //ID do servidor
    let channel = client.channels.cache.get("863147659895373894"); // ID do canal
    let emoji = guild.emojis.cache.find(emoji => emoji.name === 'TS');



       let embed = new Discord.MessageEmbed()
       .setColor('#e31e27')
       .setAuthor(client.user.tag, client.user.displayAvatarURL())
       .setTitle(`***${emoji} Servidores e Links do Tuga Silent***`)
       .addField('➜ AWP:', '185.113.141.58:28155 (Link direto steam://connect/185.113.141.58:28155)')
       .addField('➜ Grupo Steam:', 'https://steamcommunity.com/groups/tugasilent')
       .addField('➜ SourceBans:', 'https://tugasilent.pt/bans') 
       .addField('➜ Candidatura para Staff', 'https://forms.gle/SRPkuKhjYmbCBma36')   
       .setFooter('Tuga Silent | CS:GO - Comunidade')
       .setThumbnail(client.user.displayAvatarURL())
       .setTimestamp()

       await channel.send(embed)
    
});
client.login(token);

