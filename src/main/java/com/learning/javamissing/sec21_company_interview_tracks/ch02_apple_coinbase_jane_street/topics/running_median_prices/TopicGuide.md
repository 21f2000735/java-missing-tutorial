---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# running median prices

## Why This Exists

Concept: running median prices.

Some interviewers want to see whether you can keep an invariant while data keeps arriving.

## The Pain Before It

It maintains the median of a growing price stream.

A trading dashboard wants the median of recent execution prices.

## Java Creator Mindset

Keep the lower half in a max heap and the upper half in a min heap, then rebalance.

## How You Might Invent It

1. Insert into the correct heap.
2. Rebalance sizes.
3. Read the median from heap tops.

## Naive Attempt

The naive version is to use running median prices without checking what rule it is supposed to protect.

## Why It Breaks

It maintains the median of a growing price stream.

Edge cases usually show the bug first.

## Final Java Solution

Keep the lower half in a max heap and the upper half in a min heap, then rebalance.

Run [RunningMedianPrices.java](RunningMedianPrices.java) as the source of truth for the example.

## Code

Run [RunningMedianPrices.java](RunningMedianPrices.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        RunningMedian median = new RunningMedian();
        median.add(100);
        median.add(103);
        median.add(101);

        // Expected output:
        // median = 101.0
        System.out.println("median = " + median.median());
        System.out.println("Why it works: two heaps keep lower and upper halves balanced.");
        System.out.println("Company lens: Jane Street answers should explain invariants out loud.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- the lower heap stores the lower half");
        System.out.println("- the upper heap stores the upper half");
        System.out.println("- balanced heaps make median lookup cheap");
    }
```

## Walkthrough

1. Insert into the correct heap.
2. Rebalance sizes.
3. Read the median from heap tops.

What to observe:

- median = 101.0

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading running median prices as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [RunningMedianPrices.java](RunningMedianPrices.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why running median prices exists, what problem it solves, and what the runnable file proves.
