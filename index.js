const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "!";
const commandList = ["brr"];

client.login(config.BOT_TOKEN);

client.on("ready",() => {
	console.log("Ready!");
	const channel = client.channels.cache.get('762848205054148619');
	channel.send('uh oh');
	client.user.setStatus("xd");
})

client.on('message', async message => {
    if(!message.guild) return;
    if(message.content === '!join'){
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
        }
        else{
            message.reply('join a voice channel nerd');
        }
    }
});

