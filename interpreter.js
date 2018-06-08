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

	if (error) {
		console.log(`Error: ${error} [at Parser]`);
		return [];
	}
	
	return tokens;
}

interpreter["parse"] = (tokens) => {
	var functions = [
		"print"
	];
	var error = null;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (functions.indexOf(token) != -1) {
			if (tokens[i + 1] == "(") {
				switch (token) {
					case "print":
						console.log(tokens[i + 2]);
						break;
				
					default:
						// Get Instructions from Functions
						break;
				}
			} else {
				error = `Function with no brace [Token Index ${i + 1}]`;
				break;
			}
		}
	}

	if (error) console.log(`Error: ${error} [at Parser]`);
}

module.exports = interpreter;
