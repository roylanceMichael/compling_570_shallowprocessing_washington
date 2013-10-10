function Utilities() {

}

Utilities.prototype = {
	
	returnObjOfParen: function(strVal) {
		var parenIndexes = this.parenIndex(strVal);

		if(parenIndexes.start == -1) {
			return {};
		}

		// business rules:
		// 1) identify where the paren is (done)
		// 2) get the first item
		// 3) get next paren list
		// 4) get list of those items, they will be the second level

		var subStr1 = strVal.substring(parenIndexes.start, parenIndexes.end);
		var values = this.returnListOfValuesBeforeParen(subStr1);

		var levelObj = {};
		var otherParenIndexes = this.parenIndex(subStr1);
		
		// assuming correct for this assignment
		var anotherSubStr = subStr1.substring(otherParenIndexes.start, otherParenIndexes.end);
		var subLevelValues = this.returnListOfValuesBeforeParen(anotherSubStr);
		levelObj[values[0]] = subLevelValues;

		return levelObj;
	},

	returnListOfValuesBeforeParen: function(strVal) {
		// find first paren
		var parenIdx = strVal.length;
		
		for(var i = 0; i < strVal.length; i++) {
			var val = strVal[i];
			if(val == "(") {
				parenIdx = i;
				break;
			}
		}
		
		var subStr = strVal.substring(0, parenIdx);
		return subStr.split(/\s+/);
	},

	parenIndex: function(strVal) {
		var parenStart = -1;
		var leftParenCount = 0;

		for(var i = 0; i < strVal.length; i++) {
			var currentChar = strVal[i];

			if(currentChar == "(") {
				if(parenStart == -1) {
					parenStart = i;
				}

				leftParenCount = leftParenCount + 1
			}
			else if(currentChar == ")") {
				leftParenCount = leftParenCount - 1;

				if(leftParenCount == 0) {
					return { "start": parenStart+1, "end": i };
				}
			}
		}

		return { "start": -1, "end": -1 };
	}
};