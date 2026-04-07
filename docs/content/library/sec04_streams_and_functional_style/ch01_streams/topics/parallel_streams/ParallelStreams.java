package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.parallel_streams;

import java.util.List;

/**
 * Concept: Parallel Streams
 * Why this concept is needed:
 * Some workloads can benefit from splitting independent work, but the tradeoff must be understood.
 *
 * What problem this solves:
 * It shows when parallel execution is a possible optimization for data processing.
 *
 * Real-world setup:
 * A reporting task calculates derived values over a collection of records.
 *
 * How to think about it:
 * Parallel is an execution choice, not a different business rule.
 *
 * How to code it:
 * 1. Write and understand the sequential version first.
 * 2. Compare with a parallel version that has no side effects.
 * 3. Measure before deciding it is worthwhile.
 *
 * Expected output:
 * sequentialSum = 204
 * parallelSum = 204
 */

public class ParallelStreams {
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("A large calculation may be split across workers, but only if the work is independent and worth the overhead.");
        System.out.println();
        wrongExample();
        // Expected output:
        // sequentialSum and parallelSum should match because the calculation itself is safe.
        List<Integer> values = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        int sequentialSum = sumOfSquaresSequential(values);
        int parallelSum = sumOfSquaresParallel(values);
        System.out.println("Run this example:");
        System.out.println("sequentialSum = " + sequentialSum);
        System.out.println("parallelSum = " + parallelSum);
        System.out.println("Why it works: the calculation is side-effect free, so sequential and parallel versions both produce the same answer.");
        System.out.println("Use this when: the workload is large, independent, and measured to benefit.");
        System.out.println("Avoid this when: the data is small or the pipeline depends on side effects.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- correct output does not prove parallel was a good choice");
        System.out.println("- side-effect free work is much safer for parallel execution");
        System.out.println("- parallel streams are an optimization decision, not a readability upgrade");
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
