const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("balance")
	.setDescription("View your balance")
	.addUserOption(
		option => option
		.setName("user")
		.setDescription("The user's balance to view")
	),
	run: async (interaction) => {
		const user = interaction.options.getUser("user") || interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		const balanceEmbed = Helper.MakeEmbed()
		.setTitle(`${user.username}'s balance`)
		.setColor('#57ebff')
		//.setThumbnail(user.displayAvatarURL())
		.setDescription(`$${userData.balance.toLocaleString('en-US')}`)
		
		return interaction.reply({
			embeds: [ balanceEmbed ]
		})
	}
}