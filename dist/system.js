import { R } from ".";
class SYSTEM {
    static get id() {
        return game.system.id;
    }
    static get isPF2e() {
        return this.id === "pf2e";
    }
    static get isSF2e() {
        return this.id === "sf2e";
    }
    static relativePath(...path) {
        const tail = R.join(path, "/");
        return `systems/${this.id}/${tail}`;
    }
    static path(...path) {
        return () => this.relativePath(...path);
    }
    static uuid(pf2e, sf2e) {
        return () => {
            return this.isSF2e ? sf2e : pf2e;
        };
    }
    static sluggify(text, options) {
        return game.pf2e.system.sluggify(text, options);
    }
    static getPack(name) {
        return game.packs.get(`${SYSTEM.id}.${name}`);
    }
}
export { SYSTEM };
