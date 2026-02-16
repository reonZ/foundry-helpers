import { DegreeOfSuccessString, ZeroToThree } from "@7h3laughingman/pf2e-types";
declare const DEGREE_OF_SUCCESS_STRINGS: readonly ["criticalFailure", "failure", "success", "criticalSuccess"];
declare const DEGREE_VALUES: Record<ZeroToThree | DegreeOfSuccessString, ZeroToThree>;
declare const DEGREE_ADJUSTMENT_AMOUNTS: {
    readonly LOWER_BY_TWO: -2;
    readonly LOWER: -1;
    readonly INCREASE: 1;
    readonly INCREASE_BY_TWO: 2;
    readonly TO_CRITICAL_FAILURE: "criticalFailure";
    readonly TO_FAILURE: "failure";
    readonly TO_SUCCESS: "success";
    readonly TO_CRITICAL_SUCCESS: "criticalSuccess";
};
declare function degreeOfSuccessString(value: ZeroToThree): DegreeOfSuccessString;
declare function degreeOfSuccessString(value: number): DegreeOfSuccessString | undefined;
declare function degreeOfSuccessNumber(value: Maybe<string | number>): ZeroToThree | undefined;
declare function isDegreeOfSuccessValue(value: unknown): value is ZeroToThree | DegreeOfSuccessString;
export { DEGREE_ADJUSTMENT_AMOUNTS, DEGREE_OF_SUCCESS_STRINGS, DEGREE_VALUES, degreeOfSuccessNumber, degreeOfSuccessString, isDegreeOfSuccessValue, };
