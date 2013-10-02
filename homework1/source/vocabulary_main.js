var Vocabulary = require('./vocabulary.js');
process.stdin.resume();
process.stdin.setEncoding('utf8');

var tmpStr = "";

process.stdin.on("data", function(chunk) {
	var splitLines = (tmpStr + chunk).split("\n");

	for(var i = 0; i < splitLines.length - 1; i++) {
		console.log("data: " + splitLines[i]);
	}
	
	tmpStr = splitLines[splitLines.length-1];
});

process.stdin.on("end", function(){
	var splitLines = tmpStr.split("\n");

	for(var i = 0; i < splitLines.length; i++) {
		console.log("enddata: " + splitLines[i]);
	}
});