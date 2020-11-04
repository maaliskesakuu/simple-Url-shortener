const mongoose = require("mongoose");
const nanoid = require("nanoid");

const shortUrlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
	},
	fullShortened: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
		default: () => nanoid.nanoid(6),
	},
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
