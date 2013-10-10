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
test("utilities returnObjOfParen bad string", function() {
	var utilities = new Utilities();
	var res = utilities.returnObjOfParen("something");
	
	strictEqual(0, objectSize(res));
});

test("utilities returnObjOfParen (F(F 6))", function() {
	var utilities = new Utilities();
	var res = utilities.returnObjOfParen("(F(F 6))");
	
	strictEqual("F", res["F"][0]);
	strictEqual("6", res["F"][1]);
});

test("utilities returnObjOfParen (F(Batman Joker What Is This))", function() {
	var utilities = new Utilities();
	var res = utilities.returnObjOfParen("(F(Batman Joker What Is This))");
	
	strictEqual("Batman", res["F"][0]);
	strictEqual("Joker", res["F"][1]);
	strictEqual("What", res["F"][2]);
	strictEqual("Is", res["F"][3]);
	strictEqual("This", res["F"][4]);
});

// note, I'm just doing happy path for the time being for Utlities.returnObjOfParen

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
	strictEqual("F", firstTranState["F"][0]);
	strictEqual("1", firstTranState["F"][1]);
});

test("parse fsa multiline good string", function() {
	var fsa = new Fsa();
	var input = 
"F\n\
(R (T 1))\n\
(T (F 2))";
	fsa.parse(input);
	strictEqual("F", fsa.getEndState());
	strictEqual(2, fsa.getgetTransitionStates().length);

	var firstTranState = fsa.getTransitionStates()[0];
	strictEqual("F", firstTranState["F"][0]);
	strictEqual("1", firstTranState["F"][1]);
	
	var secondTranState = fsa.getTransitionStates()[1];
	strictEqual("T", secondTranState["T"][0]);
});

