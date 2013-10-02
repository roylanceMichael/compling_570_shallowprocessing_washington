function Utilities() {

}

Utilities.prototype = {
	printStrArrayToConsole: function(strArray) {
		var workSpace = "";
		for(var j = 0; j < strArray.length; j++) {
			if(j == strArray.length - 1) {
				workSpace = workSpace + strArray[j];
			}
			else {
				workSpace = workSpace + strArray[j] + " ";
			}
		}

		console.log(workSpace);
	},

	printsStrArrayToConsoleByLine: function(strArray) {
		for(var j = 0; j < strArray.length; j++) {
			console.log(strArray[j][0] + " " + strArray[j][1]);
		}
	}
}

module.exports = Utilities;