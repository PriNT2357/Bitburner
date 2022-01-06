/*
* Array Jumping Game
* You are given an array of integers where each element represents the
* maximum possible jump distance from that position. For example, if you
* are at position i and your maximum jump length is n, then you can jump
* to any position from i to i+n.
* 
* Assuming you are initially positioned at the start of the array, determine
* whether you are able to reach the last index of the array EXACTLY.
*/

/** @param {NS} ns **/
export async function main(ns) {
	//2,4,0,0,6,0,0,1,6,8,10,5,8,0,3
	// 2, 4, 0, 0, 6, 0, 0, 1, 6, 8,10, 5, 8, 0, 3 <-- given
	// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14 <-- index
	// 2  6  4  6 14 10 12 15 22 36 30 27 32 26 31 <-- max jump to index
	//             ^
	//              \exact to last index

// new test case: 3,1,9,7,0,2,5,4,6,3 should be accessable

	if (ns.args.length !== 2) {
		ns.tprint("Submits an answer to a contract on a given server");
		ns.tprint("Usage: > run " + ns.getScriptName() + " SERVER CONTRACT");
		ns.exit();
	}
	var server = ns.args[0];
	var contract = ns.args[1];
	var data = ns.codingcontract.getData(contract, server);

	if (typeof data === "string") {
		data = data.split(',');
	}

	// var exactindexjump = [];
	// var pointer = 0;

	var ok = canexactjump(ns, data);
	if (ok) {
		ns.tprint("End can be reached.");
	} else {
		ns.tprint("End cannot be reached.");
	}
	// var wasvalid = ns.codingcontract.attempt(ok, contract, server);
	// if (wasvalid === "") {
	// 	ns.tprint("Answer is incorrect");
	// } else {
	// 	ns.tprint(ns.getScriptLogs());
	// }

}


// determine if the end can be jumped to from any position
function canexactjump(ns, elements) {
	ns.tprint("Testing: " + elements);
	ns.tprint(elements);
	if (elements.length <= 1) {
		ns.tprintf("  no more elements to test");
		return 1;
	}
	for (var i = 0; i < elements.length; i++) {
		// var exactjump = Number(2 * i) + Number(elements[i]);
		var exactjump = Number(elements[i]);
		ns.tprint("  exact jump: " + exactjump);
		// exactindexjump.push(exactjump);
		if (exactjump === elements.length - 1) {
			//can jump from here to final index
			// check if any element can jump to here
			var trimmed = elements.slice(0, i + 1);
			return canexactjump(ns, trimmed);
		}
	}
	return 0;
}