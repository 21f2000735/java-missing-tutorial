package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.sealed_classes_pattern_matching_switch;

public class SealedClassesPatternMatchingSwitch {
    public static void main(String[] args) {
        PaymentResult first = new PaymentSuccess("ORD-77");
        PaymentResult second = new PaymentFailure("card-declined");

        System.out.println("Concept: sealed classes let switch handle every known subtype.");
        System.out.println(describe(first));
        System.out.println(describe(second));
        System.out.println("Why it matters: exhaustive matching makes result handling safer and easier to read.");
    }

    static String describe(PaymentResult result) {
        return switch (result) {
            case PaymentSuccess success -> "approved = " + success.orderId();
            case PaymentFailure failure -> "declined = " + failure.reason();
        };
    }

    sealed interface PaymentResult permits PaymentSuccess, PaymentFailure {
    }

    record PaymentSuccess(String orderId) implements PaymentResult {
    }

    record PaymentFailure(String reason) implements PaymentResult {
    }
}
