const DEGREE_OF_SUCCESS_STRINGS = ["criticalFailure", "failure", "success", "criticalSuccess"];
const DEGREE_VALUES = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    criticalFailure: 0,
    failure: 1,
    success: 2,
    criticalSuccess: 3,
};
const DEGREE_ADJUSTMENT_AMOUNTS = {
    LOWER_BY_TWO: -2,
    LOWER: -1,
    INCREASE: 1,
    INCREASE_BY_TWO: 2,
    TO_CRITICAL_FAILURE: "criticalFailure",
    TO_FAILURE: "failure",
    TO_SUCCESS: "success",
    TO_CRITICAL_SUCCESS: "criticalSuccess",
};
function degreeOfSuccessString(value) {
    return DEGREE_OF_SUCCESS_STRINGS.at(value);
}
export { DEGREE_ADJUSTMENT_AMOUNTS, DEGREE_OF_SUCCESS_STRINGS, DEGREE_VALUES, degreeOfSuccessString };
