import { R } from ".";
const SYSTEM = {
    get id() {
        return game.system.id;
    },
    get isPF2e() {
        return this.id === "pf2e";
    },
    get isSF2e() {
        return this.id === "sf2e";
    },
    relativePath(...path) {
        const tail = R.join(path, "/");
        return `systems/${this.id}/${tail}`;
    },
    path(...path) {
        return () => this.relativePath(...path);
    },
    uuid(pf2e, sf2e) {
        return () => {
            return this.isSF2e ? sf2e : pf2e;
        };
    },
    sluggify(text, options) {
        return game.pf2e.system.sluggify(text, options);
    },
};
export { SYSTEM };
