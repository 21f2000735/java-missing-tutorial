package com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.classes_objects;

/**
 * Concept: Classes Objects
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * real programs organize data and behavior into understandable units.
 *
 * Real-world setup:
 * This topic uses student, vehicle, and notification models to make the concept easier to understand.
 *
 * How to think about it:
 * First understand the problem in plain language, then map that idea to the Java code.
 *
 * How to code it:
 * 1. Identify the business data or behavior.
 * 2. Choose the Java construct that expresses the idea clearly.
 * 3. Run the example and compare the output with the explanation.
 *
 * Expected output:
 * Read the inline comments and printed lines in main() to see the expected behavior.
 */

public class ClassesObjects {
    public static void main(String[] args) {
        Student first = new Student("Asha", 92);
        Student second = new Student("Ravi", 76);
        System.out.println("students = " + first + ", " + second);
        System.out.println("topper = " + (first.score() > second.score() ? first.name() : second.name()));
        System.out.println("Lesson: a class or record groups related state and behavior into one unit.");
    }

    private record Student(String name, int score) {}
}
