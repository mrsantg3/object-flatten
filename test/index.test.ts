import { flattenfy } from "../src";

describe("flattenfy", () => {
    it("flattens nested object", () => {
        const input = { a: { b: { c: 1 } }, d: 2 };
        expect(flattenfy(input)).toEqual({ "a.b.c": 1, d: 2 });
    });

    it("respects separator", () => {
        const input = { a: { b: { c: 1 } } };
        expect(flattenfy(input, { separator: "_" })).toEqual({ "a_b_c": 1 });
    });

    it("keeps arrays by default", () => {
        const input = { a: [{ x: 1 }, { x: 2 }] };
        expect(flattenfy(input)).toEqual({ a: [{ x: 1 }, { x: 2 }] });
    });

    it("expands arrays when enabled", () => {
        const input = { a: [{ x: 1 }, { y: 2 }] };
        expect(flattenfy(input, { expandArrays: true })).toEqual({
            "a.0.x": 1,
            "a.1.y": 2,
        });
    });

    it("skips undefined by default", () => {
        const input = { a: { b: undefined }, c: 1 };
        expect(flattenfy(input)).toEqual({ c: 1 });
    });

    it("does not dive into non-plain instances (Date by default)", () => {
        const d = new Date("2020-01-01");
        const input = { a: { when: d } };
        expect(flattenfy(input)).toEqual({ "a.when": d });
    });
});
