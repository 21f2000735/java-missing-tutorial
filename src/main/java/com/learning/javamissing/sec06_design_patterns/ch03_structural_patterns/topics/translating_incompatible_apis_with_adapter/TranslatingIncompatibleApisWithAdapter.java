package com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.translating_incompatible_apis_with_adapter;

public class TranslatingIncompatibleApisWithAdapter {
    public static void main(String[] args) {
        PaymentProcessor processor = new LegacyGatewayAdapter(new LegacyGateway());

        // Expected output:
        // result = legacy gateway paid 2300
        System.out.println("result = " + processor.pay(2_300));
        System.out.println("After reading this example, you should know:");
        System.out.println("- adapter lets new code depend on a cleaner interface");
        System.out.println("- legacy code stays untouched");
        System.out.println("- the translation logic lives in one bridge class");
    }

    interface PaymentProcessor {
        String pay(int amountInCents);
    }

    static final class LegacyGateway {
        String makePayment(int amountInCents) {
            return "legacy gateway paid " + amountInCents;
        }
    }

    static final class LegacyGatewayAdapter implements PaymentProcessor {
        private final LegacyGateway legacyGateway;

        LegacyGatewayAdapter(LegacyGateway legacyGateway) {
            this.legacyGateway = legacyGateway;
        }

        @Override
        public String pay(int amountInCents) {
            return legacyGateway.makePayment(amountInCents);
        }
    }
}
