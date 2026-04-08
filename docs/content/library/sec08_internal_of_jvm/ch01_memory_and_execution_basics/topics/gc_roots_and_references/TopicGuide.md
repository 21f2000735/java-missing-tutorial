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

This topic explains gc roots and reference types because it solves a concrete problem that becomes visible once the naive version starts to fail.

## The Pain Before It

Before gc roots and reference types, the code often works for a tiny case but becomes hard to trust once edge cases, state, or reuse enter the picture.

## Java Creator Mindset

A Java designer would ask what rule needs to be made visible so the safer choice is also the clearer one.

## How You Might Invent It

- GC roots are the starting points the collector can reach from.
- Strong references keep objects alive.
- Comparison table:

| Reference | Keeps object alive? | Typical use |
| --- | --- | --- |
| Strong | yes | normal object graph |
| Soft | maybe | memory-sensitive cache |
| Weak | no, once not strongly reachable | weak lookup / metadata |
| Phantom | no | cleanup bookkeeping |

## Naive Attempt

The first attempt usually uses direct code and leaves too much behavior implicit.

## Why It Breaks

That version breaks when the same assumption no longer holds in real code, especially around edge cases, state, or repeated use.

## Final Java Solution

Java's final form for gc roots and reference types makes the important rule visible and repeatable instead of hiding it inside ad hoc code.

## Code

Run [GcRootsAndReferences.java](GcRootsAndReferences.java) and focus on the runnable example first. Then compare the output with the explanation below.

## Walkthrough

1. Identify the starting state or input.
2. Run the example once without changing anything.
3. Change one line or one input.
4. Compare the new result with the rule the topic is teaching.

## Mental Model

- GC roots are the starting points the collector can reach from.
- Strong references keep objects alive.
- Comparison table:

| Reference | Keeps object alive? | Typical use |
| --- | --- | --- |
| Strong | yes | normal object graph |
| Soft | maybe | memory-sensitive cache |
| Weak | no, once not strongly reachable | weak lookup / metadata |
| Phantom | no | cleanup bookkeeping |

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

Change one input in [GcRootsAndReferences.java](GcRootsAndReferences.java), rerun it, and write down what changed.

## Summary

After this topic, you should be able to explain the problem it solves, the rule Java enforces, and the smallest change that proves you understand it.
