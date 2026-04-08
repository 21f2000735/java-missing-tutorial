# Concurrency Primitives And Futures Learning Kit

## Why This Chapter Exists

This chapter covers the concurrency tools teams reach for after raw threads are no longer enough.

## The Pain Before It

You may understand `Thread`, but real services also need visibility guarantees, safer coordination, and async result handling.

## Java Creator Mindset

- what `volatile` actually guarantees
- `synchronized` vs `ReentrantLock`
- `CountDownLatch`, `Semaphore`, and `CyclicBarrier` mental models
- `CompletableFuture` chaining basics

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- what `volatile` actually guarantees
- `synchronized` vs `ReentrantLock`
- `CountDownLatch`, `Semaphore`, and `CyclicBarrier` mental models
- `CompletableFuture` chaining basics

## Study Order

1. Run [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java)
2. Run [ConcurrentHashMap Internals](topics/concurrent_hash_map_internals/ConcurrentHashMapInternals.java)
3. Run [CountDownLatch Vs CyclicBarrier Vs Phaser](topics/latch_barrier_phaser/LatchBarrierPhaser.java)
4. Run [Locks Latches And Futures](topics/locks_latches_and_futures/LocksLatchesAndFutures.java)
5. Run [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java)
6. Run [ThreadLocal](topics/thread_local_context/ThreadLocalContext.java)
7. Run [Visibility And Volatile](topics/visibility_and_volatile/VisibilityAndVolatile.java)
8. Run [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why visibility and atomicity are different questions
- why coordination primitives solve different waiting problems
- why `CompletableFuture` is about workflow composition, not only background execution
