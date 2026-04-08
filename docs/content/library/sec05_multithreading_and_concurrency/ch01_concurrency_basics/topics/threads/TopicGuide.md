---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## Why This Exists

Concept: Threads.

Concurrency starts with one hard fact: two units of work can overlap in time.

## The Pain Before It

It shows how independent work starts and why shared state becomes risky.

A reporting task runs in the background while the main flow continues.

## Java Creator Mindset

A thread is a unit of execution. Starting work and sharing state are separate concerns.

## How You Might Invent It

1. Start one background task.
2. Wait with join() when you need the task finished.
3. Notice how shared mutable state changes the design problem.

## Naive Attempt

The naive version is to use threads without checking what rule it is supposed to protect.

## Why It Breaks

It shows how independent work starts and why shared state becomes risky.

Edge cases usually show the bug first.

## Final Java Solution

A thread is a unit of execution. Starting work and sharing state are separate concerns.

Run [Threads.java](Threads.java) as the source of truth for the example.

## Code

Run [Threads.java](Threads.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) throws InterruptedException {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        exercise();
        solution();
    }
```

## Walkthrough

1. Start one background task.
2. Wait with join() when you need the task finished.
3. Notice how shared mutable state changes the design problem.

What to observe:

- worker thread: prepare report
- safe count = 2

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Threads as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [Threads.java](Threads.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Threads exists, what problem it solves, and what the runnable file proves.
