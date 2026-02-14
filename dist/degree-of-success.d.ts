import { DegreeOfSuccessString, ZeroToThree } from "pf2e-types";
declare const DEGREE_OF_SUCCESS_STRINGS: readonly ["criticalFailure", "failure", "success", "criticalSuccess"];
declare function degreeOfSuccessString(value: ZeroToThree): DegreeOfSuccessString;
declare function degreeOfSuccessString(value: number): DegreeOfSuccessString | undefined;
export { DEGREE_OF_SUCCESS_STRINGS, degreeOfSuccessString };
