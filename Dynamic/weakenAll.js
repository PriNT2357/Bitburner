/** @param {NS} ns **/
export async function main(ns) {
	var delaybetweenruns = 10; //seconds
	var overprovisioning = 0.9; //allocate x% more threads
	var weakenscriptpath = "/dynamic/weaken.js";
	var runon = ns.getHostname();

	var servers = getHackedServers(ns);
	for (let server of servers) {
		var runit = true;
		// Need to have a reason to weaken server
		var moneymax = ns.getServerMaxMoney(server);
		if (moneymax <= 0) {
			runit = false;
		}
		// Do not weaken if already doing so (can't run multiple instances)
		var activeprocesses = ns.ps(runon);
		for (let proc of activeprocesses) {
			if (proc.args[0] === server && proc.filename == ns.getScriptName()) {
				runit = false;
				break;
			}
		}

		var security = ns.getServerSecurityLevel(server);
		var securitymin = ns.getServerMinSecurityLevel(server);
		var t_weaken = Math.ceil((security - securitymin) * 20 * overprovisioning);
		var m_weaken = ns.getScriptRam(weakenscriptpath);
		var memorymax = ns.getServerMaxRam(runon) - ns.getServerUsedRam(runon);
		while (m_weaken * t_weaken > memorymax) {
			t_weaken = Math.floor(memorymax / m_weaken);
		}
		if (t_weaken < 1) {
			runit = false;
		}

		if (!runit) {
			continue;
		}
		// run on the current machine (less memory)
		ns.run(weakenscriptpath, t_weaken, server);
		// run on the specified machine (more expensive)
		// ns.exec(weakenscriptpath, runon, t_weaken, server);

		await ns.sleep(1000);
	}
	await ns.sleep(delaybetweenruns * 1000);
	ns.spawn("/dynamic/weakenall.js");
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