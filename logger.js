class LoggerConstructor {

    constructor () {
        this.output = "";
    }

    async _log() {
        for (let r of arguments) {
            if (typeof r === "string") return this.output += r + "\n";
            if (typeof r === "number") return this.output += r + "\n";
            //if (Array.isArray(r)) return this.output += "[" + r.join(", ") + "]\n";
            if (typeof r === "object") return this.output += JSON.stringify(r, null, 4) + "\n";
            if (typeof r === "function") return this.output += r.toString() + "\n";
        }
    }

    async log() {
        for (let r of arguments) {
            if (typeof r === "string") return this.f(r);
            if (typeof r === "number") return this.f(r);
            //if (Array.isArray(r)) return this.f("[" + r.join(", ") + "]");
            if (typeof r === "object") return this.f(JSON.stringify(r, null, 4));
            if (typeof r === "function") return this.f(r.toString());
        }
    }

    async f(r) {
        return console.log(r);
    }

    async end() {
        console.log(this.output);
    }
}
