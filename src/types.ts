// Public types and contracts

export type Primitive =
    | string
    | number
    | boolean
    | null
    | undefined
    | symbol
    | bigint
    | Date;

export type Indexable = Record<string, unknown>;

export interface FlattenOptions {
    /** Separator between keys. Default: "." */
    readonly separator?: string;

    /** If true, expands arrays like "arr.0.x". Default: false (keeps arrays intact). */
    readonly expandArrays?: boolean;

    /** If true, skips keys whose value is undefined. Default: true. */
    readonly skipUndefined?: boolean;

    /**
     * Additional types treated as “non-plain” (do not recurse into them).
     * Example: [Map, Set, URL]
     */
    readonly nonPlainInstances?: Array<Function>;
}
