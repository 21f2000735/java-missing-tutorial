# Concurrency Basics Learning Kit

## Problem

Concurrency starts with one hard fact: two units of work can overlap in time.

## Naive Approach

- calling run() directly and expecting a new thread
- sharing mutable state before understanding the execution model

## Failure

- Threads: calling run() directly and expecting a new thread
- Threads: sharing mutable state before understanding the execution model
- Synchronization: assuming count++ is safe because it is one short line
- Executors: creating a brand-new thread for every small task

## Fix

Run the topics in this order:

1. Run [Threads](topics/threads/Threads.java)
2. Run [Synchronization](topics/synchronization/Synchronization.java)
3. Run [Executors](topics/executors/Executors.java)

Example:

```java
    public static void main(String[] args) throws InterruptedException {
        System.out.println("The problem:");
        System.out.println("Two tasks update the same counter. Without protection, some increments may disappear.");
        System.out.println();
        wrongExample();

        int count = incrementWithTwoThreads(1_000);
        System.out.println("Run this example:");
        System.out.println("count = " + count);
        System.out.println("Why it works: only one thread can execute the synchronized counter logic at a time.");
        System.out.println("Use this when: threads really share mutable state and correctness matters.");
        System.out.println("Avoid this when: state can be isolated instead of shared.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- synchronization protects invariants on shared mutable state");
        System.out.println("- count++ is not safe just because it looks small");
        System.out.println("- isolated state is often simpler than shared synchronized state");
    }
```

What happens:

- Why it works: only one thread can execute the synchronized counter logic at a time.
- Use this when: threads really share mutable state and correctness matters.
- Avoid this when: state can be isolated instead of shared.

Why it matters:

Overlapping access to shared mutable state causes bugs that are hard to reproduce.

## Improvement

Example:

```java
    public static void main(String[] args) throws Exception {
        overview();
        wrongExample();
        TaskSummary summary = computeReportLengthAndRetryCount();
        System.out.println("Run this example:");
        System.out.println("reportLength = " + summary.reportLength());
        System.out.println("retryCount = " + summary.retryCount());
        System.out.println("Why it works: task logic is separate from thread creation and waiting.");
        System.out.println("Use this when: many tasks need cleaner lifecycle management than raw threads.");
        System.out.println("Avoid this when: you are only trying to understand what a thread is doing at the lowest level.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- executors separate task submission from worker management");
        System.out.println("- Futures let you wait for task results explicitly");
        System.out.println("- executor-based code usually scales better as systems grow");
    }
```

What happens:

- Why it works: task logic is separate from thread creation and waiting.
- Use this when: many tasks need cleaner lifecycle management than raw threads.
- Avoid this when: you are only trying to understand what a thread is doing at the lowest level.

Why it matters:

Most production code should separate task submission from low-level thread management.

After this chapter, you should be able to explain why Concurrency Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Threads](topics/threads/Threads.java), [Synchronization](topics/synchronization/Synchronization.java), and [Executors](topics/executors/Executors.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Threads](topics/threads/Threads.java) starts with the raw behavior, [Synchronization](topics/synchronization/Synchronization.java) adds the safety rule, and [Executors](topics/executors/Executors.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Shared state needs one safety rule, not lucky timing.

## Try this

- Run [Threads](topics/threads/Threads.java) and note the first thing that breaks.
- Run [Synchronization](topics/synchronization/Synchronization.java) and remove the safety rule or coordination step.
- Run [Executors](topics/executors/Executors.java) and compare the result with the naive approach.
