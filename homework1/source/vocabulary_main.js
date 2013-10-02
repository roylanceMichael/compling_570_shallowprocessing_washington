var Vocabulary = require('./vocabulary.js');
var Utilities = require('./utilities.js');
process.stdin.resume();
process.stdin.setEncoding('utf8');

var tmpStr = "";
var totalVocabularyWords = 0;
var utilities = new Utilities();
var vocabulary = new Vocabulary();

process.stdin.on("data", function(chunk) {
	var splitLines = (tmpStr + chunk).split("\n");
	for(var i = 0; i < splitLines.length - 1; i++) {
		vocabulary.parseLine(splitLines[i]);
	}

	tmpStr = splitLines[splitLines.length-1];
});

process.stdin.on("end", function(){
	var splitLines = tmpStr.split("\n");

	for(var i = 0; i < splitLines.length; i++) {
		vocabulary.parseLine(splitLines[i]);
	}

	utilities.printsStrArrayToConsoleByLine(vocabulary.reportFrequencyArray());

	// uncomment to get total vocabulary size
	// var vocTuples = vocabulary.reportFrequencyArray();
	// for(var j = 0; j < vocTuples.length; j++) {
	// 	totalVocabularyWords = totalVocabularyWords + vocTuples[j][1];
	// }

	// console.log("vocSize: " + totalVocabularyWords);
});