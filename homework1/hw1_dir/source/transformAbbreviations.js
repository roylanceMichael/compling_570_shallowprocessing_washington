var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var fs = require('fs');

var xmlStr = "";
var fileStream = fs.createReadStream("./abbreviations.xml");

fileStream.on("data", function(buffer) {
	xmlStr = xmlStr + buffer.toString();
});

fileStream.on("end", function() {
	var doc = new dom().parseFromString(xmlStr);
	var values = xpath.select("//td[position() mod 2 = 1]/text()", doc).toString().split(",");
	var outputObj = "{ ";
	for(var i = 0; i < values.length; i++) {
		outputObj = outputObj + "'" + values[i].replace(/\s*/, "").replace(/\'/, "").replace(/\n/g, "").toLowerCase() + "':'true'";
		
		if(i != values.length - 1) {
			outputObj = outputObj + ",";
		} 
	}
	outputObj = outputObj + " }";
	console.log(outputObj);
});

