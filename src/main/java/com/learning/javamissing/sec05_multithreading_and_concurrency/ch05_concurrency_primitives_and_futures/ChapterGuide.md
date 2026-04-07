# Concurrency Primitives And Futures Learning Kit

This chapter covers the concurrency tools teams reach for after raw threads are no longer enough.

## The Problem

You may understand `Thread`, but real services also need visibility guarantees, safer coordination, and async result handling.

## Study Order

1. Run [VisibilityAndVolatile.java](topics/visibility_and_volatile/VisibilityAndVolatile.java)
2. Run [LocksLatchesAndFutures.java](topics/locks_latches_and_futures/LocksLatchesAndFutures.java)

## What This Chapter Covers

- what `volatile` actually guarantees
- `synchronized` vs `ReentrantLock`
- `CountDownLatch`, `Semaphore`, and `CyclicBarrier` mental models
- `CompletableFuture` chaining basics

## After Reading This Chapter, You Should Know

- why visibility and atomicity are different questions
- why coordination primitives solve different waiting problems
- why `CompletableFuture` is about workflow composition, not only background execution
