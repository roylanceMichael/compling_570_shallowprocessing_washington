var compareEmail = "something.somewhere@gmail.com";
var currencyTest = "$123,456.45";
var currencyTestWithoutDollarSign = "123,456.45";

test("ctor", function() {
	var tokenizer = new Tokenizer();
	ok(tokenizer != null, "should be able to build object");
});

test("finds empty correctly", function() {
	var tokenizer = new Tokenizer();
	
	tokenizer.parseLine("");
	strictEqual(tokenizer.getFoundTokens().length, 0, "should have found empty correctly");
});

test("finds email address", function() {
	var tokenizer = new Tokenizer();
	
	tokenizer.parseLine(compareEmail);
	strictEqual(tokenizer.getFoundTokens().length, 1, "should have found email address");
	strictEqual(tokenizer.getFoundTokens()[0], compareEmail);
});

test("finds email address and one other", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello";

	tokenizer.parseLine(compareEmail + " " + testValue)
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 2, "should have found 2 tokens");
	strictEqual(tokens[0], compareEmail, "emails are different");
	strictEqual(tokens[1], testValue, "should have received " + testValue);
});

test("finds currency", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello";

	tokenizer.parseLine(currencyTest)
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 1 token");
	strictEqual(tokens[0], currencyTest, "currency is different");
});

test("finds currency without $", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello";

	tokenizer.parseLine(currencyTestWithoutDollarSign);

	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 1 token");
	strictEqual(tokens[0], currencyTestWithoutDollarSign, "currency is different");
});

test("finds currency and one other", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello";

	tokenizer.parseLine(currencyTest + " " + testValue)
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 2, "should have found 2 tokens");
	strictEqual(tokens[0], currencyTest, "currency is different");
	strictEqual(tokens[1], testValue, "should have received " + testValue);
});

test("finds word with punctuation", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello";

	tokenizer.parseLine(testValue + ".");
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 2, "should have found 2 tokens");
	strictEqual(tokens[0], testValue, "testval is different");
	strictEqual(tokens[1], ".", "should have received .");
});

test("finds Ph.d", function() {
	var tokenizer = new Tokenizer();
	var testValue = "Ph.d";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 1 token");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

test("finds ph.d", function() {
	var tokenizer = new Tokenizer();
	var testValue = "ph.d";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 1 token");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

test("finds mr. u.s.a. ph.d", function() {
	var tokenizer = new Tokenizer();
	var testValue = "ph.d";
	var testValue1 = "u.s.a";
	var testValue2 = "mr.";

	tokenizer.parseLine(testValue + " " + testValue1 + " " + testValue2);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 3, "should have found 3 tokens");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
	strictEqual(tokens[1], testValue1, "should have found " + testValue1);
	strictEqual(tokens[2], testValue2, "should have found " + testValue2);
});

test("finds http://washington.edu", function() {
	var tokenizer = new Tokenizer();
	var testValue = "http://washington.edu";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 3 tokens");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

test("finds www.washington.edu", function() {
	var tokenizer = new Tokenizer();
	var testValue = "www.washington.edu";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 3 tokens");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

test("finds hello-world test", function() {
	var tokenizer = new Tokenizer();
	var testValue = "hello-world";
	var testValue1 = "test";

	tokenizer.parseLine(testValue + " " + testValue1);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 2, "should have found 3 tokens");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
	strictEqual(tokens[1], testValue1, "should have found " + testValue1);
});

test("finds (555) 555-5555", function() {
	var tokenizer = new Tokenizer();
	var testValue = "(555) 555-5555";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 3 tokens");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

test("finds 555-555-5555", function() {
	var tokenizer = new Tokenizer();
	var testValue = "555-555-5555";

	tokenizer.parseLine(testValue);
	var tokens = tokenizer.getFoundTokens();
	strictEqual(tokens.length, 1, "should have found 1 token");
	strictEqual(tokens[0], testValue, "should have found " + testValue);
});

// vocabulary tests
test("reports empty correctly", function() {
	var vocabulary = new Vocabulary();
	var testValue = "";

	vocabulary.parseLine(testValue);
	var tokens = vocabulary.reportFrequencyArray();
	strictEqual(tokens.length, 0, "should have found 0 tokens");
});

test("reports hello hello world", function() {
	var vocabulary = new Vocabulary();
	var testValue = "hello hello world";

	vocabulary.parseLine(testValue);
	var tokens = vocabulary.reportFrequencyArray();
	strictEqual(tokens.length, 2, "should have found 2 tokens");
	strictEqual(tokens[0][0], "hello", "should have found hello");
	strictEqual(tokens[0][1], 2, "should have found 2");
	strictEqual(tokens[1][0], "world", "should have found world");
	strictEqual(tokens[1][1], 1, "should have found 1");
});