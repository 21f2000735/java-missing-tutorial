---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
---

# List, Set, Map

## The Problem

A lot of Java bugs are not syntax bugs.  
They are data-shape bugs.

You wanted:

- ordered items
- unique values
- lookup by key

but you picked the wrong collection.

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

## Use This When

- you want the data structure to express a business rule directly
- correctness matters as much as convenience

## Avoid This When

- you are choosing by habit instead of by data shape

## Version Notes

These core collection ideas have been central since the Java Collections Framework arrived in Java 1.2.

## Next Topic

Go next to the collections internals and tradeoffs chapter if you want the complexity and performance side.
