/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	while(true) {
		ns.run("/simple/deploy.js");
		await ns.sleep(60000);
	}
}