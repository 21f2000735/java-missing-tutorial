---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
---

# ArrayList growth and lookup

## Why This Exists

Concept: ArrayList growth and lookup.

ArrayList feels simple on the surface, but its backing-array behavior explains why some operations are cheap and some are not.

## The Pain Before It

It explains why indexed reads are fast and why occasional resize cost appears during append-heavy workloads.

An order dashboard keeps appending recent orders and later reads them by index.

## Java Creator Mindset

ArrayList is fast because data stays in a backing array, but growth sometimes copies old elements.

## How You Might Invent It

1. Append items while estimating resize-copy work.
2. Read one item by index.
3. Compare cheap common appends with occasional expensive growth.

## Naive Attempt

The naive version is to use arraylist growth and lookup without checking what rule it is supposed to protect.

## Why It Breaks

It explains why indexed reads are fast and why occasional resize cost appears during append-heavy workloads.

Edge cases usually show the bug first.

## Final Java Solution

ArrayList is fast because data stays in a backing array, but growth sometimes copies old elements.

Run [ArrayListGrowthAndLookup.java](ArrayListGrowthAndLookup.java) as the source of truth for the example.

## Code

Run [ArrayListGrowthAndLookup.java](ArrayListGrowthAndLookup.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        System.out.println("Concept: ArrayList internals");
        System.out.println("Problem: appends look cheap, but hidden resize work still exists.");
        System.out.println();

        List<String> recentOrders = new ArrayList<>();
        int copiedDuringGrowth = appendWithEstimatedCopyWork(recentOrders, 12);

        // Expected output:
        // itemAtIndex4 = order-5
        // estimatedCopiesDuringGrowth = 10
        System.out.println("itemAtIndex4 = " + recentOrders.get(4));
        System.out.println("estimatedCopiesDuringGrowth = " + copiedDuringGrowth);
        System.out.println("Why it works: index access is direct, but resizing copies old elements into a larger array.");
        System.out.println("Common mistake: saying append is always free instead of amortized.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- index lookup is fast because ArrayList stores elements in a contiguous backing array");
        System.out.println("- growth is usually cheap but occasional resize copies old elements");
        System.out.println("- append is amortized O(1), not magically free");
    }
```

## Walkthrough

1. Append items while estimating resize-copy work.
2. Read one item by index.
3. Compare cheap common appends with occasional expensive growth.

What to observe:

- itemAtIndex4 = order-5
- estimatedCopiesDuringGrowth = 10

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading ArrayList growth and lookup as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ArrayListGrowthAndLookup.java](ArrayListGrowthAndLookup.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why ArrayList growth and lookup exists, what problem it solves, and what the runnable file proves.
