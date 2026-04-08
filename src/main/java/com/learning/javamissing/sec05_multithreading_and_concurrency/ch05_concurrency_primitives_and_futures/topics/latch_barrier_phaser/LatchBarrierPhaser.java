package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.latch_barrier_phaser;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Phaser;

public class LatchBarrierPhaser {
    public static void main(String[] args) throws Exception {
        demoCountDownLatch();
        demoCyclicBarrier();
        demoPhaser();
        System.out.println("Why it matters: each tool waits differently, so choosing the right one keeps coordination readable.");
    }

    private static void demoCountDownLatch() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(2);
        Thread orders = new Thread(() -> finishTask("orders", latch));
        Thread payments = new Thread(() -> finishTask("payments", latch));
        orders.start();
        payments.start();
        latch.await();
        System.out.println("CountDownLatch merge = all preload tasks finished");
    }

    private static void finishTask(String name, CountDownLatch latch) {
        System.out.println(name + " loaded");
        latch.countDown();
    }

    private static void demoCyclicBarrier() throws InterruptedException, BrokenBarrierException {
        CyclicBarrier barrier = new CyclicBarrier(2, () -> System.out.println("CyclicBarrier merge = all workers reached the same checkpoint"));
        Thread first = new Thread(() -> awaitBarrier(barrier));
        Thread second = new Thread(() -> awaitBarrier(barrier));
        first.start();
        second.start();
        first.join();
        second.join();
    }

    private static void awaitBarrier(CyclicBarrier barrier) {
        try {
            barrier.await();
        } catch (Exception ignored) {
        }
    }

    private static void demoPhaser() {
        Phaser phaser = new Phaser(1);
        phaser.bulkRegister(2);
        Thread api = new Thread(() -> arrive(phaser, "api"));
        Thread cache = new Thread(() -> arrive(phaser, "cache"));
        api.start();
        cache.start();
        phaser.arriveAndAwaitAdvance();
        System.out.println("Phaser merge = dynamic parties can join and leave");
        phaser.arriveAndDeregister();
    }

    private static void arrive(Phaser phaser, String name) {
        System.out.println(name + " ready");
        phaser.arriveAndDeregister();
    }
}
