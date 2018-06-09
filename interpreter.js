var interpreter = {};

function valid(token) {
	if ((token == "(" || ")") ||
		isCommand(token) ||
		isValue(token)) return true;

	return false;
}

function isValue(token) {
	if (token.startsWith("STR:")) return true;

	return false;
}

function isCommand(token) {
	if (token == "<NWLNE>" ||
		token == "<EOF>") return true;

	return false;
}

function getArgs(info, callback) {
	var values = [];
	var error = null;
	for (let arg = 0; arg < info.args; arg++) {
		if (isValue(info.tokens[info.i + 2 + arg])) {
			values.push(info.tokens[info.i + 2 + arg]);
		} else {
			error = `Argument not value [Token Index ${info.i + 2 + arg}]`;
		}
	}

	if (info.tokens[info.i + 2 + info.args] != ")") {
		error = `Arguments Error [Token Index ${info.i+1}-${info.i + 3 + info.args}]`;
	}

	if (error) error = `${error} [at GetArgs()]`;
	callback(error, values);
}

interpreter["lex"] = (input) => {
	var tokens = [];
	var token = "";

	var string = "";
	var name = "";
	
	var state = false; // false = 0, true = 1

	var error = null;

	for (let i = 0; i < input.length; i++) {
		token += input[i];
		name = token.substring(0, token.length-1);
		switch (token[token.length-1]) {
			case " ":
				if (state == false) {
					token = "";
					if (name != "") {
						tokens.push(name);
						name = "";
					}
				}
				break;

			case "\n":
				if (name != "") tokens.push(name);
				tokens.push("<NWLNE>")
				token = "";
				break;

			case "\r":
				token = "";
				break;
			
			case ";":
				if (name != "") tokens.push(name);
				tokens.push("<NWLNE>")
				token = "";
				break;

			case "(":
				if (name != "") tokens.push(name);
				tokens.push("(");
				token = "";
				break;
			case ")":
				if (name != "") tokens.push(name);
				tokens.push(")");
				token = "";
				break;

			case "\"":
				state = !state;
				if (state == false) {
					tokens.push(`STR:${string}`);
					string = "";
				}
				token = "";
				break;
		}

		if (state == 1) {
			if (token != "\"") string += token;
			token = "";
		}
	}

	if (error) {
		console.log(`Error: ${error} [at Lexer]`);
		return [];
	}

	return tokens;
}

interpreter["parse"] = (tokens) => {
	var functions = {
		"print": { args: 1 }
	};
	var error = null;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (functions[token] != null) {
			if (tokens[i + 1] == "(") {
				switch (token) {
					case "print":
						getArgs({tokens:tokens,args:functions.print.args,i:i}, (err, args) => {
							if (err) {
								error = err;
							}

							console.log(args[0]);
						});
						break;
				
					default:
						// Get Instructions from Functions
						break;
				}
			} else {
				error = `Function with no brace [Token Index ${i + 1}]`;
			}
		} else if (valid(token)) {

		} else { // Overflow if no if-elses catch the token
			error = `Unexpected index [Token Index ${i + 1}]`;
		}

		if (error) {
			console.log(`Error: ${error} [at Parser]`);
			break;
		}
	}
}

module.exports = interpreter;
