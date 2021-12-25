/** @param {NS} ns **/
export async function main(ns) {
	var targets = ns.args;
	
	ns.tprintf("%-15s %-40s %5s %20s %-20s", "Server", "Type", "Tries", "Data", "Contract");
	for (let target of targets) {
		var files = ns.ls(target,"cct");
		for (let contract of files) {
			var type = ns.codingcontract.getContractType(contract,target);
			var tries = ns.codingcontract.getNumTriesRemaining(contract, target);
			var data = ns.codingcontract.getData(contract, target);
			ns.tprintf("%-15s %-40s %5d %20s %-20s", target, type, tries, data, contract);
		}
	}
}