package com.learning.javamissing.sec04_streams_and_functional_style.ch02_functional_interfaces;

import com.learning.javamissing.sec04_streams_and_functional_style.ch02_functional_interfaces.topics.defining_functions.DefiningFunctions;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Defining Functions", () -> DefiningFunctions.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
