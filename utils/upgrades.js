let functions = []

// Backpack
functions.GetBackpackPrice = (level) => {
	return Math.round(level * 1.5)
}

functions.GetBackpackCapacity = (level) => {
	return Math.round(level * 6)
}

// Fishing rod
functions.GetRodPrice = (level) => {
	return Math.round(level * 1.45)
}

functions.GetRodSpeed = (level) => {
	return level * 0.25
}

for (var i = 1; i <= 100; i++) {
	const price = functions.GetBackpackPrice(i)
	const capacity = functions.GetBackpackCapacity(i)
	//console.log(`${i} ${price} ${capacity}`)
}

module.exports = functions