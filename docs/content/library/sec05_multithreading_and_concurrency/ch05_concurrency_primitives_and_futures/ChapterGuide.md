# Concurrency Primitives And Futures Learning Kit

## Learning Path

1. Step 1: Start with [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java) to see the raw behavior.
2. Step 2: Try [ConcurrentHashMap Internals](topics/concurrent_hash_map_internals/ConcurrentHashMapInternals.java) to see the naive approach.
3. Step 3: Watch [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java) to find the failure.
4. Step 4: Use [Visibility And Volatile](topics/visibility_and_volatile/VisibilityAndVolatile.java) to restore correctness.
5. Step 5: Finish with [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java) to see the improvement.

## Problem

This chapter shows what breaks when concurrency primitives and futures is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java)
2. Run [ConcurrentHashMap Internals](topics/concurrent_hash_map_internals/ConcurrentHashMapInternals.java)
3. Run [CountDownLatch Vs CyclicBarrier Vs Phaser](topics/latch_barrier_phaser/LatchBarrierPhaser.java)
4. Run [Locks Latches And Futures](topics/locks_latches_and_futures/LocksLatchesAndFutures.java)
5. Run [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java)
6. Run [ThreadLocal](topics/thread_local_context/ThreadLocalContext.java)
7. Run [Visibility And Volatile](topics/visibility_and_volatile/VisibilityAndVolatile.java)
8. Run [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java)

Example:

```java
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock lock = new ReentrantLock(true);
        CountDownLatch started = new CountDownLatch(1);

        Thread holder = new Thread(() -> {
            lock.lock();
            try {
                started.countDown();
                sleep(100);
            } finally {
                lock.unlock();
            }
        });

        Thread contender = new Thread(() -> {
            try {
                started.await();
                boolean acquired = lock.tryLock(30, TimeUnit.MILLISECONDS);
                System.out.println("tryLock acquired = " + acquired);
                if (acquired) {
                    lock.unlock();
                }
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        });

        holder.start();
        contender.start();
        holder.join();
        contender.join();

        synchronizedExample();
        System.out.println("Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.");
    }
```

What happens:

- synchronized example = monitor-based mutual exclusion

Why it matters:

After this chapter, you can explain the rule behind concurrency primitives and futures and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        try {
            Thread worker = new Thread(() -> {
                while (!shutdownRequested) {
                    // wait for the visible stop signal
                }
                System.out.println("worker observed shutdown = true");
            });

            worker.start();
            Thread.sleep(20);
            shutdownRequested = true;
            worker.join();

            AtomicInteger processed = new AtomicInteger();
            Thread first = new Thread(() -> repeat(1000, processed));
            Thread second = new Thread(() -> repeat(1000, processed));
            first.start();
            second.start();
            first.join();
            second.join();

            System.out.println("AtomicInteger count = " + processed.get());
            System.out.println("singleton hash = " + getInstance().hashCode());
            System.out.println("same singleton hash = " + getInstance().hashCode());
            System.out.println("Why it matters: volatile gives visibility, but AtomicInteger is still needed for atomic updates.");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
    }
```

What happens:

- volatile gives visibility, but AtomicInteger is still needed for atomic updates.

Why it matters:

After this chapter, you can explain the rule behind concurrency primitives and futures and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Concurrency Primitives And Futures exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java), [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java), and [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java) starts with the raw behavior, [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java) adds the safety rule, and [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [CompletableFuture Deep Dive](topics/completable_future_deep_dive/CompletableFutureDeepDive.java) and note the first thing that breaks.
- Run [ReentrantLock Vs Synchronized](topics/reentrant_lock_vs_synchronized/ReentrantLockVsSynchronized.java) and remove the safety rule or coordination step.
- Run [Volatile Keyword](topics/volatile_keyword/VolatileKeyword.java) and compare the result with the naive approach.
