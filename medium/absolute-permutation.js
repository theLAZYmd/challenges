//  https://www.hackerrank.com/challenges/absolute-permutation/problem

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}
// Complete the absolutePermutation function below.
class absolutePermutation {
    
    constructor () {
        this.perms = [];
    }

    newPerm(n) {
        if (this.perms[n]) return this.perms[n];
        else return this.perms[n] = [];
    }

    findSmallest(n, k) {

    }
    
    static getNextCombination = function () {
        let i, j;
        for (i = this.length - 1; i > 0; i--) { //start from the right and find the first digit that has a digit smaller than it
            if (this[i] > this[i - 1]) break;
        }
        if (i === 0) return this;
        i--;
        for (j = this.length - 1; j > i; j--) { //start from the right and find the first digit larger than the digit to be swapped
            if (this[j] > this[i]) break;
        }
        let swapped = this.slice(0).swap(i, j); //swap those digits
        j++;
        let arr1 = swapped.slice(0, i + 1);
        let arr2 = swapped.slice(i + 1).sort((a, b) => a - b);
        return arr1.concat(...arr2); //and sort all those digits following the swapped digit
    }

    static permutations(n, r) {
        if (n - r > r) r = n - r;
        let result = n;
        for (let i = 1; i < r; i++) {
            result = result * (n - i);
        }
        return result;
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    let AP = new absolutePermutation();

    for (let tItr = 0; tItr < t; tItr++) {
        const nk = readLine().split(' ');
        const n = parseInt(nk[0], 10);
        const k = parseInt(nk[1], 10);
        AP.newPerm(n);
        let result = AP.findSmallest(n, k);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
