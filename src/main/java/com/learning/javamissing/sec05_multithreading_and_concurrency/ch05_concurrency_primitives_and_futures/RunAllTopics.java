package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.completable_future_deep_dive.CompletableFutureDeepDive;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.concurrent_hash_map_internals.ConcurrentHashMapInternals;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.latch_barrier_phaser.LatchBarrierPhaser;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.reentrant_lock_vs_synchronized.ReentrantLockVsSynchronized;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.thread_local_context.ThreadLocalContext;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.volatile_keyword.VolatileKeyword;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.locks_latches_and_futures.LocksLatchesAndFutures;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.visibility_and_volatile.VisibilityAndVolatile;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Volatile Keyword", () -> VolatileKeyword.main(args));
        run("Thread Local Context", () -> ThreadLocalContext.main(args));
        run("Latch Barrier Phaser", () -> LatchBarrierPhaser.main(args));
        run("Reentrant Lock Vs Synchronized", () -> ReentrantLockVsSynchronized.main(args));
        run("Completable Future Deep Dive", () -> CompletableFutureDeepDive.main(args));
        run("Concurrent HashMap Internals", () -> ConcurrentHashMapInternals.main(args));
        run("Visibility And Volatile", () -> VisibilityAndVolatile.main(args));
        run("Locks, Latches, And Futures", () -> LocksLatchesAndFutures.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
