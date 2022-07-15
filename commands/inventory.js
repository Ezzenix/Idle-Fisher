const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')
const collect = require('../utils/collect.js')
const Upgrades = require("../utils/upgrades.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("inventory")
	.setDescription("View your inventory")
	.addUserOption(
		option => option
		.setName("user")
		.setDescription("The user's inventory to view")
	),
	run: async (interaction) => {
		const user = interaction.options.getUser("user") || interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		if (user != interaction.member.user) {
			//console.log(Date.now())
			//console.log(userData.collectTime.getTime() + (60 * 1000))
			if (Date.now() > userData.collectTime + (60 * 1000)) {
				//console.log("Updating other user since it's older than 1 minute")
				// Collect fish for offline user if more than 1 minute has passed
				collect(user)
			}
		}

		let inventoryEmbed = Helper.MakeEmbed()
		.setTitle(`${user.username}'s inventory`)
		.setColor('#57ebff')
		//.setThumbnail(user.displayAvatarURL())

		if (userData.inventory.length == 0) {
			inventoryEmbed.setDescription("Your inventory is empty, use **/fish**")
		} else {
			let amounts = new Object()
			userData.inventory.forEach(fishName => {
				if (!amounts[fishName]) amounts[fishName] = 0
				amounts[fishName] += 1
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

			inventoryEmbed.setDescription(description.join("\n") + `\n\nWorth: **$${totalWorth.toLocaleString('en-US')}**\nBackpack: **${userData.inventory.length.toLocaleString('en-US')}**/**${Upgrades.GetBackpackCapacity(userData.upgrades.backpack).toLocaleString('en-US')}**`)
			//inventoryEmbed.addField('Worth', `$${totalWorth.toLocaleString('en-US')}`)
		}

		return interaction.reply({
			embeds: [ inventoryEmbed ]
		})
	}
}