package com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects;

import com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.classes_objects.ClassesObjects;
import com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.inheritance.Inheritance;
import com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.polymorphism.Polymorphism;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Classes Objects", () -> ClassesObjects.main(args));
        run("Inheritance", () -> Inheritance.main(args));
        run("Polymorphism", () -> Polymorphism.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
