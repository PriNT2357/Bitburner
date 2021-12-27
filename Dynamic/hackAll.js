/** @param {NS} ns **/
export async function main(ns) {
	var delaybetweenruns = 10; //seconds
	var overprovisioning = 0.5; //allocate x% more threads
	var scriptpath = "/dynamic/hack.js";
	var runon = ns.getHostname();
	ns.disableLog("ALL");

	var servers = getHackedServers(ns);
	// Shuffle so that we don't always attempt the same server first every time
	servers = shufflearray(servers);
	for (let server of servers) {
		var runit = true;
		// Need to have a reason to run on server
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

		// Begin custom script logic
		var money = ns.getServerMoneyAvailable(server);
		if (money <= 0) {
			runit = false;
		}
		// reduce money value to try and prevent NaN from being returned
		var threads = Math.ceil(ns.hackAnalyzeThreads(server, money * .9) * overprovisioning);
		// End custom script logic

		if (threads === NaN || typeof threads === undefined || threads === Infinity) {
			threads = 10;// set some default to prevent crashes
			runit = false;
		}
		var s_memory = ns.getScriptRam(scriptpath);
		var memorymax = ns.getServerMaxRam(runon) - ns.getServerUsedRam(runon);
		while (s_memory * threads > memorymax) {
			threads = Math.floor(memorymax / s_memory);
		}
		if (threads < 1) {
			runit = false;
		}

		if (!runit) {
			continue;
		}
		// run on the current machine (less memory)
		ns.run(scriptpath, threads, server);
		// run on the specified machine (more expensive)
		// ns.exec(scriptpath, runon, threads, server);

		await ns.sleep(1000);
	}
	await ns.sleep(delaybetweenruns * 1000);
	ns.spawn(ns.getScriptName());
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

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shufflearray(unshuffled) {
	let shuffled = unshuffled
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
	return shuffled;
}