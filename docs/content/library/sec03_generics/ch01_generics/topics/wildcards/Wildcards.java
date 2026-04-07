package com.learning.javamissing.sec03_generics.ch01_generics.topics.wildcards;

import java.util.ArrayList;
import java.util.List;

/**
 * Concept: Wildcards
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

public class Wildcards {
    public static void main(String[] args) {
        overview();
        wrongMentalModel();
        producerExample();
        consumerExample();
        compilerRuntimeView();
        interviewAngle();
        exercise();
        solution();
    }

    private static void overview() {
        System.out.println("Topic: Wildcards");
        System.out.println("Why this exists: method boundaries often need flexibility without throwing away type safety.");
        System.out.println("Problem it solves: exact type parameters can make reusable APIs too rigid for callers.");
        System.out.println("Right mental model: wildcards describe how values flow into and out of an API.");
        System.out.println();
    }

    private static void wrongMentalModel() {
        System.out.println("Wrong mental model:");
        System.out.println("Wildcards are not symbols to memorize blindly.");
        System.out.println("They are about whether your API reads values, writes values, or both.");
        System.out.println();
    }

    private static void producerExample() {
        // Expected output:
        // sum = 277 because the method reads Integer values through the Number view.
        List<Integer> scores = List.of(91, 87, 99);
        System.out.println("Producer example:");
        System.out.println("sum = " + sum(scores));
        System.out.println("Step-by-step: ? extends Number means the method can safely read values as Number.");
        System.out.println();
    }

    private static void consumerExample() {
        // Expected output:
        // numbers after add = [70, 80]
        List<Number> numbers = new ArrayList<>();
        addSampleScores(numbers);
        System.out.println("Consumer example:");
        System.out.println("numbers after add = " + numbers);
        System.out.println("Step-by-step: ? super Integer means the method can safely write Integer values into the destination.");
        System.out.println("Senior note: wildcards improve API flexibility at the call site when exact type parameters would be unnecessarily strict.");
        System.out.println();
    }

    private static void compilerRuntimeView() {
        System.out.println("What the compiler checks:");
        System.out.println("- ? extends Number is safe for reading as Number");
        System.out.println("- ? super Integer is safe for writing Integer values");
        System.out.println("Common rule:");
        System.out.println("- producer: extends");
        System.out.println("- consumer: super");
        System.out.println();
    }

    private static void interviewAngle() {
        System.out.println("Interview angle:");
        System.out.println("Q: Why is List<Object> not the same as List<String>?");
        System.out.println("A: Generic types are invariant, so the type system does not treat those lists as interchangeable.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Explain why a method that only reads values often prefers ? extends, while a method that writes values prefers ? super.");
        System.out.println();
    }

    private static void solution() {
        System.out.println("Solution:");
        System.out.println("Reading needs a safe upper view of the values, while writing needs a destination that can safely accept the written type.");
    }

    private static int sum(List<? extends Number> values) {
        return values.stream().mapToInt(Number::intValue).sum();
    }

    private static void addSampleScores(List<? super Integer> destination) {
        destination.add(70);
        destination.add(80);
    }
}
