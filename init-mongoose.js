const secret =  require("./env");

// connect to mongoAtlas database

module.exports = mongoose => {
	mongoose.connect(
		`${secret}`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);

	const db = mongoose.connection;

	db.on("error", err => {
		console.log(`An error has occurred while connecting to DB: ${err}`);
	});

	db.on("open", () => {
		console.log(`Connected to database. `);
	});
};
