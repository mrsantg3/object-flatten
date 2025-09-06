// Utility functions and type guards


import {Indexable} from "./types";
import type { NonPlainCtor } from "./types";

/** Checks if a value is a plain object (no prototype or Object.prototype). */
export function isPlainObject(value: unknown): value is Indexable {
    if (value === null || typeof value !== "object") return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/** Checks if a value is a Date instance. */
export function isDate(value: unknown): value is Date {
    return value instanceof Date;
}

/**
 * Creates a checker for instances that should NOT be traversed.
 * e.g. Date, Map, Set, URL
 */
export function makeNonPlainChecker(nonPlainInstances: ReadonlyArray<NonPlainCtor>) {
    return (v: unknown): boolean =>
        nonPlainInstances.some((Ctor) => v instanceof Ctor);
}


// Helpers for key composition

/**
 * Builds a new key by joining a parent key with the current segment,
 * separated by the given character/string.
 */
export function joinKey(
    parent: string,
    current: string | number,
    sep: string
): string {
    return parent ? `${parent}${sep}${current}` : String(current);
}
