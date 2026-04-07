package com.learning.javamissing.sec06_design_patterns.ch05_request_routing_patterns.topics.passing_requests_with_chain_of_responsibility;

/**
 * Concept: Chain of responsibility
 * Why this concept is needed:
 * Request handling often contains several independent checks that should stay separate.
 *
 * What problem this solves:
 * It breaks validation or middleware logic into small handlers that can pass the request onward.
 *
 * Real-world setup:
 * Checkout validation needs cart, address, and payment checks in sequence.
 *
 * How to think about it:
 * Each handler decides one rule and forwards the request only if that rule passes.
 *
 * How to code it:
 * 1. Define a base handler with a reference to the next handler.
 * 2. Let each handler own one rule.
 * 3. Stop early on failure or continue to the next handler.
 *
 * Expected output:
 * checkout validation = READY
 */
public class PassingRequestsWithChainOfResponsibility {
    public static void main(String[] args) {
        System.out.println("Concept: chain of responsibility");
        System.out.println("Problem: checkout validation should keep each rule separate and stop early on failure.");
        System.out.println();

        CheckoutHandler chain = new NotEmptyCartHandler(new AddressPresentHandler(new PaymentReadyHandler(null)));

        // Expected output:
        // checkout validation = READY
        System.out.println("checkout validation = " + chain.handle(new CheckoutRequest(true, true, true)));
        System.out.println("Why it works: each handler owns one decision and the chain controls the request flow.");
        System.out.println("Common mistake: hiding one simple validation method behind too many handlers when the rules are tiny and stable.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- each handler checks one rule");
        System.out.println("- the request moves down the chain until a rule fails or the chain finishes");
        System.out.println("- chain of responsibility fits request validation and middleware pipelines");
    }

    record CheckoutRequest(boolean hasItems, boolean hasAddress, boolean hasPayment) {}

    abstract static class CheckoutHandler {
        private final CheckoutHandler next;

        CheckoutHandler(CheckoutHandler next) {
            this.next = next;
        }

        final String handle(CheckoutRequest request) {
            String result = validate(request);
            if (!"READY".equals(result)) {
                return result;
            }
            return next == null ? "READY" : next.handle(request);
        }

        abstract String validate(CheckoutRequest request);
    }

    static final class NotEmptyCartHandler extends CheckoutHandler {
        NotEmptyCartHandler(CheckoutHandler next) {
            super(next);
        }

        @Override
        String validate(CheckoutRequest request) {
            return request.hasItems() ? "READY" : "Cart is empty";
        }
    }

    static final class AddressPresentHandler extends CheckoutHandler {
        AddressPresentHandler(CheckoutHandler next) {
            super(next);
        }

        @Override
        String validate(CheckoutRequest request) {
            return request.hasAddress() ? "READY" : "Address missing";
        }
    }

    static final class PaymentReadyHandler extends CheckoutHandler {
        PaymentReadyHandler(CheckoutHandler next) {
            super(next);
        }

        @Override
        String validate(CheckoutRequest request) {
            return request.hasPayment() ? "READY" : "Payment method missing";
        }
    }
}
