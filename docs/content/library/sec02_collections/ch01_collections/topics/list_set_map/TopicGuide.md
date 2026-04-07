---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
---

# List, Set, Map

## Why This Matters

A lot of Java bugs are not syntax bugs.  
They are data-shape bugs.

## Intuition

![List, Set, Map single-look visual](./ListSetMapVisual.svg)

The point of the picture is simple:

- `List` answers "keep items in order, even if repeated"
- `Set` answers "keep items unique"
- `Map` answers "find the value by key fast"

## Problem Statement

A lot of Java bugs are not syntax bugs.  
They are data-shape bugs.

You wanted:

- ordered items
- unique values
- lookup by key

but you picked the wrong collection.

## Core Idea

Pick the collection based on the problem shape:

- `List` for ordered repeated items
- `Set` for unique values
- `Map` for key-based lookup

That is both cleaner design and cleaner code.

## Mental Model

![List, Set, Map single-look visual](./ListSetMapVisual.svg)

The point of the picture is simple:

- `List` answers "keep items in order, even if repeated"
- `Set` answers "keep items unique"
- `Map` answers "find the value by key fast"

| Need | Best fit | Why |
| --- | --- | --- |
| Preserve order and duplicates | `List` | Cart lines, screen rows, ordered history |
| Keep values unique | `Set` | Tags, coupon codes, distinct IDs |
| Find by key | `Map` | SKU to quantity, user ID to profile, code to meaning |

## Simple Example

### Run It

Run the example and compare cart items, coupon codes, and product quantities.

### Expected Result

- cart items keep duplicates and order
- coupon codes stay unique
- product quantities can be looked up by SKU

## Step-by-Step Working

The collection type itself becomes documentation.  
A reader can often understand the data rules just by seeing whether you chose `List`, `Set`, or `Map`.

## Rules / Syntax

These core collection ideas have been central since the Java Collections Framework arrived in Java 1.2.

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

Use `List` for everything because it is familiar.

That usually leads to:

- duplicate values where uniqueness mattered
- manual searching where direct lookup was needed
- intent that is harder to read

## When To Use / When Not To Use

### Use It When

Ask these three questions in order:

1. Do I care about order?
2. Do I need uniqueness?
3. Do I need lookup by key?

The first "yes" often tells you the right family of collection.

### Avoid It When

- you are choosing by habit instead of by data shape

## Practice

Change one part of the runnable example, rerun it, and explain whether list, set, map still behaves the way you expected.

### After That

Go next to the collections internals and tradeoffs chapter if you want the complexity and performance side.

## Summary

- choosing the right collection is a business-rule decision, not just an API choice
- `List`, `Set`, and `Map` each express a different data shape
- the wrong collection often creates correctness bugs before it creates performance bugs

## The Problem

A lot of Java bugs are not syntax bugs.  
They are data-shape bugs.

You wanted:

- ordered items
- unique values
- lookup by key

but you picked the wrong collection.

## Quick Visual

![List, Set, Map single-look visual](./ListSetMapVisual.svg)

The point of the picture is simple:

- `List` answers "keep items in order, even if repeated"
- `Set` answers "keep items unique"
- `Map` answers "find the value by key fast"

## Run This Code

Run the example and compare cart items, coupon codes, and product quantities.

## Expected Output

- cart items keep duplicates and order
- coupon codes stay unique
- product quantities can be looked up by SKU

## ❌ Bad Code

Use `List` for everything because it is familiar.

That usually leads to:

- duplicate values where uniqueness mattered
- manual searching where direct lookup was needed
- intent that is harder to read

## ✅ Better Code

Pick the collection based on the problem shape:

- `List` for ordered repeated items
- `Set` for unique values
- `Map` for key-based lookup

That is both cleaner design and cleaner code.

## Why This Works

The collection type itself becomes documentation.  
A reader can often understand the data rules just by seeing whether you chose `List`, `Set`, or `Map`.

## Comparison Snapshot

| Need | Best fit | Why |
| --- | --- | --- |
| Preserve order and duplicates | `List` | Cart lines, screen rows, ordered history |
| Keep values unique | `Set` | Tags, coupon codes, distinct IDs |
| Find by key | `Map` | SKU to quantity, user ID to profile, code to meaning |

## Performance Lens

| Operation | `ArrayList` style `List` | `HashSet` | `HashMap` |
| --- | --- | --- | --- |
| Append/add | usually cheap | usually cheap | usually cheap |
| Check contains | often linear scan | usually near constant average | usually near constant average by key |
| Lookup by index | direct | not supported | not supported |
| Lookup by key | not natural | not natural | direct by key on average |

These are the mental-model costs that matter first for learners:

- using `List` for lookup often pushes you into repeated scanning
- using `Set` for uniqueness removes "did we already add it?" bugs
- using `Map` turns "search for the item" into "ask by key"

## Real-World Decision Rule

Ask these three questions in order:

1. Do I care about order?
2. Do I need uniqueness?
3. Do I need lookup by key?

The first "yes" often tells you the right family of collection.

## Use This When

- you want the data structure to express a business rule directly
- correctness matters as much as convenience

## Avoid This When

- you are choosing by habit instead of by data shape

## Version Notes

These core collection ideas have been central since the Java Collections Framework arrived in Java 1.2.

## After Reading This, You Should Know

- choosing the right collection is a business-rule decision, not just an API choice
- `List`, `Set`, and `Map` each express a different data shape
- the wrong collection often creates correctness bugs before it creates performance bugs

## Next Topic

Go next to the collections internals and tradeoffs chapter if you want the complexity and performance side.
