package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.making_decisions_and_repeating_work;

/**
 * Concept: Making Decisions And Repeating Work
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * small programs need clear values, decisions, and reusable methods.
 *
 * Real-world setup:
 * This topic uses student marks and simple shopping examples to make the concept easier to understand.
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

public class MakingDecisionsAndRepeatingWork {
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using a deeply nested if/else block for a tiny decision makes the code harder to read.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("Topic: Control Flow");
        System.out.println("Chapter: Java Basics");
        System.out.println("Why it matters: conditionals and loops decide which code runs and how often it runs.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // score = 73 and result = review
        int score = 73;
        String result = reviewStatus(score);

        System.out.println("Basic example:");
        System.out.println("score = " + score);
        System.out.println("result = " + result);
        System.out.println("Lesson: start with a clear if/else branch when the decision is simple.");
        System.out.println();
    }

    private static void betterExample() {
        // Expected output:
        // passes = 2 because only 81 and 92 are at least 75
        int[] scores = {81, 67, 92, 74};
        int passes = countAtLeast(scores, 75);

        System.out.println("Better example:");
        System.out.println("passes = " + passes);
        System.out.println("Lesson: use a for-each loop when you only need the values, not the index.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- forgetting braces when the block may grow later");
        System.out.println("- writing a loop that never changes the condition");
        System.out.println("- using complicated nested conditions before simplifying the logic");
        System.out.println("- mixing assignment and comparison by mistake");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("A switch expression must cover all possible results or use default.");
        System.out.println("A while loop checks the condition first, but a do-while loop runs the body once before checking.");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: When would you refactor nested if/else blocks?");
        System.out.println("A: Refactor when the logic becomes hard to read, repeats conditions, or can be expressed more clearly with guard clauses or a switch.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Count how many temperatures in {31, 29, 34, 28, 30} are at least 30.");
        System.out.println("Then write the loop in the clearest way you can.");
        System.out.println();
    }

    private static void solution() {
        int[] temperatures = {31, 29, 34, 28, 30};
        int warmDays = countAtLeast(temperatures, 30);

        System.out.println("Solution:");
        System.out.println("warmDays = " + warmDays);
        System.out.println("Why this is better: the loop is direct, the condition is easy to read, and the variable name explains the result.");
    }

    static String reviewStatus(int score) {
        return score >= 75 ? "pass" : "review";
    }

    static int countAtLeast(int[] values, int threshold) {
        int count = 0;
        for (int value : values) {
            if (value >= threshold) {
                count++;
            }
        }
        return count;
    }
}
