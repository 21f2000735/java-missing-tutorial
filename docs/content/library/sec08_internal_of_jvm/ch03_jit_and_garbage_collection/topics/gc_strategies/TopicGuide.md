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

This topic exists because "Which garbage collector is best?" is the wrong first JVM question.

## The Pain Before It

Learners hear collector names such as:

- G1
- ZGC
- Shenandoah

but cannot explain what tradeoff each name is trying to optimize.

## Java Creator Mindset

Start with runtime goals, not collector brands.

## How You Might Invent It

One application wants balanced server defaults. Another wants very low pause time. Another cares about concurrent compaction behavior.

That is why one fixed collector is not enough.

![GC strategy tradeoff map](GcStrategiesVisual.svg)

What to notice:

- G1 is a broad default for many server workloads
- ZGC pushes harder toward very low pauses
- Shenandoah also focuses on low pauses with concurrent compaction emphasis

## Naive Attempt

The naive answer is:

"Use the newest collector. It must be the best."

## Why It Breaks

Collector choice is workload-specific. A low-pause collector is not automatically the best choice for every throughput goal or operational constraint.

## Final Java Solution

Use collector names as tradeoff labels:

- balanced default
- low pause focus
- concurrent compaction and low pause focus

## Code

### Run It

Run the example and read each collector line as a runtime goal summary, not as a tuning guide.

### Expected Result

- `G1 -> balanced default for many server workloads`
- `ZGC -> very low pause time focus`
- `Shenandoah -> low pause time with concurrent compaction focus`

## Walkthrough

The code is intentionally simple. The important idea is the comparison:

- same problem category
- different optimization priorities

## Mental Model

Garbage collectors are strategy choices for reclaiming memory under different latency and throughput pressures.

## Mistakes

- asking for one universal best collector
- repeating collector names without explaining the workload goal
- treating GC as one fixed algorithm

## Tradeoffs

Collectors trade among:

- pause time
- throughput
- runtime complexity

## Use / Avoid

### Use It When

- building first-pass JVM interview intuition
- comparing latency-sensitive and throughput-oriented workloads

### Avoid It When

- pretending one collector name solves every runtime problem

## Practice

Change one input in [GcStrategies.java](GcStrategies.java), rerun it, and write down what changed.

## Summary

After this topic, you should be able to explain collector choice as a tradeoff discussion rather than as brand memorization.
