const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')
const Upgrades = require('../utils/upgrades.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("profile")
	.setDescription("View your profile")
	.addUserOption(
		option => option
		.setName("user")
		.setDescription("The user's profile to view")
	),
	run: async (interaction) => {
		const user = interaction.options.getUser("user") || interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		let profileEmbed = Helper.MakeEmbed()
		.setTitle(`${user.username}'s profile`)
		.setColor('#57ebff')


		// Stats
		let desc = [
			`Balance: **$${userData.balance.toLocaleString('en-US')}**`
		]
		profileEmbed.setDescription(desc.join("\n"))

		profileEmbed.addField("Backpack", `Level: **${userData.upgrades.backpack.toLocaleString('en-US')}**\nHolds: **${Upgrades.GetBackpackCapacity(userData.upgrades.backpack).toLocaleString('en-US')}**`, true)
		profileEmbed.addField("Rod", `Level: **${userData.upgrades.rod.toLocaleString('en-US')}**\nFish per second: **${Upgrades.GetRodSpeed(userData.upgrades.rod).toLocaleString('en-US')}**`, true)

		let stats = [
			`Created: **${userData.created.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			  })}**`,
			`Fish Caught: **${userData.stats.fishCaught}**`
		]
		profileEmbed.addField("Statistics", stats.join("\n"))

		return interaction.reply({
			embeds: [ profileEmbed ]
		})
	}
}