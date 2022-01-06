/** @param {NS} ns **/
export async function main(ns) {

	// Create server hosts ser, ser-0, ser-1, ...
	var hostnameprefix = "ser";
	var ram = ns.getPurchasedServerMaxRam();
	var servermax = ns.getPurchasedServerLimit();

	// Allow setting a custom ram amount
	if (ns.args.length > 0 && Number.isInteger(ns.args[0])) {
		ram = ns.args[0];
	}
	while (true) {
		var currentservers = ns.getPurchasedServers();
		if (currentservers.length >= servermax) {
			ns.exit();
		}
		var money = ns.getPlayer().money;
		var cost = ns.getPurchasedServerCost(ram);
		if (money < cost) {
			await ns.sleep(60000);
		}
		else {
			ns.run("/simple/buyServer.js", 1, hostnameprefix, ram);
		}
		await ns.sleep(1000);
	}
}