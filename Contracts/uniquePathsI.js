/**
* Unique Paths in a Grid I
* You are given an array with two numbers: [m, n]. These numbers represent a
* m x n grid. Assume you are initially positioned in the top-left corner of that
* grid and that you are trying to reach the bottom-right corner. On each step,
* you may only move down or to the right.
* 
* Determine how many unique paths there are from start to finish.
**/


/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 2) {
		ns.tprint("Submits an answer to a contract on a given server");
		ns.tprint("Usage: > run " + ns.getScriptName() + " SERVER CONTRACT");
		ns.exit();
	}
	var server = ns.args[0];
	var contract = ns.args[1];
	var data = ns.codingcontract.getData(contract, server);
	if (data.length !== 2) {
		ns.tprint("Invalid data from contract");
		ns.exit();
	}
	var result = sum2(data[0], data[1]);
	ns.tprint("Unique Paths: " + result);
	var wasvalid = ns.codingcontract.attempt(result, contract, server);
	if (wasvalid === "") {
		ns.tprint("Answer is incorrect");
	} else {
		ns.tprint(ns.getScriptLogs());
	}
}

function sum2(x, y) {
	if (x <= 1 || y <= 1) return 1;
	return sum2(x - 1, y) + sum2(x, y - 1);
}