package com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.polymorphism;

import java.util.List;

/**
 * Concept: Polymorphism
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * real programs organize data and behavior into understandable units.
 *
 * Real-world setup:
 * This topic uses student, vehicle, and notification models to make the concept easier to understand.
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

public class Polymorphism {
    public static void main(String[] args) {
        List<Notification> notifications = List.of(new Email(), new Sms(), new Push());
        notifications.forEach(notification -> System.out.println(notification.send("Discount starts at 8 PM")));
        System.out.println("Lesson: the same interface call can trigger different behavior based on the actual object.");
    }

    private interface Notification {
        String send(String message);
    }

    private static final class Email implements Notification {
        public String send(String message) { return "EMAIL: " + message; }
    }

    private static final class Sms implements Notification {
        public String send(String message) { return "SMS: " + message; }
    }

    private static final class Push implements Notification {
        public String send(String message) { return "PUSH: " + message; }
    }
}
