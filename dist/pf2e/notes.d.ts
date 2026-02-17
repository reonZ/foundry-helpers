import { DegreeOfSuccessString, Predicate, RawPredicate, RuleElement } from "@7h3laughingman/pf2e-types";
import { UserVisibility } from "..";
/**
 * https://github.com/foundryvtt/pf2e/blob/5967df95d2645162d06d6ee317e99cf9aa03477e/src/module/notes.ts#L7
 */
declare class RollNotePF2e {
    /** The selector used to determine on which rolls the note will be shown for. */
    selector: string;
    /** An optional title for the note */
    title: string | null;
    /** The text content of this note. */
    text: string;
    /** If true, these dice are user-provided/custom. */
    predicate: Predicate;
    /** List of outcomes to show this note for; or all outcomes if none are specified */
    outcome: DegreeOfSuccessString[];
    /** An optional visibility restriction for the note */
    visibility: UserVisibility | null;
    /** The originating rule element of this modifier, if any: used to retrieve "parent" item roll options */
    rule: RuleElement | null;
    constructor(params: RollNoteParams);
    /** Convert an array of notes to a UL element, or null if the array is empty. */
    static notesToHTML(notes: RollNotePF2e[]): HTMLUListElement | null;
    toHTML(): HTMLLIElement;
    clone(): RollNotePF2e;
    toObject(): RollNoteSource;
}
interface RollNoteSource {
    selector: string;
    title?: string | null;
    text: string;
    predicate?: RawPredicate;
    outcome?: DegreeOfSuccessString[];
    visibility?: UserVisibility | null;
}
interface RollNoteParams extends RollNoteSource {
    rule?: RuleElement | null;
}
export { RollNotePF2e };
