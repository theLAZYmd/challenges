// https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem

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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    let verifier = {};
    scores = scores.reduce((acc, curr) => {
        if (verifier[curr]) return acc;
        verifier[curr] = true;
        acc.push(curr);
        return acc;
    }, [])
    let result = [];
    let i = 0;
    for (let i = 0; i < scores.length; i++) {
        if (alice[alice.length - 1] >= scores[i]) {
            result.unshift(i + 1);
            alice.pop();
            i--;
        }
    }
    for (let _ of alice) {
        result.unshift(scores.length + 1);
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
