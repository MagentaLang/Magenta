const interpreter = require("./interpreter");
const fs = require("fs");

if (process.argv[2] == null) {
	console.log("No File Specified");
} else {
	fs.readFile(process.argv[2], "utf8", (err, data) => {
		if (err) throw new Error(err);

		let tokens = interpreter.lex(data);
		console.log(tokens);
	})
}
