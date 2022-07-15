const { SlashCommandBuilder } = require("@discordjs/builders")
const { User } = require("../utils/schemas")
const Helper = require('../utils/helper.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("leaderboard")
	.setDescription("View the top players"),
	run: async (interaction, client) => {
		
		var members = await User.find({})
		members = members.sort((b, a) => { return a.balance - b.balance })
		
		var desc = []
		var rank = 1

		var requester = interaction.member.user
		var yourRank

		for (var i = 0; i < members.length; i++) {
			var member = members[i]

			if (member.id == requester.id) yourRank = rank

			if (rank <= 10) {
				var user = await client.users.fetch(member.id)
				if (user) {
					desc.push(`**${rank}. ${user.tag}**\n$${member.balance.toLocaleString('en-US')}`)
					rank += 1
				}
			}
		}
		
		var leaderboardEmbed = Helper.MakeEmbed()
		.setTitle("Richest Users")
		.setDescription(`Your rank: **#${yourRank}**\n\n` + desc.join("\n"))

		return interaction.reply({
			embeds: [ leaderboardEmbed ]
		})
	}
}