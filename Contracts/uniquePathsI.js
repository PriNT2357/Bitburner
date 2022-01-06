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
		ns.tprint("Requires two numbers for grid size");
		ns.tprint("Example useage: Unique_Paths_I.js 5 8");
		return;
	}
	var x = ns.args[0];
	var y = ns.args[1];

	var result = sum2(x, y);
	ns.tprint("Unique Paths: " + result);
}

function sum2(x, y) {
	if (x <= 1 || y <= 1) return 1;
	return sum2(x - 1, y) + sum2(x, y - 1);
}