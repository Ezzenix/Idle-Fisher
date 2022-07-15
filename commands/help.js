const { SlashCommandBuilder } = require("@discordjs/builders")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("help")
	.setDescription("View all commands"),
	run: async (interaction, client) => {
		let helpEmbed = Helper.MakeEmbed()
		.setTitle("Available Commands")

		client.commands.forEach(cmd => {
			let data = cmd.data
			helpEmbed.addField(`/${data.name}`, "`" + `${data.description}` + "`", true)
		})

		return interaction.reply({
			embeds: [ helpEmbed ]
		})
	}
}