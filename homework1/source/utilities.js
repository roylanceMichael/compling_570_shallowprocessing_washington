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
	}
}

module.exports = Utilities;