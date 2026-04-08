---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# latency debug playbook

## Why This Exists

Concept: latency debug playbook.

Strong companies care how you debug production regressions, not just how you code fresh features.

## The Pain Before It

It shows a disciplined way to find the likely bottleneck instead of guessing.

A checkout service got slower after a new release.

## Java Creator Mindset

Compare before and after metrics, identify the largest change, then narrow the blast radius.

## How You Might Invent It

1. Model component timings.
2. Compare baselines with the new release.
3. Inspect the largest regression first.

## Naive Attempt

The naive version is to use latency debug playbook without checking what rule it is supposed to protect.

## Why It Breaks

It shows a disciplined way to find the likely bottleneck instead of guessing.

Edge cases usually show the bug first.

## Final Java Solution

Compare before and after metrics, identify the largest change, then narrow the blast radius.

Run [LatencyDebugPlaybook.java](LatencyDebugPlaybook.java) as the source of truth for the example.

## Code

Run [LatencyDebugPlaybook.java](LatencyDebugPlaybook.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        List<ComponentLatency> baseline = List.of(
                new ComponentLatency("gateway", 22),
                new ComponentLatency("pricing-api", 40),
                new ComponentLatency("inventory-api", 35)
        );
        List<ComponentLatency> current = List.of(
                new ComponentLatency("gateway", 25),
                new ComponentLatency("pricing-api", 150),
                new ComponentLatency("inventory-api", 39)
        );

        Regression regression = findPrimaryRegression(baseline, current);

        // Expected output:
        // primaryRegression = pricing-api
        // latencyDeltaMs = 110
        System.out.println("primaryRegression = " + regression.component());
        System.out.println("latencyDeltaMs = " + regression.deltaMs());
        System.out.println("Why it works: the approach compares metrics first and guesses later.");
        System.out.println("Company lens: Google values methodical debugging and measurable reasoning.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- compare before and after before chasing symptoms");
        System.out.println("- isolate the biggest regression first");
        System.out.println("- good debugging answers mention rollback, metrics, and blast radius");
    }
```

## Walkthrough

1. Model component timings.
2. Compare baselines with the new release.
3. Inspect the largest regression first.

What to observe:

- primaryRegression = pricing-api
- latencyDeltaMs = 110

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading latency debug playbook as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [LatencyDebugPlaybook.java](LatencyDebugPlaybook.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why latency debug playbook exists, what problem it solves, and what the runnable file proves.
