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

	var elements = ns.args[0].split(',');
	var exactindexjump = [];
	var pointer = 0;

	var ok = canexactjump(ns, elements);
	if (ok) {
		ns.tprintf("End can be reached.");
	} else {
		ns.tprintf("End cannot be reached.");
	}

}


// determine if the end can be jumped to from any position
function canexactjump(ns, elements) {
	ns.tprintf("Testing: " + elements);
	if (elements.length <= 1) {
		ns.tprintf("  no more elements to test");
		return 1;
	}
	for (var i = 0; i < elements.length; i++) {
		var exactjump = Number(2 * i) + Number(elements[i]);
		ns.tprintf("  exact jump: " + exactjump);
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