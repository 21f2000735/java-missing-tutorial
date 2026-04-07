package com.learning.javamissing.sec03_generics.ch01_generics.topics.bounds;

import java.util.List;

/**
 * Concept: Bounds
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * one design often needs to work safely for many data types.
 *
 * Real-world setup:
 * This topic uses reusable containers and typed APIs to make the concept easier to understand.
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

public class Bounds {
    public static void main(String[] args) {
        overview();
        wrongMentalModel();
        smallExample();
        betterRealWorldExample();
        compilerRuntimeView();
        interviewAngle();
        exercise();
        solution();
    }

    private static void overview() {
        System.out.println("Topic: Bounds");
        System.out.println("Why this exists: reusable code sometimes still needs a guarantee about what a type can do.");
        System.out.println("Problem it solves: fully open generics are too loose when the code needs numeric or comparable behavior.");
        System.out.println("Right mental model: a bound is a capability requirement, not random syntax decoration.");
        System.out.println();
    }

    private static void wrongMentalModel() {
        System.out.println("Wrong mental model:");
        System.out.println("Bounds are not just exam syntax.");
        System.out.println("They define which kinds of types your reusable code can safely work with.");
        System.out.println();
    }

    private static void smallExample() {
        // Expected output:
        // average = 25.0 because the method can safely read numbers through Number.
        double average = average(List.of(10, 20, 30, 40));
        System.out.println("Small example:");
        System.out.println("average = " + average);
        System.out.println("Step-by-step: ? extends Number allows Integer values because Integer is a subtype of Number.");
        System.out.println();
    }

    private static void betterRealWorldExample() {
        // Expected output:
        // averageMonthlySales = 14250.0
        List<Integer> monthlySalesInCents = List.of(12_000, 14_500, 16_250);
        System.out.println("Better real-world example:");
        System.out.println("averageMonthlySales = " + average(monthlySalesInCents));
        System.out.println("Senior note: bounds let shared utility methods stay reusable without giving up type assumptions.");
        System.out.println();
    }

    private static void compilerRuntimeView() {
        System.out.println("What the compiler checks:");
        System.out.println("- the method accepts lists whose element types extend Number");
        System.out.println("- reading as Number is safe");
        System.out.println("What this means:");
        System.out.println("- the method can consume Integer, Double, Long, and similar numeric lists");
        System.out.println("- the method should not try to add arbitrary Number values back into that list");
        System.out.println();
    }

    private static void interviewAngle() {
        System.out.println("Interview angle:");
        System.out.println("Q: Why use an upper bound?");
        System.out.println("A: Because reusable code sometimes needs flexibility and a guaranteed capability at the same time.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Explain why average(List<String>) should fail at compile time.");
        System.out.println();
    }

    private static void solution() {
        System.out.println("Solution:");
        System.out.println("String does not extend Number, so the method contract rejects it before runtime.");
    }

    private static double average(List<? extends Number> numbers) {
        return numbers.stream().mapToDouble(Number::doubleValue).average().orElse(0);
    }
}
