package com.learning.javamissing.sec13_io_and_data_access.ch01_talking_to_databases.topics.querying_student_results;

import java.util.List;

/**
 * Concept: Querying Student Results
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * applications must move persistent data into useful objects.
 *
 * Real-world setup:
 * This topic uses stored student and business records to make the concept easier to understand.
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

public class QueryingStudentResults {
    public static void main(String[] args) {
        List<StudentResult> results = List.of(
                new StudentResult("Asha", 91),
                new StudentResult("Ravi", 78)
        );

        System.out.println("results = " + results);
        System.out.println("Concept: database work is about reading and shaping persistent data safely.");
    }

    record StudentResult(String studentName, int marks) {}
}
