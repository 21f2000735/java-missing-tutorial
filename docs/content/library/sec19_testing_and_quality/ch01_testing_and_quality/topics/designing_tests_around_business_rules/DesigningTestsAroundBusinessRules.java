package com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.designing_tests_around_business_rules;

public class DesigningTestsAroundBusinessRules {
    public static void main(String[] args) {
        explainWhy();
        runTaxRuleExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a good test starts from the business rule");
        System.out.println("- expected and actual values should be obvious");
        System.out.println("- readable tests are part of code design quality");
    }

    private static void explainWhy() {
        System.out.println("Concept: design the test around the rule, not around the framework");
        System.out.println("Real-world problem: checkout code adds tax to prices and must stay correct after changes.");
        System.out.println("Mental model: first state the rule, then express it in code.");
        System.out.println();
    }

    private static void runTaxRuleExample() {
        int expected = 2360;
        int actual = PriceCalculator.totalWithTax(2_000, 18);

        // Expected output:
        // expected = 2360
        // actual = 2360
        System.out.println("expected = " + expected);
        System.out.println("actual = " + actual);
        System.out.println("Why it matters: the business rule is visible before any test framework syntax appears.");
    }

    static final class PriceCalculator {
        static int totalWithTax(int priceInCents, int taxPercent) {
            return priceInCents + (priceInCents * taxPercent / 100);
        }
    }
}
