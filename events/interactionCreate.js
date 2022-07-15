const collect = require('../utils/collect.js')

module.exports = async (interaction, client=interaction.client) => {
	if (interaction.isCommand()) {
		var command = client.commands.get(interaction.commandName)
		if (!command) return
		await collect(interaction.member.user)
		command.run(interaction, client)
	}
}