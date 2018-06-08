var interpreter = {};

interpreter["lex"] = (input) => {
	var tokens = [];
	var token = "";
	var state = false; // false = 0, true = 1

	for (let i = 0; i < input.length; i++) {
		token += input[i];
		switch (token) {
			case " ":
				if (!state) token = "";
				break;

			case "\n":
				token = "";
				break;

			case "Log":
				tokens.push(token);
				token = "";
				break;

			case "\"":
				state = !state;
				if (!state) tokens.push(token);
				break;
		}
	}

	return tokens;
}

module.exports = interpreter;
