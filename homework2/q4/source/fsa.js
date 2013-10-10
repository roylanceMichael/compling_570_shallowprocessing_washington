// load in if we're coming from node.js
if(Utilities == null) {
	Utilities = require("./utilities.js");
}

// internal to this function only
function Fsa() {
	this.endState = "";
	this.transitionStates = [];
	this.utilities = new Utilities();
}

Fsa.prototype = {
	parse: function(strVal) {
		var splitInput = strVal.split("\n");
		console.log(splitInput[0]);
		if(splitInput.length == 0){
			return;
		}

		this.endState = splitInput[0].trim();

		for(var i = 1; i < splitInput.length; i++) {
			var line = splitInput[i];

			var parenObj = this.utilities.returnObjOfParen(line);
			this.transitionStates.push(parenObj);
		}
	},

	getEndState: function() {
		return this.endState;
	},

	getTransitionStates: function() {
		return this.transitionStates;
	}
};

exports = Fsa;