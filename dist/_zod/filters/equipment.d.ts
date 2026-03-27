import z from "zod";
declare function zEquipmentFilter(): z.ZodObject<{
    checkboxes: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
        rarity: "rarity";
        itemTypes: "itemTypes";
        armorTypes: "armorTypes";
        weaponTypes: "weaponTypes";
    }> & z.core.$partial, z.ZodObject<{
        options: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
            selected: z.ZodBoolean;
        }, z.core.$strip>>>;
        selected: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    level: z.ZodOptional<z.ZodObject<{
        from: z.ZodDefault<z.ZodNumber>;
        to: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    ranges: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
        price: "price";
    }> & z.core.$partial, z.ZodObject<{
        values: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
    search: z.ZodOptional<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>>;
    source: z.ZodOptional<z.ZodObject<{
        options: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
            selected: z.ZodBoolean;
        }, z.core.$strip>>>;
        selected: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    traits: z.ZodOptional<z.ZodObject<{
        conjunction: z.ZodDefault<z.ZodEnum<{
            and: "and";
            or: "or";
        }>>;
        selected: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            not: z.ZodOptional<z.ZodBoolean>;
            value: z.ZodCustom<string, string>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export { zEquipmentFilter };
