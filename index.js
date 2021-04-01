const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "!";
const commandList = ["brr"];

client.on("ready",() => {
	console.log("Ready!");
	const channel = client.channels.cache.get('762848205054148619');
	channel.send('uh oh');
	client.user.setStatus("xd");
})
