package com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns;

import com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.assembling_objects_with_builder.AssemblingObjectsWithBuilder;
import com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.creating_objects_with_factory_method.CreatingObjectsWithFactoryMethod;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Creating Objects With Factory Method", () -> CreatingObjectsWithFactoryMethod.main(args));
        run("Assembling Objects With Builder", () -> AssemblingObjectsWithBuilder.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
