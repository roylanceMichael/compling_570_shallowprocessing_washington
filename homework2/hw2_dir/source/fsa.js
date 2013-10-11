// load in if we're coming from node.js
if(typeof Utilities == "undefined") {
	Utilities = require("./utilities.js");
}

// internal to this function only
function Fsa() {
	this.endState = "";
	this.epsilonState = "*e*";
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

	existsAlready: function(workObjects, workObject) {
		for(var i = 0; i < workObjects.length; i++) {

			var compareObj = workObjects[i];
			if(compareObj.wordIdx == workObject.wordIdx &&
				compareObj.state.to == workObject.state.to &&
				compareObj.state.from == workObject.state.from &&
				compareObj.state.val == workObject.state.val) {
				return true;
			}
		}

		return false;
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

		// I don't ever want to push an epsilon state..

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
					if(this.finalInputOkay(state.from)) {
						return true;
					}
				} 
				else {

					// create new work object(s)
					var previousWordIdx = workObject.wordIdx-1;
					var previousStates = this.getPreviousTransitionGivenInput(state.from);
					
					for(var i = 0; i < previousStates.length; i++) {
			
						var newWorkObject = { "wordIdx": previousWordIdx, "state": previousStates[i] };

						// no sense adding the same thing twice
						if(!this.existsAlready(workSpace, newWorkObject)) {
							workSpace.push(newWorkObject);
						}
					}
				}
			}
			// let's handle epsilons by themselves
			else if(state.val == this.epsilonState) {

				// we basically want to just skip this state and go to the next with the last word intact
				if(workObject.wordIdx == 0) {
					if(this.finalInputOkay(state.from)) {
						return true;
					}
				}
				else {

					var previousStates = this.getPreviousTransitionGivenInput(state.from);

					for(var i = 0; i < previousStates.length; i++) {
						
						var newWorkObject = { "wordIdx": workObject.wordIdx, "state": previousStates[i] };
						
						// no sense adding the same thing twice
						if(!this.existsAlready(workSpace, newWorkObject)) {
							workSpace.push(newWorkObject);
						}
					}
				}
			} 
		}

		// if we're reached this far, we haven't succeeded in finding a correct path
		return false;
	}
};

module.exports = Fsa;