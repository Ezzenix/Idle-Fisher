const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("info")
	.setDescription("View bot information"),
	run: async (interaction, client) => {

		var desc = [
			`Made by **Ezzenix#5500**`,
			`Servers: **${client.guilds.cache.size}**`,
			`Users: **${Object.keys(await User.find({})).length}**`
		]
		
		var infoEmbed = Helper.MakeEmbed()
		.setTitle("Fisher")
		.setDescription(desc.join("\n"))

		return interaction.reply({
			embeds: [ infoEmbed ]
		})
	}
}