const { User } = require("../utils/schemas")
const Fishes = require("../utils/fishes.json")
const Upgrades = require("../utils/upgrades.js")

module.exports = async (user) => {
	var userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

	const fishPerSecond = Upgrades.GetRodSpeed(userData.upgrades.rod)
	if (fishPerSecond < 0.01) fishPerSecond = 0.01 //idk, just to prevent errors 
	const secondsPerFish = 1 / fishPerSecond
	if (Date.now() < userData.collectTime + (secondsPerFish * 1000)) return

	var secondsSinceCollect = (Date.now() - userData.collectTime)/1000

	var fishAmount = Math.floor(secondsSinceCollect/secondsPerFish)

	var wastedSeconds = secondsSinceCollect - (secondsPerFish * fishAmount)
	console.log("-----------------")
	console.log("fishPerSecond: " + fishPerSecond)
	console.log("secondsPerFish: " + secondsPerFish)
	console.log("last: " + secondsSinceCollect)
	console.log("fish: " + fishAmount)
	console.log("wasted: " + wastedSeconds)
	userData.collectTime = Date.now() - wastedSeconds
	
	//console.log("-----------------")
	//console.log("last: " + secondsSinceCollect)
	//console.log("fish: " + fishAmount)
	//console.log("wasted: " + wastedSeconds)

	const backpackCapacity = Upgrades.GetBackpackCapacity(userData.upgrades.backpack)
	const fishNames = Object.keys(Fishes)
	for (var i = 0; i < fishAmount; i++) {
		if (userData.inventory.length >= backpackCapacity) break
		const fishName = fishNames[Math.floor(Math.random() * fishNames.length)]
		userData.inventory.push(fishName)
		userData.stats.fishCaught += 1
	}

	console.log("COLLECTED " + fishAmount)

	await userData.save()

	//console.log(userData)
}