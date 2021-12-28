/** @param {NS} ns **/
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("ALL");
	// Gain access to all hackable servers
	// will also transfer files via /simple/xfer.js
	ns.print("Attempting to hack all servers...");
	ns.run("/simple/hackall.js", 1);
	await ns.sleep(1000);
	// Get ready to run this on each hacked machine with enough threads and money
	var targets = getHackedServers(ns);
	ns.print("Done. Now processing hacked servers...");
	var mem = ns.getScriptRam("/simple/hackit.js");
	for (let target of targets) {
		ns.print("Deploying files to " + target);
		ns.exec("/simple/xfer.js", "home", 1, target);
		await ns.sleep(500);
		var maxmem = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);
		var threads = Math.floor(maxmem / mem);
		var moneymax = ns.getServerMaxMoney(target);

		if (threads > 0 && moneymax > 0) {
			// run the hackit script on itself if it has money
			ns.print("Starting '/simple/hackit.js' on target server");
			ns.exec("/simple/hackit.js", target, threads, target);
		}
		else {
			// ns.print("Unable to autorun hackit.js on " + target);
		}
	}
}

/** @param {NS} ns **/
function getHackedServers(ns) {
	var target = "home";
	var scanned = [];
	var toscan = [target];
	var hacked = [target];

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