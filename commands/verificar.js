module.exports = {
    name: 'verificar',
    description: 'verify a member',
    async execute(message, args) {
        if(!message.member.roles.cache.has("862714000176447508")){
            let role = message.guild.roles.cache.get("862714000176447508")
            message.member.roles.add(role);
        }
    }
}