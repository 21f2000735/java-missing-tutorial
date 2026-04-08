---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# GC Roots And Reference Types

## Why This Exists

Concept: GC Roots And Reference Types.

## The Pain Before It



## Java Creator Mindset

Make the rule behind gc roots and reference types obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use gc roots and reference types without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind gc roots and reference types, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind gc roots and reference types explicit and repeatable.

Run [GcRootsAndReferences.java](GcRootsAndReferences.java) as the source of truth for the example.

## Code

Run [GcRootsAndReferences.java](GcRootsAndReferences.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        String localRoot = "local-root";
        WeakHashMap<Object, String> cache = new WeakHashMap<>();
        Object weakKey = new Object();
        cache.put(weakKey, "cached report");

        WeakReference<String> weakReference = new WeakReference<>("ephemeral");

        System.out.println("GC roots = local variable, active thread, static field, and JNI-style references.");
        System.out.println("strong root = " + localRoot);
        System.out.println("static root = " + STATIC_ROOT);
        System.out.println("weak map size = " + cache.size());
        System.out.println("weak reference present = " + (weakReference.get() != null));
        System.out.println("Why it matters: strong, soft, weak, and phantom references control how caches and leaks behave.");
    }
```

## Walkthrough

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

What to observe:

- Check whether the output matches the rule in the comment header.
- Check whether the edge case you changed still behaves as expected.

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading GC Roots And Reference Types as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [GcRootsAndReferences.java](GcRootsAndReferences.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why GC Roots And Reference Types exists, what problem it solves, and what the runnable file proves.
