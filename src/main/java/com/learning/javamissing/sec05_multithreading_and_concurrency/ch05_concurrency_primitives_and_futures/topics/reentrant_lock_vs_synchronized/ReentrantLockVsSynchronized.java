package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.reentrant_lock_vs_synchronized;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockVsSynchronized {
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

    private static synchronized void synchronizedExample() {
        System.out.println("synchronized example = monitor-based mutual exclusion");
    }

    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
    }
}
