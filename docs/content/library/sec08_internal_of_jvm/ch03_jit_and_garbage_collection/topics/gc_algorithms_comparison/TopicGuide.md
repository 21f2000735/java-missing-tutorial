---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# GC Algorithms Comparison

## Why This Exists

Concept: GC Algorithms Comparison.

## The Pain Before It



## Java Creator Mindset

Make the rule behind gc algorithms comparison obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use gc algorithms comparison without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind gc algorithms comparison, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind gc algorithms comparison explicit and repeatable.

Run [GcAlgorithmsComparison.java](GcAlgorithmsComparison.java) as the source of truth for the example.

## Code

Run [GcAlgorithmsComparison.java](GcAlgorithmsComparison.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        System.out.println("Concept: different GC algorithms optimize different tradeoffs.");
        System.out.println("Serial GC = single-threaded, simple, small heaps");
        System.out.println("Parallel GC = throughput focused, multi-threaded");
        System.out.println("G1 GC = region based, predictable pauses");
        System.out.println("ZGC = concurrent compaction, sub-10ms pauses");
        System.out.println("Shenandoah = concurrent evacuation");
        System.out.println("Flags: -XX:+UseG1GC, -XX:+UseZGC");
        System.out.println("Why it matters: the best GC depends on latency target, heap size, and throughput needs.");
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

- reading GC Algorithms Comparison as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [GcAlgorithmsComparison.java](GcAlgorithmsComparison.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why GC Algorithms Comparison exists, what problem it solves, and what the runnable file proves.
