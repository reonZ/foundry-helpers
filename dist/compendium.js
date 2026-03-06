/**
 * old system method that no longer exist
 */
function filterTraits(traits, selected, condition) {
    const selectedTraits = selected.filter((s) => !s.not).map((s) => s.value);
    const notTraits = selected.filter((t) => t.not).map((s) => s.value);
    if (notTraits.some((t) => traits.includes(t))) {
        return false;
    }
    if (selectedTraits.length) {
        return condition === "and"
            ? selectedTraits.every((t) => traits.includes(t))
            : selectedTraits.some((t) => traits.includes(t));
    }
    return true;
}
export { filterTraits };
