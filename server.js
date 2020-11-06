const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const PORT = process.env.PORT || 5000;
const app = express();
const initMongoose = require("./init-mongoose");
const fs = require("fs");

initMongoose(mongoose);

// Global logger
const output = fs.createWriteStream("./logfile.log");
const { Console } = require("console");
global.writeLog = new Console({ stdout: output, stderr: output }).log;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
	try {
		const shortUrls = await ShortUrl.find();
		res.render("index", { shortUrls: shortUrls });
	} catch (err) {
		writeLog(err);
	}
});

app.post("/shortUrls", async (req, res) => {
	try {
		await ShortUrl.create({ full: req.body.fullUrl, fullShortened: req.body.fullUrl.substring(0, 40) + '...' });
		res.redirect("/");
	} catch (err) {
		writeLog(err);
	}
});

app.get("/:shortUrl", async (req, res) => {
	try {
		const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

		if (shortUrl == null) return res.sendStatus(404);

		res.redirect(shortUrl.full);
	} catch (err) {
		writeLog(err);
	}
});


app.listen(PORT, () => {
	writeLog(`Listening on port ${PORT}`);
});
