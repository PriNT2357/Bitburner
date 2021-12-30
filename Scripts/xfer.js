/** @param {NS} ns **/
export async function main(ns) {
	var dest = ns.args[0];
	var files = ["/simple/hackit.js", "/simple/weaken.js", "/simple/growit.js"];
	var source = "home";
	files = files.concat(ns.ls(source, "/dynamic/"));
	files = files.concat(ns.ls(source, "/public/"));
	await ns.scp(files, source, dest);
}