class LAZYac {
    
    constructor(substrings, options = {}) {
        this.build(substrings, options);
    };

    build(substrings, options) { //Build a tree out of the substrings. Only needs to be done once for a given set of substrings
        let dict = {
            0: {}
        };
        let allowDuplicates = typeof options.allowDuplicates !== "undefined" ? options.allowDuplicates : true;
        let output = {};
        let state = 0;
        for (let word of substrings) {
            let index = 0;
            for (let char of word) {                                   //dict: {0: {a: 1}}
                if (dict[index] && dict[index][char]) index = dict[index][char];
                else {
                    state++;                                           //1
                    dict[index][char] = state;                         //dict: {0: {a: 1}}
                    dict[state] = {};                                  //dict: {0: {a: 1}, 1: {}}
                    index = state;                                     //1
                    output[index] = [];                                //output: {1: []}
                }
            }
            if (allowDuplicates || output[index].indexOf(word) === -1) output[index].push(word);
        }
        let suffix = new Map(Object.values(dict[0]).map(state => [state, 0]));        // represents the blue suffix link in the visual trie
        let xsuffix = Array.from(suffix.keys());
        while (xsuffix.length) {
            let r = xsuffix.shift();
            // for each symbol a such that g(r, a) = s
            for (let [word, s] of Object.entries(dict[r])) {
                xsuffix.push(s);
                state = suffix.get(r);
                while(state > 0 && !dict[state][word]) {
                    state = suffix.get(state);
                }
                if (dict[state][word]) {
                    let index = dict[state][word];
                    suffix.set(s, index);
                    output[s] = output[s].concat(output[index]);
                }
                else suffix.set(s, 0);
            }
        }
        this.dict = dict;
        this.output = output;
        this.suffix = suffix;
    }

    search (string, positions = false) {
        let state = 0;
        let results = [];
        for (let i = 0; i < string.length; i++) {
            let char = string[i];
            while (state > 0 && !this.dict[state][char]) {
                state = this.suffix.get(state);
            }
            if (!this.dict[state][char]) continue;
            state = this.dict[state][char];
            if (this.output[state].length > 0) {
                let found = this.output[state];
                if (positions) results.push([i, found]);
                else results.push(...found);
            }
        }
        return results;
    }

}

module.exports = LAZYac;