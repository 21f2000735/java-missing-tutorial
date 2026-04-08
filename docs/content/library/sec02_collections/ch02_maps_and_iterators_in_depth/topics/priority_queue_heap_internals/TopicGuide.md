---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# PriorityQueue And Heap Internals

## Why This Exists

This topic explains priorityqueue and heap internals because it solves a concrete problem that becomes visible once the naive version starts to fail.

## The Pain Before It

Before priorityqueue and heap internals, the code often works for a tiny case but becomes hard to trust once edge cases, state, or reuse enter the picture.

## Java Creator Mindset

A Java designer would ask what rule needs to be made visible so the safer choice is also the clearer one.

## How You Might Invent It

- Default `PriorityQueue` is a min-heap.
- A custom comparator turns it into a max-heap.
- Comparison table:

| Need | Structure | Complexity |
| --- | --- | --- |
| Next smallest | min-heap | `add()` / `poll()` = O(log n) |
| Next largest | max-heap | `add()` / `poll()` = O(log n) |
| Top-K stream | heap of size K | keeps only the best K values |

## Naive Attempt

The first attempt usually uses direct code and leaves too much behavior implicit.

## Why It Breaks

That version breaks when the same assumption no longer holds in real code, especially around edge cases, state, or repeated use.

## Final Java Solution

Java's final form for priorityqueue and heap internals makes the important rule visible and repeatable instead of hiding it inside ad hoc code.

## Code

Run [PriorityQueueHeapInternals.java](PriorityQueueHeapInternals.java) and focus on the runnable example first. Then compare the output with the explanation below.

## Walkthrough

1. Identify the starting state or input.
2. Run the example once without changing anything.
3. Change one line or one input.
4. Compare the new result with the rule the topic is teaching.

## Mental Model

- Default `PriorityQueue` is a min-heap.
- A custom comparator turns it into a max-heap.
- Comparison table:

| Need | Structure | Complexity |
| --- | --- | --- |
| Next smallest | min-heap | `add()` / `poll()` = O(log n) |
| Next largest | max-heap | `add()` / `poll()` = O(log n) |
| Top-K stream | heap of size K | keeps only the best K values |

## Mistakes

- memorizing syntax before the problem
- assuming the tiny example covers every case
- changing the rule without rerunning the example

## Tradeoffs

Gain: clearer behavior or safer code.

Cost: a bit more structure or one more rule to remember.

Question: is the extra rule cheaper than the bug it prevents?

## Use / Avoid

Use it when the rule removes a real bug or removes guesswork.

Avoid it when direct code is already clearer and just as safe.

## Practice

Change one input in [PriorityQueueHeapInternals.java](PriorityQueueHeapInternals.java), rerun it, and write down what changed.

## Summary

After this topic, you should be able to explain the problem it solves, the rule Java enforces, and the smallest change that proves you understand it.
