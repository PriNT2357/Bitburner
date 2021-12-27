// Display information on all servers that have been hacked

/** @param {NS} ns **/
export async function main(ns) {
	const updateInterval = 5000;

	ns.tail();
	ns.disableLog('ALL');
	while (true) {
		ns.clearLog();
		ns.print(ns.sprintf("%-20s: %18s %5s %5s %6s %6s %6s", "Server Name", "Mem Free", "$ (%)", "Sec", "Hack", "Grow", "Weaken"));
		var hacked = getHackedServers(ns);
		var servers = [];
		for (let s of hacked) {
			servers.push(getServerStats(ns, s));
		}

		for (let server of servers) {
			var mem = formatMemory(server.memorymax - server.memoryused) + " / " + formatMemory(server.memorymax);
			var money = (server.moneymax == 0 ? Number(-1).toFixed(2) : (server.money / server.moneymax * 100).toFixed(2));
			var sec = (server.security - server.securitymin).toFixed(2);
			var t_h = server.t_hack;
			var t_g = server.t_grow;
			var t_w = server.t_weaken;
			ns.print(ns.sprintf("%-20s: %18s %5d %5d %6d %6d %6d", server.name, mem, money, sec, t_h, t_g, t_w));
		}
		await ns.sleep(updateInterval);
	}

}


// pass in GB and get appropriate TB/PB conversion
function formatMemory(memory) {
	const div = 1000;
	var m = memory * div; // account for first run of do{}
	var labels = ["GB", "TB","PB"];
	var label = "";
	do {
		m = Number(m / div).toFixed(1); //convert to closest GB/TB/PB
		label = labels.shift();
	} while (m >= div && labels.length !== 0)

	return m + label;
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


/** @param {NS} ns
 ** @param {target} string **/
function getServerStats(ns, target) {
	var template = { name: "", money: 0, moneymax: 0, memoryused: 0, memorymax: 0, security: 0, securitymin: 0, t_hack: 0, t_grow: 0, t_weaken: 0 };

	template.name = target;
	template.money = ns.getServerMoneyAvailable(target);
	template.moneymax = ns.getServerMaxMoney(target);
	template.memoryused = ns.getServerUsedRam(target);
	template.memorymax = ns.getServerMaxRam(target);
	template.security = ns.getServerSecurityLevel(target);
	template.securitymin = ns.getServerMinSecurityLevel(target);
	// Pulled and modified formulas from https://github.com/bitburner-official/bitburner-scripts/blob/master/monitor.js
	if (template.moneymax > 0) {
		template.t_grow = Math.ceil(ns.growthAnalyze(target, template.moneymax / (template.money<1?1:template.money)));
	}
	if (template.money > 0) {
		template.t_hack = Math.ceil(ns.hackAnalyzeThreads(target, template.money));
	}
	template.t_weaken = Math.ceil((template.security - template.securitymin) * 20);

	return template;
}