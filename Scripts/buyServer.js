Attempt to purchase a server

/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 2 || typeof ns.args[0] !== "string" || typeof ns.args[1] !== "number") {
		ns.tprint("Usage: >run buyserver.js _hostname_ _ram_");
		ns.exit;
	}

	var hostname = ns.args[0];
	var ram = ns.args[1];
	hostname = ns.purchaseServer(hostname, ram);
	if (hostname === "") {
		ns.tprint("Unable to purchase server");
	} else {
		ns.tprint("Purchased new server " + hostname + " with " + ram + "GB memory");
	}
}