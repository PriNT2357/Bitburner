/** @param {NS} ns **/
export async function main(ns) {
	var delaybetweenruns = 10; //seconds
	var overprovisioning = 0.5; //allocate x% more threads
	var scriptpath = "/dynamic/hack.js";
	var runon = ns.getHostname();
	ns.disableLog("ALL");

	var servers = getHackedServers(ns);
	for (let server of servers) {
		var runit = true;
		// Need to have a reason to run on server
		var moneymax = ns.getServerMaxMoney(server);
		if (moneymax <= 0) {
			runit = false;
		}
		var money = ns.getServerMoneyAvailable(server);
		if (money <= 0) {
			runit = false;
		}
		// Do not run if already doing so (can't run multiple instances)
		var activeprocesses = ns.ps(runon);
		for (let proc of activeprocesses) {
			if (proc.args[0] === server && proc.filename == ns.getScriptName()) {
				runit = false;
				break;
			}
		}

		// reduce money value to try and prevent NaN from being returned
		var t_hack = Math.ceil(ns.hackAnalyzeThreads(server, money * .9) * overprovisioning);
		if (t_hack === NaN || typeof t_hack === undefined || t_hack === Infinity) {
			ns.print("*** t_hack is invalid ***");
			t_hack = 10;// set some default to prevent crashes
			runit = false;
		}
		var m_hack = ns.getScriptRam(scriptpath);
		var memorymax = ns.getServerMaxRam(runon) - ns.getServerUsedRam(runon);
		while (m_hack * t_hack > memorymax) {
			t_hack = Math.floor(memorymax / m_hack);
		}
		if (t_hack < 1) {
			runit = false;
		}

		if (!runit) {
			continue;
		}
		// run on the current machine (less memory)
		ns.run(scriptpath, t_hack, server);
		// run on the specified machine (more expensive)
		// ns.exec(scriptpath, runon, t_hack, server);

		await ns.sleep(1000);
	}
	await ns.sleep(delaybetweenruns * 1000);
	ns.spawn("/dynamic/hackall.js");
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