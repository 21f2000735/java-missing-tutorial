package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.locks_latches_and_futures;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.locks.ReentrantLock;

public class LocksLatchesAndFutures {
    public static void main(String[] args) {
        try {
            ReentrantLock lock = new ReentrantLock();
            CountDownLatch latch = new CountDownLatch(2);
            InventoryCounter counter = new InventoryCounter();

            Runnable task = () -> {
                lock.lock();
                try {
                    counter.increment();
                } finally {
                    lock.unlock();
                    latch.countDown();
                }
            };

            new Thread(task).start();
            new Thread(task).start();
            latch.await();

            CompletableFuture<String> report = CompletableFuture
                    .supplyAsync(() -> "count=" + counter.value)
                    .thenApply(value -> "report:" + value);

            // Expected output:
            // counter = 2
            // async report = report:count=2
            System.out.println("counter = " + counter.value);
            System.out.println("async report = " + report.join());
            System.out.println("Why it works: the lock protects updates, the latch waits for both tasks, and CompletableFuture builds an async result pipeline.");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            System.out.println("interrupted while waiting for coordinated tasks");
        }
    }

    static final class InventoryCounter {
        private int value;

        void increment() {
            value += 1;
        }
    }
}
