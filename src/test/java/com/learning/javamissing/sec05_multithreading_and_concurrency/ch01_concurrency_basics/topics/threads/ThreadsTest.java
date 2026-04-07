package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.threads;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ThreadsTest {
    @Test
    void safeCounterDemoCompletesWithTwoIncrements() throws InterruptedException {
        assertEquals(2, Threads.runSafeCounterDemo());
    }
}
