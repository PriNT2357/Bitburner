/** @param {NS} ns **/
export async function main(ns) {
	// purchase tools
	ns.purchaseTor();
	const programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
	var progs = 0;
	var firstLoop = true;
	while (progs < programs.length) {
		progs = 0;
		if (firstLoop) {
			firstLoop = false;
			ns.run("/simple/deployLoop.js");
			ns.run("/simple/installBackdoors.js");
			ns.run("/simple/buyServers.js");
		}
		for (let prog of programs) {
			if (!ns.fileExists(prog, "home")) {
				ns.purchaseProgram(prog);
				if (!ns.getPlayer().isWorking) {
					ns.createProgram(prog);
				}
			} else {
				progs++;
			}
		}

		await ns.sleep(60000);
	}
}