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
	getEndState: function() {
		return this.endState;
	},

	getTransitionStates: function() {
		return this.transitionStates;
	},

	parse: function(strVal) {
		var splitInput = strVal.split("\n");

		if(splitInput.length == 0){
			return;
		}

		this.endState = splitInput[0].trim();

		for(var i = 1; i < splitInput.length; i++) {
			var line = splitInput[i].trim();

			// I want to handle blank spaces okay
			if(line == "") {
				continue;
			}

			var parenObj = this.utilities.returnTransitionState(line);
			this.transitionStates.push(parenObj);
		}
	},

	getPreviousTransitionGivenInput: function(currentState) {
		// find current state
		var currentToStates = [];

		for(var i = 0; i < this.transitionStates.length; i++) {

			if(this.transitionStates[i].to == currentState) {
				currentToStates.push(this.transitionStates[i]);
			}
		}

		// simply return transition states now
		return currentToStates;
	},

	processInput: function(input) {
		// assuming the input is just in one line, the main file will split it for me...
		// this function will simply return a yes or no
		var splitValues = input.split("\n");

		// I think I will work my way back, I know what the final state should be
		// therefore I can start at the end and try each branch
		// assuming there are multiple ways to get there...

		// get final states
		var finalStates = this.getPreviousTransitionGivenInput(this.endState);

		for(var i = splitValues.length-1; i >= 0; i--) {
			// starting at the end
			//var cleansedInput = splitValues[i].replace(/\)

		}
	}
};

exports = Fsa;