package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.record_classes_deep_dive;

public class RecordClassesDeepDive {
    public static void main(String[] args) {
        Money total = new Money("INR", 499);
        Money sameTotal = new Money("INR", 499);

        System.out.println("Concept: records are compact data carriers with built-in equals, hashCode, and toString.");
        System.out.println("record = " + total);
        System.out.println("equals = " + total.equals(sameTotal));
        System.out.println("Why it matters: compact constructors let you validate data while keeping the class small.");
    }

    record Money(String currency, int amount) {
        Money {
            if (amount < 0) {
                throw new IllegalArgumentException("amount must be positive");
            }
        }
    }
}
