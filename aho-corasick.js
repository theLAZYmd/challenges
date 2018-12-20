class Aho_Corasick {
    
    constructor(substrings) {
        this.build(substrings);
        console.log(this);
    };

    build(substrings) {
        let dict = {
            0: {}
        };
        let output = {};
        let state = 0;
        for (let word of substrings) {
            let index = 0;
            for (let char of word) {  //dict: {0: {a: 1}}
                if (dict[index] && dict[index][char]) index = dict[index][char];
                else {
                    state++;
                    dict[index][char] = state; //dict: {0: {a: 1}, 1: {}}
                    dict[state] = {};
                    index = state; //1
                    output[index] = []; // output: {1: []}
                }
            }
            output[index].push(word);
        }

        let failure = {};
        let xs = [];

        // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
        for (let word of Object.keys(dict[0])) {
            let state = dict[0][word];
            failure[state] = 0;
            xs.push(state);
        }

        while (xs.length) {
            let r = xs.shift();
            // for each symbol a such that g(r, a) = s
            for (let word of Object.keys(dict[r])) {
                let s = dict[r][word];
                xs.push(s);

                // set state = f(r)
                state = failure[r];
                while(state > 0 && !(word in dict[state])) {
                    state = failure[state];
                }
                if (word in dict[state]) {
                    let fs = dict[state][word];
                    failure[s] = fs;
                    output[s] = output[s].concat(output[fs]);
                }
                else failure[s] = 0;
            }
        }
        this.dict = dict;
        this.output = output;
        this.failure = failure;
    }

    search (string) {
        let state = 0;
        let results = [];
        for (let i = 0; i < string.length; i++) {
            let char = string[i];
            while (state > 0 && !(char in this.dict[state])) {
                state = this.failure[state];
            }
            if (!(char in this.dict[state])) continue;
            state = this.dict[state][char];
            if (this.output[state].length) {
                let foundStrs = this.output[state];
                results.push([i, foundStrs]);
            }
        }
        return results;
    }

}

module.exports = Aho_Corasick;