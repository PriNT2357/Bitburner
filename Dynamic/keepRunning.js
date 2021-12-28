/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	while(true) {
		ns.run("/dynamic/growAll.js", 1);
		await ns.sleep(3000);
		ns.run("/dynamic/weakenAll.js", 1);
		await ns.sleep(2000);
		ns.run("/dynamic/hackAll.js", 1);
		await ns.sleep(1000);
	}
}