/** @param {NS} ns **/
export async function main(ns) {
	var target = "";
	if (ns.args.length === 0) {
		target = "home";
	}
	else {
		target = ns.args[0];
	}

	var scanned = [];
	var toscan = [target];
	var tohack = [];
	var myLvl = ns.getHackingLevel();
	var portsOpenable = 0;
	if (ns.fileExists("BruteSSH.exe", "home")) {
		portsOpenable++;
	}
	if (ns.fileExists("FTPCrack.exe", "home")) {
		portsOpenable++;
	}
	if (ns.fileExists("relaySMTP.exe", "home")) {
		portsOpenable++;
	}
	if (ns.fileExists("HTTPWorm.exe", "home")) {
		portsOpenable++;
	}
	if (ns.fileExists("SQLInject.exe", "home")) {
		portsOpenable++;
	}

	while (toscan.length > 0) {
		target = toscan.shift();
		var connected = ns.scan(target);
		scanned.push(target);
		ns.tprint(target + " --> " + connected);
		for (var i = 0; i < connected.length; i++) {
			if (scanned.indexOf(connected[i]) > -1) {
				// ns.tprint("already scanned " + target);
				continue;
			}
			else {
				// ns.tprint("have yet to scan " + target);
				var reqLvl = ns.getServerRequiredHackingLevel(connected[i]);
				var haveRoot = ns.hasRootAccess(connected[i]);
				var reqPorts = ns.getServerNumPortsRequired(connected[i]);
				if (myLvl >= reqLvl) {
					toscan.push(connected[i]);
					if (!haveRoot && portsOpenable >= reqPorts) {
						tohack.push(connected[i]);
					}
				} else {
					// ns.tprint("hacking level not high enough (" +myLvl+"/"+reqLvl+")");
					// do not scan this target for additional targets
				}

			}
		}
		// ns.tprint("To Scan: " + toscan);
	}

	ns.tprint("Scanned: " + scanned.join(' '));
	ns.tprint("To Hack: " + tohack.join(' '));

}