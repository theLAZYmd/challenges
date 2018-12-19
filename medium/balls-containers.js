'use strict';

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

Object.compare = function (obj1, obj2) {
    for (let [k, v] of Object.entries(obj1)) {
        if (obj2[k] === undefined || obj2[k] === null) return false;
        if (obj2[k].toString() !== v.toString()) return false;
    }
    for (let [k, v] of Object.entries(obj2)) {
        if (obj1[k] === undefined || obj1[k] === null) return false;
        if (obj1[k].toString() !== v.toString()) return false;
    }
    return true;
}

// Complete the organizingContainers function below.
class Container {

    constructor(containers) { //  [ [ 0, 2 ], [ 1, 1 ] ]
        this.containers = containers;
        //console.log(this.containerCapacities);
        //console.log(this.ballDistribution);
    }

    get containerLengths () {
        if (this._lengths) return this._lengths;
        return this._lengths = this.containers.map(c => c.length);
    }

    get containerCapacities () {
        if (this._capacities) return this._capacities;
        return this._capacities = this.containerLengths.reduce((acc, curr) => {
            if (!acc[curr]) acc[curr] = 1;
            else acc[curr]++;
            return acc;
        }, {});
    }

    get ballTypes () {
        if (this._types) return this._types;
        return this._types = this.containers.reduce((acc, array) => {
            for (let curr of array) {
                if (!acc[curr]) acc[curr] = 1;
                else acc[curr]++;
            }
            return acc;
        }, [])
    }

    get ballDistribution () {
        if (this._distribution) return this._distribution;
        return this._distribution = this.ballTypes.reduce((acc, curr) => {
            if (!acc[curr]) acc[curr] = 1;
            else acc[curr]++;
            return acc;
        }, {});
    }

    set ballDistribution (distribution) {
        this._distribution = distribution;
    }

    evaluate() {
        let bd = this.ballDistribution;
        whileLoop:
        while (!Object.compare(this.containerCapacities, bd)) {
            for (let [k, v] of Object.entries(bd)) {
                for (let x of Object.keys(this.containerCapacities)) {
                    if (k !== x && k % x === 0) {
                        delete bd[k];
                        bd[x] = v * x;
                        this.ballDistribution = bd;
                        continue whileLoop;
                    }
                }
            }
            return false;
        }
        return true;
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) { //for each query
        const n = parseInt(readLine(), 10);

        let containers = Array(n);

        for (let i = 0; i < n; i++) {
            containers[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        let map = new Map().set(true, 'Possible').set(false, 'Impossible');
        let organised = new Container(containers);
        let result = map.get(organised.evaluate());
        console.log(result);
        ws.write(result + "\n");
    }

    ws.end();
}
/*
process.stdin.emit('data', `2
3
1 3 1
2 1 2
3 3 3
3
0 2 1
1 1 1
2 0 0`);
process.stdin.emit('end');
*/