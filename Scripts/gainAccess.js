/** @param {NS} ns **/
export async function main(ns) {

	if (ns.args.length === 0) {
		ns.tprint("Usage: >run gainaccess.js TARGET [TARGET2...]");
		ns.tprint("Need to specify a target");
		ns.exit;
	}

	var targets = ns.args;
	for (let target of targets) {
		ns.tprint("Testing " + target);
		var portsReq = ns.getServerNumPortsRequired(target);
		var portsOpen = 0;
		// build list of ports that can be opened
		if (ns.fileExists("BruteSSH.exe", "home")) {
			ns.brutessh(target);
			portsOpen++;
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			ns.ftpcrack(target);
			portsOpen++;
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			ns.relaysmtp(target);
			portsOpen++;
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			ns.httpworm(target);
			portsOpen++;
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			ns.sqlinject(target);
			portsOpen++;
		}

		var canNuke = true;
		var hackingLevel = ns.getServerRequiredHackingLevel;
		var reqHackingLevel = ns.getHackingLevel;
		if (hackingLevel < reqHackingLevel) {
			canNuke = false;
			ns.tprint("Hacking level too low: " + hackingLevel + "/" + reqHackingLevel)
		} else if (portsOpen < portsReq) {
			canNuke = false;
			ns.tprint("Not enough ports open: " + portsOpen + "/" + portsReq)
		}

		if (canNuke) {
			ns.nuke(target);
			ns.tprint("-- We're in! --");
		} else {
			ns.tprint("-- Unable to nuke --");
		}
	}
}