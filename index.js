const Discord = require('discord.js');
const config = require("./config.json");
const ytdl = require('ytdl-core');
const client = new Discord.Client();

const prefix = "!";
const commandList = ["brr"];

client.login(config.BOT_TOKEN);

client.on("ready",() => {
	console.log("Ready!");
	const channel = client.channels.cache.get('546437977715376128');
	channel.send('uh oh');
	client.user.setStatus("xd");
})

client.on('message', async message => {
    if(!message.guild) return;
    if(message.content === '!join'){
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            const dispatcher = await connection.play(require("path").join(__dirname, '/media/brr.mp3'));
            dispatcher.on('finish', () =>{
                message.member.voice.channel.leave();
            })
        }
        else{
            message.reply('join a voice channel nerd');
        }
    }
});

