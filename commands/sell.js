const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("sell")
	.setDescription("Sell your inventory"),
	run: async (interaction) => {
		const user = interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		let sellEmbed = Helper.MakeEmbed()
		.setColor('#57ebff')

		if (userData.inventory.length == 0) {
			sellEmbed.setTitle(`Nothing to Sell`)
			sellEmbed.setDescription("You have nothing to sell, use **/fish**")
		} else {
			let fishAmount = 0

			let amounts = new Object()
			userData.inventory.forEach(fishName => {
				if (!amounts[fishName]) amounts[fishName] = 0
				amounts[fishName] += 1
				fishAmount += 1
			})

			let totalWorth = 0

			let description = []
			for (var fishName in amounts) {
				var amount = amounts[fishName];
				var info = Fishes[fishName]
				var worth = info.Worth * amount
				description.push(`${info.Emoji} ${fishName} *x${amount.toLocaleString('en-US')}* ($${worth.toLocaleString('en-US')})`)
				totalWorth += worth
			}

			sellEmbed.setTitle(`Sold ${fishAmount.toLocaleString('en-US')} fish`)
			sellEmbed.setDescription(description.join("\n"))
			sellEmbed.addField('Summary', `You sold **${fishAmount.toLocaleString('en-US')}** fish for **$${totalWorth.toLocaleString('en-US')}**.\nYou now have **$${(userData.balance + totalWorth).toLocaleString('en-US')}**.`)

			userData.inventory.splice(0, userData.inventory.length)
			userData.balance += totalWorth
			userData.save()
		}

		return interaction.reply({
			embeds: [ sellEmbed ]
		})
	}
}