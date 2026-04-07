package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.avoiding_virtual_thread_misuse.AvoidingVirtualThreadMisuse;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.running_tasks_with_virtual_thread_executor.RunningTasksWithVirtualThreadExecutor;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.why_virtual_threads_matter.WhyVirtualThreadsMatter;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Avoiding Virtual Thread Misuse", () -> AvoidingVirtualThreadMisuse.main(args));
        run("Running Tasks With Virtual Thread Executor", () -> RunningTasksWithVirtualThreadExecutor.main(args));
        run("Why Virtual Threads Matter", () -> WhyVirtualThreadsMatter.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
