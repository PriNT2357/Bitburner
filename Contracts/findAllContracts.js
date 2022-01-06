// Find all contracts and run any associated solver

/** @param {NS} ns **/
export async function main(ns) {

	ns.tail();
	ns.disableLog("scan");
	var hackedservers = getHackedServers(ns);

	var allcontracts = getcontracts(ns, hackedservers);

	for (let contract of allcontracts) {
		if (contract.type === "Find Largest Prime Factor") { }
		else if (contract.type === "Subarray with Maximum Sum") { }
		else if (contract.type === "Total Ways to Sum") { }
		else if (contract.type === "Spiralize Matrix") { }
		else if (contract.type === "Array Jumping Game") {
			// this doesn't work yet. problem description isn't understood
			// ns.print("%15s %30s  - Processing/Submitting ", contract.server, contract.file);
			// ns.run("/contracts/arrayJumping.js", 1, contract.server, contract.file);
		}
		else if (contract.type === "Merge Overlapping Intervals") { }
		else if (contract.type === "Generate IP Addresses") { }
		else if (contract.type === "Algorithmic Stock Trader I") {
			ns.print("%15s %30s  - Processing/Submitting ", contract.server, contract.file);
			ns.run("/contracts/stocksI.js", 1, contract.server, contract.file);
		}
		else if (contract.type === "Algorithmic Stock Trader II") { }
		else if (contract.type === "Algorithmic Stock Trader III") { }
		else if (contract.type === "Algorithmic Stock Trader IV") { }
		else if (contract.type === "Minimum Path Sum in a Triangle") { }
		else if (contract.type === "Unique Paths in a Grid I") {
			ns.print("%15s %30s  - Processing/Submitting ", contract.server, contract.file);
			ns.run("/contracts/uniquePathsI.js", 1, contract.server, contract.file);
		}
		else if (contract.type === "Unique Paths in a Grid II") {
			ns.print("%15s %30s  - Processing/Submitting ", contract.server, contract.file);
			ns.run("/contracts/uniquePathsII.js", 1, contract.server, contract.file);
		}
		else if (contract.type === "Sanitize Parentheses in Expression") {
			// does not work for long strings - have hard coded it for a max length
			ns.run("/contracts/sanitize.js", 1, contract.server, contract.file);
		}
		else if (contract.type === "Find All Valid Math Expressions") { }
		else { ns.print("Unknown contract type"); }
	}

}

/** @param {NS} ns **/
function getcontracts(ns, targets) {
	// var targets = ns.args;
	var allcontracts = [];
	ns.print(ns.sprintf("%-15s %-40s %5s %20s %-20s", "Server", "Type", "Tries", "Data", "Contract"));
	for (let target of targets) {
		var files = ns.ls(target, "cct");
		for (let contract of files) {
			var type = ns.codingcontract.getContractType(contract, target);
			var tries = ns.codingcontract.getNumTriesRemaining(contract, target);
			var data = ns.codingcontract.getData(contract, target);
			allcontracts.push({ "server": target, "type": type, "data": data, "file": contract });
			ns.print(ns.sprintf("%-15s %-40s %5d %20s %-20s", target, type, tries, "", contract));
		}
	}
	return allcontracts;
}

/** @param {NS} ns **/
function getHackedServers(ns) {
	var target = "home";
	var scanned = [];
	var toscan = [target];
	var hacked = [];

	while (toscan.length > 0) {
		target = toscan.shift();
		var connected = ns.scan(target);
		scanned.push(target);
		// ns.tprint(target + " --> " + connected);
		for (var i = 0; i < connected.length; i++) {
			if (scanned.indexOf(connected[i]) > -1) {
				// ns.tprint("already scanned " + target);
				continue;
			}
			else {
				var haveRoot = ns.hasRootAccess(connected[i]);
				if (haveRoot) {
					toscan.push(connected[i]);
					hacked.push(connected[i]);
				}
			}
		}
	}
	return hacked;
}