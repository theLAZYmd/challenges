//https://www.hackerrank.com/challenges/non-divisible-subset/problem

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

// Complete the nonDivisibleSubset function below.
function nonDivisibleSubset(k, S) {
    let mod = S.reduce((acc, curr) => {
        if (!acc[curr % k]) acc[curr % k] = 1;
        else acc[curr % k]++;
        return acc;
    }, []);
    let sum = Math.min(mod[0] || 0, 1);
    if (k % 2 === 0) sum += Math.min(mod[k / 2] || 0, 1);
    for (let i = 1; i < k / 2; i++) {
        sum += Math.max(mod[i] || 0, mod[k - i] || 0);
    }
    return sum;
}

console.log(nonDivisibleSubset(50, JSON.parse(fs.readFileSync("./data/set.json").toString())));

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const S = readLine().split(' ').map(STemp => parseInt(STemp, 10));

    let result = nonDivisibleSubset(k, S);

    ws.write(result + "\n");

    ws.end();
}
