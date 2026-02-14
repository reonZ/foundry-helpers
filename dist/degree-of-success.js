const DEGREE_OF_SUCCESS_STRINGS = ["criticalFailure", "failure", "success", "criticalSuccess"];
function degreeOfSuccessString(value) {
    return DEGREE_OF_SUCCESS_STRINGS.at(value);
}
export { DEGREE_OF_SUCCESS_STRINGS, degreeOfSuccessString };
