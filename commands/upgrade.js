const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')
const collect = require('../utils/collect.js')
const Upgrades = require('../utils/upgrades.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("upgrade")
	.setDescription("Upgrade your equipment")
	.addStringOption(
		option => option
		.setName("type")
		.setDescription("The type of equipment to upgrade")
		.setRequired(true)
		.addChoices(
			{ name: 'Backpack', value: 'backpack' },
			{ name: 'Rod', value: 'rod' }
		)
	)
	.addStringOption(
		option => option
		.setName("amount")
		.setDescription("How many levels to upgrade, enter 'max' for max!")
		.setRequired(true)
	),
	run: async (interaction) => {
		const user = interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		var type = interaction.options.getString("type")

		const amountInput = interaction.options.getString("amount")
		var amount = parseInt(amountInput)
		if (amount < 1) amount = undefined 
		if (amountInput.toLowerCase() == "max") amount = -1

		if (!amount) {
			return Helper.MakeError(interaction, `${amountInput} is not a valid amount!`)
		}

		getPrice = (level) => {
			if (type == 'backpack') {
				return Upgrades.GetBackpackPrice(level)
			} else {
				return Upgrades.GetRodPrice(level)
			}
		}

		var level = userData.upgrades[type]

		var levelsBought = 0
		var balanceSpent = 0

		while (true) {
			const nextPrice = getPrice(level+1)
			if (userData.balance >= nextPrice) {
				userData.balance -= nextPrice
				level += 1
				levelsBought += 1
				balanceSpent += nextPrice
			} else {
				break
			}

			if (amount != -1 && levelsBought >= amount) break
		}

		if (levelsBought == 0) {
			const missing = getPrice(level+1) - userData.balance
			return Helper.MakeError(interaction, `You need **$${missing.toLocaleString('en-US')}** more to upgrade your ${type}!`)
		}

		var upgradeEmbed = Helper.MakeEmbed()
		.setTitle('Success')
		.setDescription(`Upgraded ${type} **${levelsBought}** times for **$${balanceSpent.toLocaleString('en-US')}**.\nYour ${type} is now level **${level}**.`)

		userData.upgrades[type] = level
		userData.save()

		return interaction.reply({
			embeds: [ upgradeEmbed ]
		})
	}
}