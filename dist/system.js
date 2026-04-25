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
            return (this.isSF2e && sf2e) || pf2e;
        };
    }
    static itemUuid(pf2e, sf2e) {
        return () => {
            return (this.isSF2e && sf2e) || pf2e;
        };
    }
    static uuids(entries) {
        return () => {
            const index = this.isSF2e ? 1 : 0;
            return entries.map((entry) => entry[index]);
        };
    }
    static fromUuid(uuid) {
        const singleUuid = uuid();
        return fromUuid(singleUuid);
    }
    static pack(pf2e, sf2e) {
        return () => {
            return this.getPack(pf2e, sf2e);
        };
    }
    static sluggify(text, options) {
        return game.pf2e.system.sluggify(text, options);
    }
    static getPack(pf2e, sf2e) {
        const name = (this.isSF2e && sf2e) || pf2e;
        return game.packs.get(name);
    }
}
export { SYSTEM };
