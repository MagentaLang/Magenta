var interpreter = {};

interpreter["STATES"] = {
	regular: 0,
	string: 1
};

interpreter["lex"] = (input) => {
	var tokens = [];
	var token = "";
	var state = interpreter.STATES.regular;

	return tokens;
}

module.exports = interpreter;
