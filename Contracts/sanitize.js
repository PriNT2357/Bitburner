/**
* Sanitize Parentheses in Expression
* Given a string with parentheses and letters, remove the minimum number of invalid
* parentheses in order to validate the string. If there are multiple minimal ways
* to validate the string, provide all of the possible results.
* 
* The answer should be provided as an array of strings. If it is impossible to validate
* the string, the result should be an array with only an empty string.
* 
* Examples:
*   ()())() -> [()()(), (())()]
*   (a)())() -> [(a)()(), (a())()]
*   )( -> [“”]
**/


/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length == 0) {
		ns.tprint("");
		ns.tprint("Example useage:  ");
		return;
	}
	var results = [];
	var s = ns.args[0];
	var totest = [ns.args[0]];
	results = testthese(ns, totest);
	ns.tprint("Answers: "+totest+" => [" + (results.length==0?"\"\"":results) + "]");

}

function testthese(ns, totest) {
	var valids = [];
	if (totest.length === 0) {
		return valids;
	}
	if (totest[0].length === 0) {
		return valids;
	}
	for (let s of totest) {
		var valid = isvalid(s);
		// ns.tprint(s + " is" + (valid ? "" : " not") + " valid");
		if (valid && valids.indexOf(s) === -1) {
			// ns.tprint("  Adding to results");
			valids.push(s);
		}
		// await ns.sleep(5);
	}
	if (valids.length === 0) {
		var newtests = [];
		for (let s of totest) {
			newtests = newtests.concat(removeone(s));
		}
		// await ns.sleep(5);
		valids = testthese(ns, newtests);
	}
	return valids;
}

function removeone(s) {
	var tests = [];
	for (var i = 0; i < s.length; i++) {
		// Only remove parenthesis
		if (s[i] !== '(' && s[i] !== ')') {
			continue;
		}
		tests.push(s.substring(0, i) + s.substring(i+1, s.length));
	}
	return tests;
}

function isvalid(s) {
	var balance = 0;
	for (var i = 0; i < s.length; i++) {
		var char = s[i];
		if (char === '(') {
			balance++;
		} else if (char === ')') {
			balance--;
			if (balance < 0)
				break;
		} else {
			// not a parenthesis
		}
	}
	return balance == 0;
}