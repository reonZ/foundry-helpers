import z from "zod";
const CONJUNCTION_TYPES = ["and", "or"];
const EQUIPMENT_CATEGORIES = ["itemTypes", "rarity", "armorTypes", "weaponTypes"];
function zTraitData() {
    return z.object({
        conjunction: z.enum(CONJUNCTION_TYPES).default("and"),
        selected: z
            .array(z.object({
            label: z.string().trim(),
            not: z.boolean().optional(),
            value: z.string().trim(),
        }))
            .default([]),
    });
}
function zLevelData(max) {
    return z.object({
        from: z.number().min(0).max(max).multipleOf(1).default(0),
        to: z.number().min(0).max(max).multipleOf(1).default(max),
    });
}
function zSearchData() {
    return z.object({ text: z.string().trim().default("") });
}
function zCheckboxData() {
    return z.object({
        options: z.record(z.string(), z.object({ selected: z.boolean() })).default({}),
        selected: z.array(z.string()).default([]),
    });
}
function zRangeData() {
    return z.object({
        values: z.object({
            min: z.number().min(0).multipleOf(1),
            max: z.number().min(0).multipleOf(1),
        }),
    });
}
function zEquipmentFilter() {
    return z.object({
        checkboxes: z.partialRecord(z.enum(EQUIPMENT_CATEGORIES), zCheckboxData()).optional(),
        level: zLevelData(30).optional(),
        ranges: z.partialRecord(z.enum(["price"]), zRangeData()).optional(),
        search: zSearchData().optional(),
        source: zCheckboxData().optional(),
        traits: zTraitData().optional(),
    });
}
export { zEquipmentFilter };
