var interpreter = {};

interpreter["lex"] = (input) => {
	var tokens = [];
	var token = "";
	string = "";
	var state = false; // false = 0, true = 1

	for (let i = 0; i < input.length; i++) {
		token += input[i];
		switch (token) {
			case " ":
				if (state == false) token = "";
				break;

			case "\n":
				token = "";
				break;
			
			case ";":
				token = "";
				break;

			case "print":
				tokens.push(token);
				token = "";
				break;

			case "\"":
				console.log(state)
				state = !state;
				console.log(state)
				if (state == false) tokens.push(string);
				break;
		}

		if (state == 1) {
			if (token != "\"") string += token;
			token = "";
		}
	}

	return tokens;
}

module.exports = interpreter;
