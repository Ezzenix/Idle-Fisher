const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
	inventory: { type: Array },
	cooldowns: {
        fish: { type: Date },
		daily: { type: Date }
    },
	upgrades: {
		rod: { type: Number, default: 1 },
		backpack: { type: Number, default: 1 }
	},
	stats: {
		fishCaught: { type: Number, default: 0 }
	},
	collectTime: { type: Date, default: Date.now() },
	created: { type: Date, default: Date.now() }
})

module.exports = { User: mongoose.model("User", User) }