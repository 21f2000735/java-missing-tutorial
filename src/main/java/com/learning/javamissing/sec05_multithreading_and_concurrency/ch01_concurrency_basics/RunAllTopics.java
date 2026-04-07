package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.executors.Executors;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.synchronization.Synchronization;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.threads.Threads;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Executors", () -> Executors.main(args));
        run("Synchronization", () -> Synchronization.main(args));
        run("Threads", () -> Threads.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
