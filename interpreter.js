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
				tokens.push("<NWLNE>")
				token = "";
				break;
			
			case ";":
				tokens.push("<NWLNE>")
				token = "";
				break;

			case "print":
				tokens.push(token);
				token = "";
				break;

			case "(":
				tokens.push(token);
				token = "";
				break;
			case ")":
				tokens.push(token);
				token = "";
				break;

			case "\"":
				state = !state;
				if (state == false) tokens.push(string);
				token = "";
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
