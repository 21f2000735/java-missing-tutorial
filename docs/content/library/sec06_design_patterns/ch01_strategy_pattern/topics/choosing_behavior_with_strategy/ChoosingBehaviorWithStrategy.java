package com.learning.javamissing.sec06_design_patterns.ch01_strategy_pattern.topics.choosing_behavior_with_strategy;

public class ChoosingBehaviorWithStrategy {
    public static void main(String[] args) {
        System.out.println("Concept: choose one behavior through a strategy interface");
        System.out.println("Real-world problem: checkout uses different discount rules for students and festivals.");
        System.out.println();

        DiscountPolicy policy = new FestivalDiscount();
        int finalAmount = applyDiscount(2_000, policy);

        // Expected output:
        // finalAmount = 1700
        System.out.println("finalAmount = " + finalAmount);
        System.out.println("Why it works: checkout code depends on the DiscountPolicy contract, not one hard-coded rule.");
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
}
