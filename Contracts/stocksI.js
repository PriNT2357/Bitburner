/**
 * Algorithmic Stock Trader I
 * You are given an array of numbers representing stock prices, where the
 * i-th element represents the stock price on day i.
 * 
 * Determine the maximum possible profit you can earn using at most one
 * transaction (i.e. you can buy an sell the stock once). If no profit
 * can be made, then the answer should be 0. Note that you must buy the stock
 * before you can sell it.
 */

/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 2) {
		ns.tprint("Submits an answer to a contract on a given server");
		ns.tprint("Usage: > run " + ns.getScriptName() + " SERVER CONTRACT");
		ns.exit();
	}

	var server = ns.args[0];
	var contract = ns.args[1];
	var prices = ns.codingcontract.getData(contract, server);


	// var prices = ns.args[0].split(',');
	var profits = [];
	var maxprofit = 0;
	ns.tprint(prices);
	for (var i = 0; i < prices.length; i++) {
		var profit = [];
		for (var j = i; j < prices.length; j++) {
			var transactionprofit = prices[j] - prices[i];
			if (maxprofit < transactionprofit) {
				// ns.tprintf("Transaction [%di,%dj]: - %d + %d  = %d", i,j,prices[i], prices[j],transactionprofit);
				maxprofit = transactionprofit;
			}
			profit.push(transactionprofit);
		}
		profits.push(profit);
	}
	// ns.tprint("Profits: " );
	// ns.tprint(profits);
	ns.tprint("Max profit: " + maxprofit);
	var wasvalid = ns.codingcontract.attempt(maxprofit, contract, server);
	if (wasvalid === "") {
		ns.tprint("Answer is incorrect");
	} else {
		ns.tprint(ns.getScriptLogs());
	}
}