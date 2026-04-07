package com.learning.javamissing.sec16_core_data_time_and_text.ch04_working_with_time.topics.scheduling_deliveries;

import java.time.LocalDate;

/**
 * Concept: Scheduling Deliveries
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * business time calculations need correct date types.
 *
 * Real-world setup:
 * This topic uses delivery and scheduling logic to make the concept easier to understand.
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

public class SchedulingDeliveries {
    public static void main(String[] args) {
        LocalDate orderDate = LocalDate.of(2026, 4, 7);
        LocalDate deliveryDate = orderDate.plusDays(3);
        System.out.println("orderDate = " + orderDate);
        System.out.println("deliveryDate = " + deliveryDate);
        System.out.println("Concept: model time with date types, not manual string math.");
    }
}
