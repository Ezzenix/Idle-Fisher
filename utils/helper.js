const { MessageEmbed } = require("discord.js")
const prettyMilliseconds = require('pretty-ms')

let functions = []

functions.MakeEmbed = () => {
	let newEmbed = new MessageEmbed()
	.setColor('#57ebff')
	.setTimestamp()
	.setFooter({ text: 'Idle Fisher', iconURL: 'https://cdn.discordapp.com/app-icons/997085811310854174/028e2ffbf6b1d4c10f2e453712e7b455.png?size=256' });
	return newEmbed
}

functions.MakeError = (interaction, text, title) => {
	let newEmbed = new MessageEmbed()
	.setTitle(title || "Error!")
	.setColor('#eb4034')
	.setDescription(text)
	//.setTimestamp()
	//.setFooter({ text: 'Idle Fisher', iconURL: 'https://cdn.discordapp.com/app-icons/997085811310854174/028e2ffbf6b1d4c10f2e453712e7b455.png?size=256' });
	return interaction.reply({
		embeds: [ newEmbed ],
		ephemeral: true
	})
}

functions.FormatTime = (ms) => {
	return prettyMilliseconds(ms, {verbose: true, secondsDecimalDigits: 0})
}

module.exports = functions