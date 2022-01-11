//https://github.com/bitburner-official/bitburner-scripts/blob/master/find_server.js
/** @param {NS} ns **/
function recursiveScan(ns, parent, server, target, route) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        if (child == target) {
            route.unshift(child);
            route.unshift(server);
            return true;
        }

        if (recursiveScan(ns, server, child, target, route)) {
            route.unshift(server);
            return true;
        }
    }
    return false;
}

export async function main(ns) {
    const args = ns.flags([["help", false]]);
    let route = [];
    let server = args._[0];
    let autoconnect = false; // Requires source file 4-1 obtained later in game
    if (args._.length === 2 && args._[1] === 1) {
        autoconnect = true;
    }
    if (!server || args.help) {
        ns.tprint("This script helps you find a server on the network and shows you the path to get to it.");
        ns.tprint(`Usage: run ${ns.getScriptName()} SERVER [AUTOCONNECT]`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        ns.tprint(`> run ${ns.getScriptName()} n00dles 1`);
        return;
    }

    recursiveScan(ns, '', 'home', server, route);
    for (const i in route) {
        await ns.sleep(500);
        const extra = i > 0 ? "└ " : "";
        ns.tprint(`${" ".repeat(i)}${extra}${route[i]}`);
        if (autoconnect) {
            await ns.connect(route[i]);
        }
    }
}

export function autocomplete(data, args) {
    return data.servers;
}