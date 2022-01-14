/** @param {NS} ns **/
export async function main(ns) {
	const servers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "The-Cave"];
	var installs = 0;
	do {
		for (let server of servers) {
			if (!ns.hasRootAccess(server)) {
				ns.print("Still need root access on " + server);
				continue;
			}
			ns.print("Checking for backdoor on " + server);
			var installed = ns.getServer(server).backdoorInstalled;
			if (!installed) {
				//connect first since it runs in terminal
				ns.run("/public/findit.js", 1, server, 1);
				ns.print("Installing backdoor on " + server);
				ns.killall(server);
				await ns.sleep(5000);
				var ran = ns.exec("/simple/installBackdoor.js", server);
				if (ran !== 0) {
					ns.print("/simple/installBackdoor.js ran successfully " );
					installs++;
				}
			} else {
				installs++;
				ns.print("Already installed");
			}
		}
		await ns.sleep(60000);
	} while (installs < servers.length)
}