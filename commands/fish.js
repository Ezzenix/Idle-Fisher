const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')
const Upgrades = require('../utils/upgrades.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("fish")
	.setDescription("Catch a fish"),
	run: async (interaction) => {
		const user = interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		var desc = [
			`Fishing is automatic, use **/inventory** to view your fish.`,
			`You catch **${Upgrades.GetRodSpeed(userData.upgrades.rod).toLocaleString('en-US')}** fish per second, upgrade with **/upgrade rod**.`
		]

		const fishEmbed = Helper.MakeEmbed()
		.setTitle(`Fishing`)
		.setDescription(desc.join('\n'))

		return interaction.reply({
			embeds: [ fishEmbed ]
		})
	}
}