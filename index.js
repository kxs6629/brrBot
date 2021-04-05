const Discord = require('discord.js');
const config = require("./config.json");
const ytdl = require('ytdl-core');
const client = new Discord.Client();

const prefix = "!";
const commandList = ["brr","play","stop"];
const description = ["play the funny sound","play a youtube link by doing !play linkhere","gamer time, stop all sounds and make brr leave"];

let helpString='';
helpString.concat('List of commands: \n');
for(var i =0; i < commandList.length; i++){
    helpString+= "!"+commandList[i] +" : "+description[i]+'\n';
}

client.login(config.BOT_TOKEN);
client.on("ready",() => {
	console.log("Ready!");
	//Gonna fix this later since it's 3AM but sends a message to server so we know it works
    const channel = client.channels.cache.get('546437977715376128');
    // const channel = client.channels.cache.get('762848205054148619');
	channel.send('uh oh');
	client.user.setPresence({
        status: "online",
        activity: {
            name: "chat for the next command !help",
            type: "LISTENING"
        }
    });
})

client.on('message', async message => {
    if(message.author.bot) return;
    else if(message.content.startsWith(prefix)){
        const commandBody = message.content.slice(prefix.length);
	    const args = commandBody.split(' ');
	    const command = args.shift().toLowerCase();

        switch(command){
            case 'help':
                message.reply("ugh fine i guess i'll help...here: \n"+helpString);
                break;
            case 'brr':
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
                break;
            case 'play':
                if(message.member.voice.channel){
                    const connection = await message.member.voice.channel.join();
                    const dispatcher = await connection.play(ytdl(args.shift(), {filter: 'audioonly'}));
                    dispatcher.on('finish',() =>{
                        message.member.voice.channel.leave();
                    })
                }
                else{
                    message.reply('join a voice channel nerd');
                }
                break;
            case 'stop':
                if(message.member.voice.channel){
                    message.member.voice.channel.leave();
                }
                else{
                    message.reply('join a voice channel nerd');
                }
                break;
            default:
                message.reply('its not like i want to help you or anything. use !help for a list of commands');

        }

    }
    
});

