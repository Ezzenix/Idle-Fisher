const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("daily")
	.setDescription("Claim your daily reward"),
	run: async (interaction) => {
		const user = interaction.member.user
		const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

		if (userData.cooldowns.daily > Date.now()) {
			const timeLeft = Helper.FormatTime(userData.cooldowns.daily.getTime() - new Date().getTime())
			return Helper.MakeError(interaction, `Please wait **${timeLeft}** before using this command again!`, `Cooldown!`)
		}

		const reward = Math.round(25 + (Math.random() * 75))

		userData.balance += reward
		userData.cooldowns.daily = Date.now() + (1000 * 60 * 60 * 24)
		userData.save()

		const dailyEmbed = Helper.MakeEmbed()
		.setTitle(`Daily Reward`)
		.setColor('#57ebff')
		.setDescription(`You claimed your daily reward and received **$${reward.toLocaleString('en-US')}**!`)

		return interaction.reply({
			embeds: [ dailyEmbed ]
		})
	}
}