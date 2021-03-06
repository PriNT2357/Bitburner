/**
* Find Largest Prime Factor
* Given a number, find its largest prime factor. A prime factor
* is a factor that is a prime number.
**/

// https://stackoverflow.com/a/15471749
var eratosthenes = function(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }
    
    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
}
/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length !== 1) {
		ns.tprint("Requires one number as an argument");
		ns.tprint("Example useage: primeFactors.js 82589933");
		return;
	}
	var test = ns.args[0];
	var primefactor = 0;
	var primes = eratosthenes(test);

    //check if primes are factors of test
    for (var i = primes.length-1; i >= 0; i--) {
        if (primes[i] > test / 2) {
            continue;
        }
        if(test % primes[i] === 0) {
            primefactor = primes[i];
            break;
        }
    }

	ns.tprint("Largest Prime Factor of " + test + " is " + primefactor);
}