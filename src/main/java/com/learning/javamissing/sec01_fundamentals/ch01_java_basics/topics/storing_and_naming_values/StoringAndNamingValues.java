package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.storing_and_naming_values;

/**
 * Concept: Storing And Naming Values
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

public class StoringAndNamingValues {
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
        System.out.println("double price = 19.99;");
        System.out.println("double total = 3 * price;");
        System.out.println("Problem: this works, but double is a weak teaching choice for money because decimal precision can confuse beginners.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("Topic: Variables");
        System.out.println("Chapter: Java Basics");
        System.out.println("Why it matters: variables control type safety, readability, and how values move through a program.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // itemsInCart = 3, itemPrice = 499.99, total = 1499.97
        int itemsInCart = 3;
        double itemPrice = 499.99;
        double total = calculateCartTotal(itemsInCart, itemPrice);

        System.out.println("Basic example:");
        System.out.println("itemsInCart = " + itemsInCart);
        System.out.println("itemPrice = " + itemPrice);
        System.out.println("total = " + total);
        System.out.println("Lesson: choose names that explain what the value means.");
        System.out.println();
    }

    private static void betterExample() {
        // Expected output:
        // quantity = 3, priceInCents = 49999, totalInCents = 149997
        final int quantity = 3;
        final int priceInCents = 49_999;
        final int totalInCents = calculateRevenueInCents(quantity, priceInCents);

        System.out.println("Better example:");
        System.out.println("quantity = " + quantity);
        System.out.println("priceInCents = " + priceInCents);
        System.out.println("totalInCents = " + totalInCents);
        System.out.println("Lesson: use final when the value should not change, and prefer exact integer types for money in simple examples.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- using vague names like x, temp, or value when the meaning matters");
        System.out.println("- using double for money without understanding precision problems");
        System.out.println("- declaring a wider type than the problem needs");
        System.out.println("- changing a variable too often and making the code hard to trace");
        System.out.println();
    }

    private static void examTrap() {
        byte a = 10;
        byte b = 20;

        System.out.println("OCJP trap:");
        System.out.println("byte a = " + a + ", byte b = " + b);
        System.out.println("Question: why does byte c = a + b fail without an explicit cast?");
        System.out.println("Answer: arithmetic on byte values is promoted to int.");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: When would you use final for local variables?");
        System.out.println("A: Use final when the value should stay stable. It prevents accidental reassignment and makes the code easier to reason about.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Rewrite this idea with better variable choices:");
        System.out.println("int d = 7;");
        System.out.println("double p = 19.99;");
        System.out.println("double r = d * p;");
        System.out.println("Goal: improve naming and avoid using double for money.");
        System.out.println();
    }

    private static void solution() {
        final int daysSubscribed = 7;
        final int dailyPriceInCents = 1_999;
        final int revenueInCents = calculateRevenueInCents(daysSubscribed, dailyPriceInCents);

        System.out.println("Solution:");
        System.out.println("daysSubscribed = " + daysSubscribed);
        System.out.println("dailyPriceInCents = " + dailyPriceInCents);
        System.out.println("revenueInCents = " + revenueInCents);
        System.out.println("Why this is better: the names explain the intent, and the type choice avoids a basic money-precision issue.");
    }

    static double calculateCartTotal(int itemCount, double itemPrice) {
        return itemCount * itemPrice;
    }

    static int calculateRevenueInCents(int quantity, int priceInCents) {
        return quantity * priceInCents;
    }
}
