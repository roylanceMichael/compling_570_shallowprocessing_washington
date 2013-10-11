// load in if we're coming from node.js
if(typeof Utilities == "undefined") {
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

	finalInputOkay: function(currentState) {
		var finalStates = this.getPreviousTransitionGivenInput(currentState);

		// if we have a recursive state, then we're okay
		if(finalStates.length == 0) {
			return true;
		}

		var allRecursive = true;
		for(var i = 0; i < finalStates.length; i++) {
			if(finalStates[i].to != finalStates[i].from) {
				return false;
			}
		}

		return allRecursive;
	},

	processInput: function(input) {
		// assuming the input is just in one line, the main file will split it for me...
		// this function will simply return a yes or no
		var splitValues = input.split(/\s+/);

		// I think I will work my way back, I know what the final state should be
		// therefore I can start at the end and try each branch
		// assuming there are multiple ways to get there...

		// stack structure
		var workSpace = [];

		// get final states
		var finalStates = this.getPreviousTransitionGivenInput(this.endState);

		for(var i = 0; i < finalStates.length; i++) {
			var workObject = { "wordIdx": splitValues.length - 1, "state": finalStates[i] };
			workSpace.push(workObject);
		}

		while(workSpace.length > 0) {
			var workObject = workSpace.splice(0, 1)[0];

			var word = this.utilities.cleanseInput(splitValues[workObject.wordIdx]);
			var state = workObject.state;

			// does this transition to the previous state?
			if(state.val == word) {
				// are we at the beginning of the string?
				if(workObject.wordIdx == 0) {

					// check to see if we've successfully reached traversed the machine
					if(this.finalInputOkay(word.state)) {
						return true;
					}

				} else {

					// create new work object(s)
					var previousWordIdx = workObject.wordIdx-1;
					var previousWord = this.utilities.cleanseInput(splitValues[previousWordIdx]);
					var previousStates = this.getPreviousTransitionGivenInput(state.to);
					
					for(var i = 0; i < previousStates.length; i++) {
						var newWorkObject = { "wordIdx": previousWordIdx, "state": previousStates[i] };
						workSpace.push(newWorkObject);
					}
				}
			} 
		}

		// if we're reached this far, we haven't succeeded in finding a correct path
		return false;
	}
};

module.exports = Fsa;