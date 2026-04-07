package com.learning.javamissing.sec06_design_patterns.ch01_strategy_pattern.topics.choosing_behavior_with_strategy;

/**
 * Concept: Strategy pattern
 * Why this concept is needed:
 * Business rules often change faster than the workflow that uses them.
 *
 * What problem this solves:
 * It removes growing conditional logic from the caller when one behavior can vary.
 *
 * Real-world setup:
 * Checkout needs different discount rules for festival, student, and premium customers.
 *
 * How to think about it:
 * Keep the stable workflow in one place and move the changing rule behind a small contract.
 *
 * How to code it:
 * 1. Define the behavior contract.
 * 2. Add one implementation per rule.
 * 3. Pass the chosen strategy into the stable workflow.
 *
 * Expected output:
 * festivalFinalAmount = 1700
 * studentFinalAmount = 1800
 */
public class ChoosingBehaviorWithStrategy {
    public static void main(String[] args) {
        System.out.println("Concept: choose one behavior through a strategy interface");
        System.out.println("Story hook: the checkout flow stays the same, but marketing keeps adding new discount campaigns every month.");
        System.out.println("Real-world problem: checkout uses different discount rules for students and festivals.");
        System.out.println("Mental model: checkout should not know every discount formula.");
        System.out.println();

        int festivalFinalAmount = applyDiscount(2_000, new FestivalDiscount());
        int studentFinalAmount = applyDiscount(2_000, new StudentDiscount());

        // Expected output:
        // festivalFinalAmount = 1700
        // studentFinalAmount = 1800
        System.out.println("festivalFinalAmount = " + festivalFinalAmount);
        System.out.println("studentFinalAmount = " + studentFinalAmount);
        System.out.println("Why it works: checkout depends on the DiscountPolicy contract, not one hard-coded rule.");
        System.out.println("Use this when: one small part of the workflow changes often while the surrounding flow stays stable.");
        System.out.println("Avoid this when: you only have one or two tiny rules and they are unlikely to grow.");
        System.out.println("Common mistake: replacing one huge switch with many strategies when the rule set is still tiny and stable.");
        System.out.println("Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.");
        System.out.println("Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- strategy moves changing behavior behind a contract");
        System.out.println("- the caller stays stable while rules grow independently");
        System.out.println("- strategy is strongest when behavior changes more often than the workflow");
    }

    static int applyDiscount(int amount, DiscountPolicy policy) {
        return amount - policy.discountFor(amount);
    }

    interface DiscountPolicy {
        int discountFor(int amount);
    }

    static final class FestivalDiscount implements DiscountPolicy {
        public int discountFor(int amount) {
            return 300;
        }
    }

    static final class StudentDiscount implements DiscountPolicy {
        public int discountFor(int amount) {
            return 200;
        }
    }
}
