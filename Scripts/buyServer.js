/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 2 || typeof ns.args[0] !== "string" || typeof ns.args[1] !== "number") {
		ns.tprint("Usage: > run buyserver.js HOSTNAME RAM");
		ns.exit;
	}

	var hostname = ns.args[0];
	var ram = ns.args[1];
	hostname = ns.purchaseServer(hostname, ram);
	if (hostname === "") {
		ns.tprint("Unable to purchase server");
	} else {
		ns.tprint("Purchased new server " + hostname + " with " + ram + "GB memory");
		// Allow time for the hostname to populate through dns (wait for the game to set it up)
		await ns.sleep(1500);
		ns.run("/simple/xfer.js", 1, hostname);
		// This will trigger the dynamic scripts to start running
		var pid = ns.exec("/dynamic/keeprunning.js", hostname, 1);
		if (pid === 0) {
			ns.tprint("Unable to execute the keeprunning script on " + hostname);
		}
	}
}