const { SlashCommandBuilder } = require("@discordjs/builders")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("ping")
	.setDescription("View bot latency"),
	run: async (interaction) => {
		let pingEmbed = Helper.MakeEmbed()
		.setColor('#57ebff')
		.setTitle("Pong!")
		.setDescription(`Latency is ${interaction.client.ws.ping}ms`)

		return interaction.reply({
			embeds: [ pingEmbed ]
		})
	}
}