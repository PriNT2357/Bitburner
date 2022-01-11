// Show the augmentations available for each joined faction
// By default it only shows those yet to be purchased
/** @param {NS} ns **/
export async function main(ns) {
	var includePurchased = false;
	if (ns.args.length === 1 && ns.args[0] === 1) {
		includePurchased = true;
	}
	var factions = ns.getPlayer().factions;
	var installedAugs = ns.getOwnedAugmentations(true);
	for (let faction of factions) {
		var rep = ns.getFactionRep(faction);
		ns.tprintf("%s - (%s rep)", faction, formatNumber(rep));
		var availableAugs = ns.getAugmentationsFromFaction(faction);
		for (let aug of availableAugs) {
			var price = ns.getAugmentationPrice(aug);
			var repreq = ns.getAugmentationRepReq(aug);
			var output = "   %3s %-42s %7s %7s";
			var haveit = false;
			if (installedAugs.indexOf(aug) > -1) {
				haveit = true;
			}

			if (haveit) {
				if (includePurchased) {
					ns.tprintf(output, (haveit ? " ☑ " : " ☐ "), aug, formatNumber(price), formatNumber(repreq));
				}
			} else {
				ns.tprintf(output, (haveit ? " ☑ " : " ☐ "), aug, formatNumber(price), formatNumber(repreq));
			}
		}

	}
}

function formatNumber(n) {
	const div = 1000;
	var m = n * div; // account for first run of do{}
	var labels = ["", "k", "m", "b", "t"];
	var label = "";
	do {
		m = Number(m / div).toFixed(1); //convert to closest label
		label = labels.shift();
	} while (m >= div && labels.length !== 0)

	return m + label;
}