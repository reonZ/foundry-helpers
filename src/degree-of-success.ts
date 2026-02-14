import { DegreeOfSuccessString, ZeroToThree } from "pf2e-types";

const DEGREE_OF_SUCCESS_STRINGS = ["criticalFailure", "failure", "success", "criticalSuccess"] as const;

function degreeOfSuccessString(value: ZeroToThree): DegreeOfSuccessString;
function degreeOfSuccessString(value: number): DegreeOfSuccessString | undefined;
function degreeOfSuccessString(value: number) {
    return DEGREE_OF_SUCCESS_STRINGS.at(value);
}

export { DEGREE_OF_SUCCESS_STRINGS, degreeOfSuccessString };
