---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
mode: interview
visual: required
visual_asset: GcStrategiesVisual.svg
---

# GC Strategies

## Why This Exists

Concept: GC Strategies.

## The Pain Before It



## Java Creator Mindset

Make the rule behind gc strategies obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

![GC Strategies visual](./GcStrategiesVisual.svg)

## Naive Attempt

The naive version is to use gc strategies without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind gc strategies, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind gc strategies explicit and repeatable.

Run [GcStrategies.java](GcStrategies.java) as the source of truth for the example.

## Code

Run [GcStrategies.java](GcStrategies.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        System.out.println("Concept: different garbage collectors optimize for different tradeoffs.");
        List<String> collectors = List.of("G1", "ZGC", "Shenandoah");

        // Expected output:
        // G1 -> balanced default for many server workloads
        // ZGC -> very low pause time focus
        // Shenandoah -> low pause time with concurrent compaction focus
        System.out.println("G1 -> balanced default for many server workloads");
        System.out.println("ZGC -> very low pause time focus");
        System.out.println("Shenandoah -> low pause time with concurrent compaction focus");
        System.out.println("collector count = " + collectors.size());
        System.out.println("Use this when: you need a first mental model before reading deeper GC tuning material.");
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

![GC Strategies visual](./GcStrategiesVisual.svg)

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading GC Strategies as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [GcStrategies.java](GcStrategies.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why GC Strategies exists, what problem it solves, and what the runnable file proves.
