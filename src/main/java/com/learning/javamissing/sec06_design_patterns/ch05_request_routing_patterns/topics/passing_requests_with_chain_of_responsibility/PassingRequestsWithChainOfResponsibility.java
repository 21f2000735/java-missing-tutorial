package com.learning.javamissing.sec06_design_patterns.ch05_request_routing_patterns.topics.passing_requests_with_chain_of_responsibility;

public class PassingRequestsWithChainOfResponsibility {
    public static void main(String[] args) {
        CheckoutHandler chain = new NotEmptyCartHandler(new AddressPresentHandler(new PaymentReadyHandler(null)));

        // Expected output:
        // checkout validation = READY
        System.out.println("checkout validation = " + chain.handle(new CheckoutRequest(true, true, true)));
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
