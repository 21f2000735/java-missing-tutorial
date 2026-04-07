---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Understanding Stack, Heap, And References

## The Problem

Many Java learners say:

"I changed one variable. Why did the other variable also change?"

That confusion usually comes from not separating:

- the reference
- the object it points to

## Run This Code

Run the example and watch both variables show the same updated cart count.

## Expected Output

- `first.itemCount = 5`
- `second.itemCount = 5`

## ❌ Bad Mental Model

"Two variables means two objects."

That is not always true.

## ✅ Better Mental Model

Two variables can point to the same object.

If one reference mutates that object, the other reference sees the same changed state.

## Why This Works

The variables hold references.  
The object lives separately.  
Both references in the example point at the same object.

## Use This When

- you want to understand mutation surprises
- you are learning parameter passing and object sharing
- you want a stronger JVM memory intuition

## Avoid This When

- you are relying on guessing instead of tracing which references point to which object

## Version Notes

This is a timeless Java concept.  
It matters just as much in modern Java as it did in early Java.

## Next Topic

Continue into collection internals and concurrency, because both depend heavily on correct shared-state intuition.
