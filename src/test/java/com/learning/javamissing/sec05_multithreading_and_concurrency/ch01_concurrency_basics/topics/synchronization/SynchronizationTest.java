package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.synchronization;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SynchronizationTest {
    @Test
    void synchronizedCounterReachesExpectedValue() throws InterruptedException {
        assertEquals(2_000, Synchronization.incrementWithTwoThreads(1_000));
    }
}
