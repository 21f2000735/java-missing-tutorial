package com.learning.javamissing.sec16_core_data_time_and_text.ch05_numbers_and_formatting.topics.formatting_prices;

import java.text.NumberFormat;
import java.util.Locale;

/**
 * Concept: Formatting Prices
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * internal numeric values and displayed values serve different needs.
 *
 * Real-world setup:
 * This topic uses price and invoice presentation to make the concept easier to understand.
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

public class FormattingPrices {
    public static void main(String[] args) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);
        System.out.println("displayPrice = " + currencyFormat.format(1499.97));
        System.out.println("Concept: business data may be numeric internally but still needs human-friendly presentation.");
    }
}
