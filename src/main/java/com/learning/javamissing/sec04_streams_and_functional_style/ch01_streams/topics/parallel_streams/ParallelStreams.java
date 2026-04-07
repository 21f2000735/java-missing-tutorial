package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.parallel_streams;

import java.util.List;

/**
 * Concept: Parallel Streams
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * business code often filters, transforms, groups, and summarizes data.
 *
 * Real-world setup:
 * This topic uses order processing and reporting to make the concept easier to understand.
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

public class ParallelStreams {
    public static void main(String[] args) {
        wrongExample();
        // Expected output:
        // sequentialSum and parallelSum should match because the calculation itself is safe.
        List<Integer> values = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        int sequentialSum = sumOfSquaresSequential(values);
        int parallelSum = sumOfSquaresParallel(values);
        System.out.println("sequentialSum = " + sequentialSum);
        System.out.println("parallelSum = " + parallelSum);
        System.out.println("Lesson: parallel streams can speed up some workloads, but they are not always clearer or faster.");
        System.out.println("Common confusion: equal results do not prove parallel is faster. Measure before choosing it.");
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using parallel streams by default for tiny collections often adds overhead without helping.");
        System.out.println();
    }

    static int sumOfSquaresSequential(List<Integer> values) {
        return values.stream().mapToInt(ParallelStreams::slowSquare).sum();
    }

    static int sumOfSquaresParallel(List<Integer> values) {
        return values.parallelStream().mapToInt(ParallelStreams::slowSquare).sum();
    }

    static int slowSquare(int value) {
        return value * value;
    }
}
