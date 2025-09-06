import type {FlattenOptions, Indexable} from "./types";
import {isDate, isPlainObject, joinKey, makeNonPlainChecker} from "./utils";

export type {FlattenOptions, Indexable} from "./types";

/**
 * Flatten a nested object into dot-notation keys (ESM/CJS friendly, ships TS types).
 *
 * Uses an iterative BFS queue to avoid call stack overflows on very deep objects.
 */
export function flattenObject<T extends Indexable>(
    obj: T,
    opts: FlattenOptions = {}
): Record<string, unknown> {
    const {
        separator = ".",
        expandArrays = false,
        skipUndefined = true,
        nonPlainInstances = [Date],
    } = opts;

    const isNonPlain = makeNonPlainChecker(nonPlainInstances);
    const out: Record<string, unknown> = {};

    // Processing queue (BFS)
    const queue: Array<{ key: string; value: unknown }> = [{key: "", value: obj}];

    while (queue.length) {
        const {key, value} = queue.shift()!;

        // Skip undefined when configured
        if (value === undefined && skipUndefined) {
            continue;
        }

        // Primitives and non-plain instances (Date by default) → assign as-is
        if (
            value === null ||
            typeof value !== "object" ||
            isDate(value) ||
            isNonPlain(value)
        ) {
            out[key || ""] = value;
            continue;
        }

        // Arrays
        if (Array.isArray(value)) {
            if (!expandArrays) {
                // Keep arrays intact
                out[key || ""] = value;
            } else {
                // Expand arrays: arr.0, arr.1, ...
                for (let i = 0; i < value.length; i++) {
                    const childKey = joinKey(key, i, separator);
                    queue.push({key: childKey, value: value[i]});
                }
            }
            continue;
        }

        // Plain objects → enqueue children with joined keys
        if (isPlainObject(value)) {
            for (const [k, v] of Object.entries(value)) {
                const childKey = joinKey(key, k, separator);
                queue.push({key: childKey, value: v});
            }
            continue;
        }

        // Fallback for custom prototypes or unhandled cases
        out[key || ""] = value;
    }

    return out;
}

export default flattenObject;
