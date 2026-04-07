package com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.binding_request_context.BindingRequestContext;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.introducing_scoped_values.IntroducingScopedValues;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.scoped_values_vs_thread_local.ScopedValuesVsThreadLocal;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Binding Request Context", () -> BindingRequestContext.main(args));
        run("Introducing Scoped Values", () -> IntroducingScopedValues.main(args));
        run("Scoped Values Vs Thread Local", () -> ScopedValuesVsThreadLocal.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
