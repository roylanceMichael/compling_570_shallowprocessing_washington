var e = 2.71828182846;

var lambda = 500 / 38;

var totalSum = 0;

var choose = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800];

for(var i = 0; i < 14; i++) {
	var lambdaToX = Math.pow(lambda, i);
	var eToNegativeX = Math.pow(e, i * -1);
	totalSum = totalSum + (lambdaToX * eToNegativeX) / choose[i];
}

console.log(totalSum);