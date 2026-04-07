package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.locks_latches_and_futures.LocksLatchesAndFutures;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.visibility_and_volatile.VisibilityAndVolatile;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Visibility And Volatile", () -> VisibilityAndVolatile.main(args));
        run("Locks, Latches, And Futures", () -> LocksLatchesAndFutures.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
