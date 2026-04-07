package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.designing_small_methods;

/**
 * Concept: Designing Small Methods
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

public class DesigningSmallMethods {
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
        System.out.println("A method named process() that prints, calculates, and updates state at the same time is hard to reuse.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("Topic: Methods");
        System.out.println("Chapter: Java Basics");
        System.out.println("Why it matters: methods break work into named units so code is easier to test, read, and reuse.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // welcome message = Welcome, Asha!
        System.out.println("Basic example:");
        System.out.println("welcome message = " + formatWelcomeMessage("Asha"));
        System.out.println("Lesson: give a method one clear job and return a value instead of printing everywhere.");
        System.out.println();
    }

    private static void betterExample() {
        // Expected output:
        // itemCount = 3, subtotalInCents = 4497, deliveryFeeInCents = 299, totalInCents = 4796
        OrderSummary summary = calculateOrderSummary(3, 1_499);

        System.out.println("Better example:");
        System.out.println("itemCount = " + summary.itemCount());
        System.out.println("subtotalInCents = " + summary.subtotalInCents());
        System.out.println("deliveryFeeInCents = " + summary.deliveryFeeInCents());
        System.out.println("totalInCents = " + summary.totalInCents());
        System.out.println("Lesson: a method becomes easier to use when its inputs and outputs are explicit.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- creating methods that do too many things");
        System.out.println("- using unclear names like process() or handle()");
        System.out.println("- hiding important work behind side effects");
        System.out.println("- overloading methods until the call site becomes confusing");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("Java uses pass-by-value.");
        System.out.println("A method receives a copy of the reference value, not direct access to the caller variable itself.");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: What makes a method easy to maintain?");
        System.out.println("A: A clear name, a single responsibility, predictable input and output, and very small side effects.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Write a method that returns the bigger of two numbers without printing inside the method.");
        System.out.println("Then call it with 14 and 9.");
        System.out.println();
    }

    private static void solution() {
        int bigger = max(14, 9);

        System.out.println("Solution:");
        System.out.println("max(14, 9) = " + bigger);
        System.out.println("Why this is better: the method returns a value, so the caller decides how to use it.");
    }

    static String formatWelcomeMessage(String learnerName) {
        return "Welcome, " + learnerName + "!";
    }

    static OrderSummary calculateOrderSummary(int itemCount, int itemPriceInCents) {
        int subtotal = itemCount * itemPriceInCents;
        int deliveryFee = subtotal >= 5_000 ? 0 : 299;
        return new OrderSummary(itemCount, subtotal, deliveryFee, subtotal + deliveryFee);
    }

    static int max(int left, int right) {
        return left >= right ? left : right;
    }

    static int calculateOrderTotalInCents(int itemCount, int itemPriceInCents) {
        return calculateOrderSummary(itemCount, itemPriceInCents).totalInCents();
    }

    record OrderSummary(int itemCount, int subtotalInCents, int deliveryFeeInCents, int totalInCents) {}
}
