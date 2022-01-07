/** @param {NS} ns **/
export async function main(ns) {
	const servers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];
	var installs = 0;
	do {
		for (let server of servers) {
			ns.print("Checking for backdoor on " + server);
			var installed = ns.getServer(server).backdoorInstalled;
			if (!installed) {
				ns.print("Installing backdoor on " + server);
				ns.killall(server);
				await ns.sleep(3000);
				var ran = ns.exec("/simple/installBackdoor.js", server);
				if (ran !== 0) {
					installs++;
				}
			} else {
				installs++;
			}
		}
		await ns.sleep(60000);
	} while (installs < servers.length)
}