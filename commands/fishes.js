const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("fishes")
	.setDescription("View all available fish"),
	run: async (interaction) => {
		const user = interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		let fishesEmbed = Helper.MakeEmbed()
		.setTitle(`Fish Index`)
		.setColor('#57ebff')


		for (var fishName in Fishes) {
			var info = Fishes[fishName];

			fishesEmbed.addField(`${info.Emoji} ${fishName}`, `Worth: $${info.Worth.toLocaleString('en-US')}`)
		}

		return interaction.reply({
			embeds: [ fishesEmbed ]
		})
	}
}