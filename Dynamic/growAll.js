/** @param {NS} ns **/
export async function main(ns) {
	var delaybetweenruns = 10; //seconds
	var overprovisioning = 0.5; //allocate x% more threads
	var growscriptpath = "/dynamic/grow.js";
	var runon = ns.getHostname();

	var servers = getHackedServers(ns);
	for (let server of servers) {
		var runit = true;
		// Need to have a reason to run on the server
		var moneymax = ns.getServerMaxMoney(server);
		if (moneymax <= 0) {
			continue;
		}
		// Do not run if already doing so (can't run multiple instances)
		var activeprocesses = ns.ps(runon);
		for (let proc of activeprocesses) {
			if (proc.args[0] === server && proc.filename == ns.getScriptName()) {
				runit = false;
				break;
			}
		}


		var money = ns.getServerMoneyAvailable(server);
		//ns.print("Server:" + server + " $" + money + "/" + moneymax);
		var t_grow = Math.ceil(ns.growthAnalyze(server, moneymax / (money < 1 ? 1 : money)) * overprovisioning);
		var memorymax = ns.getServerMaxRam(runon) - ns.getServerUsedRam(runon);
		var m_grow = ns.getScriptRam(growscriptpath);
		while (m_grow * t_grow > memorymax) {
			t_grow = Math.floor(memorymax / m_grow);
		}
		if (t_grow < 1) {
			runit = false;
		}

		if (!runit) {
			continue;
		}
		// run on the current machine (less memory)
		ns.run(growscriptpath, t_grow, server);
		// run on the specified machine (more expensive)
		// ns.exec(growscriptpath, runon, t_grow, server);

		await ns.sleep(1000);
	}
	await ns.sleep(delaybetweenruns * 1000);
	ns.spawn("/dynamic/growall.js");
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