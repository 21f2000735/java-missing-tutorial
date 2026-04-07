package com.learning.javamissing.sec18_architecture_and_integration.ch03_building_for_many_languages.topics.showing_messages_by_locale;

import java.util.Locale;

/**
 * Concept: Showing Messages By Locale
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * users in different regions need adapted text and formats.
 *
 * Real-world setup:
 * This topic uses localized messages and regional output to make the concept easier to understand.
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

public class ShowingMessagesByLocale {
    public static void main(String[] args) {
        Locale locale = Locale.US;
        String message = locale.equals(Locale.US) ? "Order confirmed" : "Message unavailable";
        System.out.println("message = " + message);
        System.out.println("Concept: localization separates core behavior from user-facing language.");
    }
}
