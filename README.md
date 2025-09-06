# object-flatten

> Flatten nested objects into dot-notation keys

## 📦 Install

```bash
npm install object-flatten
```

## 🚀 Usage

```ts
import flattenObject from "object-flatten";

const data = {
  a: { b: { c: 1 } },
  d: 2,
  g: [{ x: 1 }, { y: 2 }]
};

// Default (keeps arrays intact)
console.log(flattenObject(data));
// → { "a.b.c": 1, "d": 2, "g": [ {x:1}, {y:2} ] }

// Expand arrays
console.log(flattenObject(data, { expandArrays: true }));
// → { "a.b.c": 1, "d": 2, "g.0.x": 1, "g.1.y": 2 }

// Custom separator
console.log(flattenObject(data, { separator: "_" }));
// → { "a_b_c": 1, "d": 2, "g": [ {x:1}, {y:2} ] }
```

## ⚙️ Options

* `separator` → key separator (default `"."`)
* `expandArrays` → expand arrays into keys (`a.0.b`) (default `false`)
* `skipUndefined` → ignore `undefined` values (default `true`)
* `nonPlainInstances` → classes not to traverse (default `[Date]`)