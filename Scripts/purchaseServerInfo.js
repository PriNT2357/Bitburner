/** @param {NS} ns **/
export async function main(ns) {
	// Display the server levels which can be purchased
	var ram = ns.getPurchasedServerMaxRam();
	var currentmoney = ns.getPlayer().money;

	ns.tprintf("Current Money (millions): $%.0f", currentmoney/1000000);
	ns.tprintf(" (%11s) %13s %s", "Ram    ", "Cost (m)", "Can buy");
	while (ram >= 2) {
		var cost = ns.getPurchasedServerCost(ram);
		var canbuy = cost < currentmoney ? '☑   ' : '☐   ';
		cost = cost/1000000;
		ns.tprintf(" (%8d GB) $%12.2f %7s", ram, cost, canbuy);
		ram = ram / 2;
	}
}