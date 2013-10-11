var fs = require('fs');
var Fsa = require('./fsa.js');

var fsaLocation = process.argv[2];
var userInputLocation = process.argv[3];

var fsaFileStr = "";
var userInputStr = "";

// function to handle both strings
var handleBothStrings = function() {
	var fileFsa = new Fsa();

	// parse the fsa file that was read in
	fileFsa.parse(fsaFileStr);

	// split the user input by line
	var userInputLines = userInputStr.trim().split("\n");
	
	for(var i = 0; i < userInputLines.length; i++) {
		var userInputLine = userInputLines[i].trim();

		var res = fileFsa.processInput(userInputLine);

		// report to console
		console.log(userInputLine + " => " + res);
	}
};

/* READ THE INPUT FILES */
var fsaFileStream = fs.createReadStream(fsaLocation);

fsaFileStream.on("data", function(buffer) {
	fsaFileStr = fsaFileStr + buffer.toString();
});

fsaFileStream.on("end", function() {
	userInputStream = fs.createReadStream(userInputLocation);

	userInputStream.on("data", function(buffer) {
		userInputStr = userInputStr + buffer.toString();
	});

	userInputStream.on("end", function() {
		// start the process
		handleBothStrings();
	});
});