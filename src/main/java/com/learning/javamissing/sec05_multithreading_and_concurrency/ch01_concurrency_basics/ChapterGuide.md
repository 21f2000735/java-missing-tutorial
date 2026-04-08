# Concurrency Basics Learning Kit

## Problem

Goal: understand what breaks when work overlaps.

## Naive Approach

Create a thread whenever you need work and let each task touch shared data directly.

## Failure

- `run()` does not create a new thread
- `count++` is not safe when two threads share the same field
- raw threads make ownership and cleanup hard to scale

## Fix

Run the topics in this order:

1. Run [Executors](topics/executors/Executors.java)
2. Run [Synchronization](topics/synchronization/Synchronization.java)
3. Run [Threads](topics/threads/Threads.java)

What to observe:

- Which topic shows the failure first: [Executors](topics/executors/Executors.java).
- Which topic narrows the rule: [Synchronization](topics/synchronization/Synchronization.java).
- Which topic shows the cleaner abstraction: [Threads](topics/threads/Threads.java).

## Improvement

`Threads` shows how work starts, `Synchronization` shows what happens when shared state is unsafe, and `Executors` show how task submission and worker management separate cleanly.

After this chapter, you should be able to explain why Concurrency Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: `Threads` shows how work starts, `Synchronization` shows what happens when shared state is unsafe, and `Executors` show how task submission and worker management separate cleanly.

## Try this

- Run [Executors](topics/executors/Executors.java) and note the first thing that breaks.
- Run [Synchronization](topics/synchronization/Synchronization.java) and write down what the rule becomes.
- Run [Threads](topics/threads/Threads.java) and compare the result with the naive approach.
