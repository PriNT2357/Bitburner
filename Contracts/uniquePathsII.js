/**
* Unique Paths in a Grid II
* You are given a 2D array of numbers (array of array of numbers) representing
* a grid. The 2D array contains 1’s and 0’s, where 1 represents an obstacle and
* 0 represents a free space.
* 
* Assume you are initially positioned in top-left corner of that grid and that you
* are trying to reach the bottom-right corner. In each step, you may only move down
* or to the right. Furthermore, you cannot move onto spaces which have obstacles.
* 
* Determine how many unique paths there are from start to finish.
* Example input: [[0,0,0,0,0,0,0],[1,0,0,0,1,0,0],[0,0,0,0,0,0,0]]
*/

/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 2) {
		ns.tprint("Submits an answer to a contract on a given server");
		ns.tprint("Usage: > run " + ns.getScriptName() + " SERVER CONTRACT");
		ns.exit();
	}

	ns.clearLog();
	await ns.sleep(1000);

	var server = ns.args[0];
	var contract = ns.args[1];
	var flags = ns.codingcontract.getData(contract, server);

	// var flags = [[0,0,0,0,0,0,1,],[1,0,0,0,1,0,0,],[0,0,0,0,0,0,1,],[0,1,0,1,0,0,0,],[0,1,0,0,0,1,0,],[0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,],[0,0,0,1,0,0,0,],[0,1,0,0,0,0,0,],[0,0,0,0,0,0,0,],[0,0,0,0,0,0,1,],[0,0,0,0,0,0,0,]];
	// the above flags array should result in 219 unique paths
	// var flags = [[0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0],];
	for (let row of flags) {
		ns.tprint(row);
	}

	var x = 0;
	var y = 0;
	var grid = prepgrid(flags); // used to display the full grid traversal
	var result = sum2(x, y, flags, ns, grid);
	printgrid(ns, grid);
	ns.tprint("Unique Paths: " + result);
	var wasvalid = ns.codingcontract.attempt(result, contract, server);
	if (wasvalid === "") {
		ns.tprint("Answer is incorrect");
	} else {
		ns.tprint(ns.getScriptLogs());
	}
}

function sum2(x, y, flags, ns, grid) {
	var row = x;
	var col = y;
	var paths = -1;

	if (row === flags.length - 1 && col === flags[row].length - 1) {
		// at bottom right corner
		paths = 1;
		return paths;
	}

	if (row >= flags.length) {
		// rather than return 1 for all bottom edges
		paths = 0;
		return paths;
	}
	if (col >= flags[0].length) {
		// rather than return 1 for all right edges
		paths = 0;
		return paths;
	}

	var flag = flags[row][col];
	if (flag == 1) {
		paths = 0;
		grid[row][col] = paths;
		return paths;
	}

	var right = 0;
	var down = 0;
	right = sum2(row, col + 1, flags, ns, grid);
	down = sum2(row + 1, col, flags, ns, grid);
	paths = right + down;

	grid[row][col] = paths;
	return paths;
}

function printgrid(ns, grid) {
	ns.tprint("Grid");
	for (let row of grid) {
		ns.tprint(row);
	}
}

function prepgrid(data) {
	var grid = [];
	for (var i = 0; i < data.length; i++) {
		var tmparr = [];
		for (var j = 0; j < data[i].length; j++) {
			tmparr.push(0);
		}
		grid.push(tmparr);
	}
	return grid;
}