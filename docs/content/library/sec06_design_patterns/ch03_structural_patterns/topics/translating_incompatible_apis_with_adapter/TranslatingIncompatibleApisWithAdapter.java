package com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.translating_incompatible_apis_with_adapter;

/**
 * Concept: Adapter pattern
 * Why this concept is needed:
 * New code and legacy code often expose different interfaces even when they do similar work.
 *
 * What problem this solves:
 * It translates one API shape into another without rewriting the legacy dependency.
 *
 * Real-world setup:
 * A new payment service expects a clean PaymentProcessor interface, but a legacy gateway exposes makePayment().
 *
 * How to think about it:
 * Put the translation in one bridge class so the rest of the code can depend on the cleaner contract.
 *
 * How to code it:
 * 1. Define the interface your current code wants.
 * 2. Wrap the incompatible dependency.
 * 3. Translate method calls inside the adapter.
 *
 * Expected output:
 * result = legacy gateway paid 2300
 */
public class TranslatingIncompatibleApisWithAdapter {
    public static void main(String[] args) {
        System.out.println("Concept: adapter");
        System.out.println("Problem: new code expects pay(), but the legacy gateway exposes makePayment().");
        System.out.println();

        PaymentProcessor processor = new LegacyGatewayAdapter(new LegacyGateway());

        // Expected output:
        // result = legacy gateway paid 2300
        System.out.println("result = " + processor.pay(2_300));
        System.out.println("Why it works: only the adapter knows about the legacy API shape.");
        System.out.println("Common mistake: leaking the old API into the new code instead of keeping the translation local.");
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
