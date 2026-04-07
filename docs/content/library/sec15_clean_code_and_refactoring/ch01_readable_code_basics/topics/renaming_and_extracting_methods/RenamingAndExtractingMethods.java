package com.learning.javamissing.sec15_clean_code_and_refactoring.ch01_readable_code_basics.topics.renaming_and_extracting_methods;

public class RenamingAndExtractingMethods {
    public static void main(String[] args) {
        System.out.println("Concept: small names and extracted steps make code easier to read");
        System.out.println("Real-world problem: checkout total code becomes hard to follow when too much logic stays inline.");
        System.out.println();

        int subtotal = 2_000;
        int shipping = 150;
        int grandTotal = calculateGrandTotal(subtotal, shipping);

        // Expected output:
        // grandTotal = 2150
        System.out.println("grandTotal = " + grandTotal);
        System.out.println("Why it works: the main method reads at the business level while smaller methods carry the detail.");
    }

    static int calculateGrandTotal(int subtotal, int shipping) {
        return addShipping(subtotal, shipping);
    }

    private static int addShipping(int subtotal, int shipping) {
        return subtotal + shipping;
    }
}
