/** @param {NS} ns **/
export async function main(ns) {
	var source = "home";
	var files = ["/public/monitor.js"];
	files = addfolder(ns, source, "/simple/", files);
	files = addfolder(ns, source, "/dynamic/", files);
	for (let dest of ns.args) {
		//var dest = ns.args[0];
		// ns.tprint("xfer: " + files);
		await ns.scp(files, source, dest);
	}
	
}
function addfolder(ns, source, folder, files) {
	var otherfiles = ns.ls(source, folder);
	files = files.concat(otherfiles);
	return files;
}