function Vocabulary() {
	this.frequencyHash = {};
}

Vocabulary.prototype = {
	parseLine: function(line) {
		if(line.trim() == "") {
			return;
		}

		var tokens = line.trim().split(/\s+/);
		
		for(var i = 0; i < tokens.length; i++) {
			var token = tokens[i];

			if(this.frequencyHash[token] != undefined) {
				this.frequencyHash[token] = this.frequencyHash[token] + 1;
			} else {
				this.frequencyHash[token] = 1;
			}
		}
	},

	reportFrequencyArray: function() {
		var sortable = [];

		for(var key in this.frequencyHash) {
			sortable.push([key, this.frequencyHash[key]]);
		}

		
		sortable.sort(function(a, b) { return b[1] - a[1] });
		return sortable;
	},


};

module.exports = Vocabulary;