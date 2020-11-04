const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const PORT = process.env.PORT || 5001;
const app = express();
const initMongoose = require("./init-mongoose");

initMongoose(mongoose);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
	try {
		const shortUrls = await ShortUrl.find();
		res.render("index", { shortUrls: shortUrls });
	} catch (err) {
		console.log(err);
	}
});

app.post("/shortUrls", async (req, res) => {
	try {
		await ShortUrl.create({ full: req.body.fullUrl, fullShortened: req.body.fullUrl.substring(0, 50) + '...' });
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

app.get("/:shortUrl", async (req, res) => {
	try {
		const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

		if (shortUrl == null) return res.sendStatus(404);

		res.redirect(shortUrl.full);
	} catch (err) {
		console.log(err);
	}
});


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
