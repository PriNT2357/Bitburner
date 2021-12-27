/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 3) {
		ns.tprint("Submits an answer to a contract on a given server");
		ns.tprint("Usage: > run submit.js SERVER CONTRACT RESULT");
		ns.exit();
	}

	var server = ns.args[0];
	var contract = ns.args[1];
	var answer = ns.args[2];
	ns.tprint("Server: " + server);
	ns.tprint("Contract: " + contract);
	ns.tprint("Answer: ");
	ns.tprint(answer);
	var submit = await ns.prompt("Do you wish to submit the answer?");
	if (submit) {
		var wasvalid = ns.codingcontract.attempt(answer, contract, server, true);
		if (wasvalid === "") {
			ns.tprint("Answer is incorrect");
		} else {
			ns.tprint(wasvalid);
		}
	}
	else {
		ns.tprint("Cancelled");
	}
}