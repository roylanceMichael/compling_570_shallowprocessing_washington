/*
Helper utilities 
*/

var objectSize = function(obj) {
	var size = 0;
	for(var key in obj) {
		size = size + 1;
	}

	return size;
};

test("ctor", function() {
	var fsa = new Fsa();
	ok(fsa != null, "should be able to build object");
});

test("utilities ctor", function() {
	var utilities = new Utilities();
	ok(utilities != null);
});

/*
something
*/
test("utilities parenIndex return bad paren information", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("something");

	strictEqual(res.start, -1);
	strictEqual(res.end, -1);
});

test("utilities parenIndex return -1 when only one (", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("(something");

	strictEqual(res.start, -1);
	strictEqual(res.end, -1);
});

test("utilities parenIndex return -1 when only one )", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("(something");

	strictEqual(res.start, -1);
	strictEqual(res.end, -1);
});

test("utilities parenIndex return 1 and 10 when only given (something)", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("(something)");

	strictEqual(res.start, 1);
	strictEqual(res.end, 10);
});

test("utilities parenIndex return -1 when given ((car)", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("((car)");

	strictEqual(res.start, -1);
	strictEqual(res.end, -1);
});

test("utilities parenIndex return 1, 11 when given (what (car))", function() {
	var utilities = new Utilities();
	var res = utilities.parenIndex("(what (car))");

	strictEqual(res.start, 1);
	strictEqual(res.end, 11);
});

test("utilities parenIndex correct substring with _w(what)ww", function() {
	var utilities = new Utilities();
	var str = "with _w(what)ww";
	var res = utilities.parenIndex(str);

	strictEqual("what", str.substring(res.start, res.end));
});

test("utilities returnListOfValuesBeforeParen correct split items with hello world", function() {
	var utilities = new Utilities();
	var str = "hello world";
	var res = utilities.returnListOfValuesBeforeParen(str);

	strictEqual("hello", res[0]);
	strictEqual("world", res[1]);
});

test("utilities returnListOfValuesBeforeParen correct split items with hello world(adventure island)", function() {
	var utilities = new Utilities();
	var str = "hello world(adventure island)";
	var res = utilities.returnListOfValuesBeforeParen(str);

	strictEqual("hello", res[0]);
	strictEqual("world", res[1]);
});

test("utilities returnListOfValuesBeforeParen correct split with _w(what)ww", function() {
	var utilities = new Utilities();
	var str = "with _w(what)ww";
	var res = utilities.returnListOfValuesBeforeParen(str);

	strictEqual("with", res[0]);
	strictEqual("_w", res[1]);
});

/*
something
*/
test("utilities returnTransitionState bad string", function() {
	var utilities = new Utilities();
	var res = utilities.returnTransitionState("something");
	
	strictEqual(0, objectSize(res));
});

test("utilities returnTransitionState (F(F 6))", function() {
	var utilities = new Utilities();
	var res = utilities.returnTransitionState("(F(F 6))");
	
	strictEqual("F", res.from);
	strictEqual("F", res.to);
	strictEqual("6", res.val);
});

test("utilities returnTransitionState (F(Batman Joker What Is This))", function() {
	var utilities = new Utilities();
	var res = utilities.returnTransitionState("(F(Batman Joker What Is This))");
	
	strictEqual("F", res.from);
	strictEqual("Batman", res.to);
	strictEqual("Joker", res.val);
	strictEqual("What", res.props[0]);
	strictEqual("Is", res.props[1]);
	strictEqual("This", res.props[2]);
});

// note, I'm just doing happy path for the time being for Utlities.returnTransitionState

// how do I want this represented?
// F
// (F (F 1))
// that means, if I'm given 1 I'm good
// maybe right now I can just simply represent them as objects
// for example 
// (F (F 1)) => { "F": {"F": 1 }}

test("parse fsa good string", function() {
	var fsa = new Fsa();
	var input = 
"F\n\
(F (F 1))";
	fsa.parse(input);
	strictEqual("F", fsa.getEndState());
	var firstTranState = fsa.getTransitionStates()[0];
	strictEqual("F", firstTranState.from);
	strictEqual("F", firstTranState.to);
	strictEqual("1", firstTranState.val);
});

test("parse fsa multiline good string", function() {
	var fsa = new Fsa();
	var input = 
"F\n\
(R (T 1))\n\
(T (F 2))";
	fsa.parse(input);
	strictEqual("F", fsa.getEndState());
	strictEqual(2, fsa.getTransitionStates().length);

	var firstTranState = fsa.getTransitionStates()[0];
	strictEqual("R", firstTranState.from);
	strictEqual("T", firstTranState.to);
	strictEqual("1", firstTranState.val);
	
	var secondTranState = fsa.getTransitionStates()[1];
	strictEqual("T", secondTranState.from);
	strictEqual("F", secondTranState.to);
	strictEqual("2", secondTranState.val);
});

test("parse fsa multiline large good string", function() {
	var fsa = new Fsa();
	var input = 
"F\n\
(R (T 1))\n\
(T (F 2))\n\
(X (X 2))\n\
(X (C 3))\n\
(C (C 1))\n\
(G (G 22))\n\
(G (B 2))\n\
(B (F 21))";
	fsa.parse(input);
	strictEqual("F", fsa.getEndState());
	strictEqual(8, fsa.getTransitionStates().length);

	var firstTranState = fsa.getTransitionStates()[0];
	strictEqual("R", firstTranState.from);
	strictEqual("T", firstTranState.to);
	strictEqual("1", firstTranState.val);
	
	var secondTranState = fsa.getTransitionStates()[1];
	strictEqual("T", secondTranState.from);
	strictEqual("F", secondTranState.to);
	strictEqual("2", secondTranState.val);

	var thirdTranState = fsa.getTransitionStates()[2];
	strictEqual("X", thirdTranState.from);
	strictEqual("X", thirdTranState.to);
	strictEqual("2", thirdTranState.val);

	var fourthTranState = fsa.getTransitionStates()[3];
	strictEqual("X", fourthTranState.from);
	strictEqual("C", fourthTranState.to);
	strictEqual("3", fourthTranState.val);

	var fifthTranState = fsa.getTransitionStates()[4];
	strictEqual("C", fifthTranState.from);
	strictEqual("C", fifthTranState.to);
	strictEqual("1", fifthTranState.val);

	var sixthTranState = fsa.getTransitionStates()[5];
	strictEqual("G", sixthTranState.from);
	strictEqual("G", sixthTranState.to);
	strictEqual("22", sixthTranState.val);

	var seventhTranState = fsa.getTransitionStates()[6];
	strictEqual("G", seventhTranState.from);
	strictEqual("B", seventhTranState.to);
	strictEqual("2", seventhTranState.val);

	var eigthTranState = fsa.getTransitionStates()[7];
	strictEqual("B", eigthTranState.from);
	strictEqual("F", eigthTranState.to);
	strictEqual("21", eigthTranState.val);
});

test("parse fsa multiline large initial exercise", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 the))\n\
(1 (2 tall))\n\
(2 (3 man))\n\
(1 (4 short))\n\
(4 (3 man))\n\
(0 (5 a))\n\
(5 (4 short))";
	fsa.parse(input);
	strictEqual("3", fsa.getEndState());
	strictEqual(7, fsa.getTransitionStates().length);

	var firstTranState = fsa.getTransitionStates()[0];
	strictEqual("0", firstTranState.from);
	strictEqual("1", firstTranState.to);
	strictEqual("the", firstTranState.val);
	
	var secondTranState = fsa.getTransitionStates()[1];
	strictEqual("1", secondTranState.from);
	strictEqual("2", secondTranState.to);
	strictEqual("tall", secondTranState.val);

	var thirdTranState = fsa.getTransitionStates()[2];
	strictEqual("2", thirdTranState.from);
	strictEqual("3", thirdTranState.to);
	strictEqual("man", thirdTranState.val);

	var fourthTranState = fsa.getTransitionStates()[3];
	strictEqual("1", fourthTranState.from);
	strictEqual("4", fourthTranState.to);
	strictEqual("short", fourthTranState.val);

	var fifthTranState = fsa.getTransitionStates()[4];
	strictEqual("4", fifthTranState.from);
	strictEqual("3", fifthTranState.to);
	strictEqual("man", fifthTranState.val);

	var sixthTranState = fsa.getTransitionStates()[5];
	strictEqual("0", sixthTranState.from);
	strictEqual("5", sixthTranState.to);
	strictEqual("a", sixthTranState.val);

	var seventhTranState = fsa.getTransitionStates()[6];
	strictEqual("5", seventhTranState.from);
	strictEqual("4", seventhTranState.to);
	strictEqual("short", seventhTranState.val);
});

test("getPreviousTransitionGivenInput simple example", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	var previousStates = fsa.getPreviousTransitionGivenInput("A");
	strictEqual(1, previousStates.length);

	var previousState = previousStates[0];
	strictEqual("A", previousState.from);
	strictEqual("A", previousState.to);
	strictEqual("a", previousState.val);
});

test("getPreviousTransitionGivenInput more complex", function() {
	var fsa = new Fsa();
	var input = 
"C\n\
(A (B 'a'))\n\
(B (C 'z'))\n\
(A (C 'f'))\n\
";
	fsa.parse(input);

	var previousStates = fsa.getPreviousTransitionGivenInput("C");
	strictEqual(2, previousStates.length);

	var firstState = previousStates[0];
	strictEqual("B", firstState.from);
	strictEqual("C", firstState.to);
	strictEqual("z", firstState.val);

	var secondState = previousStates[1];
	strictEqual("A", secondState.from);
	strictEqual("C", secondState.to);
	strictEqual("f", secondState.val);
});

test("processinput fsa 'a'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa 'b'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa 'a' 'a'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa 'a' 'a' 'a'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa 'a' 'a' 'b'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa 'a' 'b' 'a'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"b\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa 'a' 'c'", function() {
	var fsa = new Fsa();
	var input = 
"A\n\
(A (A 'a'))\n\
";
	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"c\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa1 with epsilon transition a a b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (3 *e*))\n\
(0 (2 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 *e*))\n\
(2 (2 \"b\"))\n\
(2 (3 *e*))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa1 with epsilon transition a a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (3 *e*))\n\
(0 (2 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 *e*))\n\
(2 (2 \"b\"))\n\
(2 (3 *e*))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa1 with epsilon transition b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (3 *e*))\n\
(0 (2 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 *e*))\n\
(2 (2 \"b\"))\n\
(2 (3 *e*))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa1 with epsilon transition a b a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (3 *e*))\n\
(0 (2 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 *e*))\n\
(2 (2 \"b\"))\n\
(2 (3 *e*))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"b\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa1 with epsilon transition a c", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (3 *e*))\n\
(0 (2 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 *e*))\n\
(2 (2 \"b\"))\n\
(2 (3 *e*))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"c\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa2 with epsilon transition a a b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"a\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa2 with epsilon transition a a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"a\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa2 with epsilon transition b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"a\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa2 with epsilon transition a b a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"a\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"b\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa2 with epsilon transition a c", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"a\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"c\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa3 with epsilon transition a a b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (2 \"b\"))\n\
(0 (3 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa3 with epsilon transition a a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (2 \"b\"))\n\
(0 (3 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa3 with epsilon transition b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (2 \"b\"))\n\
(0 (3 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa3 with epsilon transition a b a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (2 \"b\"))\n\
(0 (3 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"b\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa3 with epsilon transition a c", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(0 (2 \"b\"))\n\
(0 (3 \"b\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"c\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa4 with epsilon transition a a b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\" \"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(true, res);
});

test("processinput fsa fsa4 with epsilon transition a a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa4 with epsilon transition b", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"b\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa4 with epsilon transition a b a", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"b\" \"a\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

test("processinput fsa fsa4 with epsilon transition a c", function() {
	var fsa = new Fsa();
	var input = 
"3\n\
(0 (1 \"a\"))\n\
(1 (1 \"a\"))\n\
(1 (2 \"b\"))\n\
(1 (3 \"b\"))\n\
(2 (2 \"b\"))\n\
(2 (3 \"b\"))";

	fsa.parse(input);

	// let's process the input
	var userInput = "\"a\" \"c\"";
	var res = fsa.processInput(userInput);
	strictEqual(false, res);
});

