package com.learning.javamissing.sec03_generics.ch01_generics.topics.generic_type;

/**
 * Concept: Generic Type
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

public class GenericType {
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
        System.out.println("Topic: Generic Type");
        System.out.println("Why this exists: one reusable container should work for many data types without unsafe casts.");
        System.out.println("Problem it solves: duplicate classes like StudentBox, ReportBox, and InvoiceBox are wasteful and error-prone.");
        System.out.println("Right mental model: generics are compile-time contracts for reusable APIs.");
        System.out.println();
    }

    private static void wrongMentalModel() {
        System.out.println("Wrong mental model:");
        System.out.println("Generics are not only fancy angle brackets.");
        System.out.println("They are how Java lets one design stay reusable and type-safe at the same time.");
        System.out.println();
    }

    private static void smallExample() {
        // Expected output:
        // nameBox holds a String and scoreBox holds an Integer without casts.
        Box<String> nameBox = new Box<>("Asha");
        Box<Integer> scoreBox = new Box<>(95);
        System.out.println("Small example:");
        System.out.println("nameBox = " + nameBox.value());
        System.out.println("scoreBox = " + scoreBox.value());
        System.out.println("Step-by-step: the same Box<T> design works for different types because T changes with each use.");
        System.out.println();
    }

    private static void betterRealWorldExample() {
        // Expected output:
        // reportBox holds a SalesReport and the compiler preserves type safety.
        Box<SalesReport> reportBox = new Box<>(new SalesReport("APR-2026", 42));
        SalesReport report = reportBox.value();
        System.out.println("Better real-world example:");
        System.out.println("reportBox = " + reportBox);
        System.out.println("report.month = " + report.month());
        System.out.println("report.ordersProcessed = " + report.ordersProcessed());
        System.out.println("Senior note: this keeps reusable infrastructure generic while preserving domain meaning at the call site.");
        System.out.println();
    }

    private static void compilerRuntimeView() {
        System.out.println("What the compiler checks:");
        System.out.println("- Box<String> accepts a String value");
        System.out.println("- Box<Integer> accepts an Integer value");
        System.out.println("- assignments stay type-safe without manual casts");
        System.out.println("What happens at runtime:");
        System.out.println("- most generic type detail is erased");
        System.out.println("- generics mainly protect you before the code runs");
        System.out.println();
    }

    private static void interviewAngle() {
        System.out.println("Interview angle:");
        System.out.println("Q: Why are generics better than Object plus casts?");
        System.out.println("A: Generics move many mistakes to compile time and make APIs easier to understand.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Create a Box<Invoice> and explain why the compiler protects you from putting the wrong type inside it.");
        System.out.println();
    }

    private static void solution() {
        Box<Invoice> invoiceBox = new Box<>(new Invoice("INV-7", 4_500));
        System.out.println("Solution:");
        System.out.println("invoiceBox = " + invoiceBox);
        System.out.println("Why this works: Box<Invoice> commits the container to one domain type, so misuse is blocked earlier.");
    }

    private record Box<T>(T value) {}
    private record SalesReport(String month, int ordersProcessed) {}
    private record Invoice(String invoiceNumber, int totalInCents) {}
}
