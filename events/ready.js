module.exports = async (client) => {

	const guildId = '398922707376406529'
	//const guild = client.guilds.cache.get(guildId)

	const commands = [...client.commands].map(v => v[1].data)

	const global = false

	if (global == true) {
		await client.application.commands.set(commands)
		console.log("Bot ready, running globally!")
	} else {
		await client.guilds.fetch(guildId).then(async guild => await guild.commands.set(commands))
		console.log("Bot ready, running locally!")
	}

	client.user.setActivity("/help!", {
		type: "LISTENING"
	});

}