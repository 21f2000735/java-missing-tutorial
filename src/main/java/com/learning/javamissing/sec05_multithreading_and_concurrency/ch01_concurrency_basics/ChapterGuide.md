# Concurrency Basics Learning Kit

## Why This Chapter Exists

This chapter exists for one reason: before virtual threads or modern APIs make sense, you need to understand what goes wrong when work overlaps in time.

## The Pain Before It

As soon as two tasks run concurrently, three things become important:

- how work starts
- how you wait for it
- what happens when both tasks touch the same mutable state

If that model is unclear, every later concurrency feature feels like extra syntax instead of clearer design.

## Java Creator Mindset

Read the chapter as a small set of related ideas around concurrency Basics, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

- raw thread behavior is still unclear
- race conditions still feel theoretical instead of concrete

## Final Java Direction

Read the chapter as a small set of related ideas around concurrency Basics, not as isolated trivia.

## Study Order

1. Run [Threads.java](topics/threads/Threads.java)
2. Run [Synchronization.java](topics/synchronization/Synchronization.java)
3. Run [Executors.java](topics/executors/Executors.java)

## What To Notice

- `start()` and `run()` are not the same thing
- shared mutable state is where correctness starts to break
- executors improve structure by separating task submission from thread management

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- raw thread behavior is still unclear
- race conditions still feel theoretical instead of concrete

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

### Use It When

- you are new to Java concurrency
- concurrency still feels invisible or mysterious
- you need the foundation before learning virtual threads or structured concurrency

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind concurrency basics and connect them back to the runnable examples.

## Why This Chapter Matters

This chapter exists for one reason: before virtual threads or modern APIs make sense, you need to understand what goes wrong when work overlaps in time.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

As soon as two tasks run concurrently, three things become important:

- how work starts
- how you wait for it
- what happens when both tasks touch the same mutable state

If that model is unclear, every later concurrency feature feels like extra syntax instead of clearer design.

## Core Ideas

Read the chapter as a small set of related ideas around concurrency Basics, not as isolated trivia.

## When To Use / When Not To Use

### Use It When

- you are new to Java concurrency
- concurrency still feels invisible or mysterious
- you need the foundation before learning virtual threads or structured concurrency

## The Problem

As soon as two tasks run concurrently, three things become important:

- how work starts
- how you wait for it
- what happens when both tasks touch the same mutable state

If that model is unclear, every later concurrency feature feels like extra syntax instead of clearer design.

## Run This First

1. Run [Threads.java](topics/threads/Threads.java)
2. Run [Synchronization.java](topics/synchronization/Synchronization.java)
3. Run [Executors.java](topics/executors/Executors.java)

## What To Look For

- `start()` and `run()` are not the same thing
- shared mutable state is where correctness starts to break
- executors improve structure by separating task submission from thread management

## Use This Chapter When

- you are new to Java concurrency
- concurrency still feels invisible or mysterious
- you need the foundation before learning virtual threads or structured concurrency

## Avoid Jumping Ahead When

- raw thread behavior is still unclear
- race conditions still feel theoretical instead of concrete

## Next Chapter

Move to `ch02_virtual_threads` after this chapter so you can compare “what a thread is” with “what changes when threads become much cheaper.”
