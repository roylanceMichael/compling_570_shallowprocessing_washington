var Tokenizer = require('./tokenizer.js');
var Utilities = require('./utilities.js');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var tmpStr = "";
var totalTokens = 0;
var util = new Utilities();

process.stdin.on("data", function(chunk) {
	var splitLines = (tmpStr + chunk).split("\n");

	for(var i = 0; i < splitLines.length - 1; i++) {
		var tokenizer = new Tokenizer();
		tokenizer.parseLine(splitLines[i]);
		var tokens = tokenizer.getFoundTokens();
		totalTokens = totalTokens + tokens.length;
		util.printStrArrayToConsole(tokens);
	}

	tmpStr = splitLines[splitLines.length-1];
});

process.stdin.on("end", function(){
	var splitLines = tmpStr.split("\n");

	for(var i = 0; i < splitLines.length; i++) {
		var tokenizer = new Tokenizer();
		tokenizer.parseLine(splitLines[i]);
		var tokens = tokenizer.getFoundTokens();
		totalTokens = totalTokens + tokens.length;
		util.printStrArrayToConsole(tokens);
	}
	
});