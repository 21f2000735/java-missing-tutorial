package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.volatile_keyword;

import java.util.concurrent.atomic.AtomicInteger;

public class VolatileKeyword {
    private static volatile boolean shutdownRequested;
    private static volatile CacheConfig instance;

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

    private static void repeat(int times, AtomicInteger counter) {
        for (int i = 0; i < times; i++) {
            counter.incrementAndGet();
        }
    }

    private static CacheConfig getInstance() {
        if (instance == null) {
            synchronized (VolatileKeyword.class) {
                if (instance == null) {
                    instance = new CacheConfig();
                }
            }
        }
        return instance;
    }

    static final class CacheConfig {
    }
}
