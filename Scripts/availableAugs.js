// Show the augmentations available for each joined faction
// By default it only shows those yet to be purchased
/** @param {NS} ns **/
export async function main(ns) {
	var includePurchased = false;
	if (ns.args.length === 1 && ns.args[0] === 1) {
		includePurchased = true;
	}
	var factions = ns.getPlayer().factions;
	var installedAugs = ns.getOwnedAugmentations(includePurchased);
	for (let faction of factions) {
		ns.tprint(faction);
		var availableAugs = ns.getAugmentationsFromFaction(faction);
		for (let aug of availableAugs) {
			if (installedAugs.indexOf(aug) > -1) {
				if (includePurchased) {
					ns.tprint(" ☑ " + aug);
				}
			} else {
				ns.tprint(" ☐ " + aug);
			}
		}

	}
}