package com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.creating_objects_with_factory_method;

public class CreatingObjectsWithFactoryMethod {
    public static void main(String[] args) {
        System.out.println("Concept: factory method");
        System.out.println("Problem: checkout code should request a payment gateway without branching everywhere.");
        System.out.println();

        PaymentGateway cardGateway = PaymentGatewayFactory.forMethod("CARD");
        PaymentGateway upiGateway = PaymentGatewayFactory.forMethod("UPI");

        // Expected output:
        // card result = CARD payment accepted for 1500
        // upi result = UPI payment accepted for 800
        System.out.println("card result = " + cardGateway.charge(1_500));
        System.out.println("upi result = " + upiGateway.charge(800));
        System.out.println("After reading this example, you should know:");
        System.out.println("- the caller asks for a type of behavior");
        System.out.println("- the factory decides the concrete class");
        System.out.println("- object creation stays in one place instead of spreading across the codebase");
    }

    interface PaymentGateway {
        String charge(int amountInCents);
    }

    static final class CardGateway implements PaymentGateway {
        @Override
        public String charge(int amountInCents) {
            return "CARD payment accepted for " + amountInCents;
        }
    }

    static final class UpiGateway implements PaymentGateway {
        @Override
        public String charge(int amountInCents) {
            return "UPI payment accepted for " + amountInCents;
        }
    }

    static final class PaymentGatewayFactory {
        static PaymentGateway forMethod(String paymentMethod) {
            return switch (paymentMethod) {
                case "CARD" -> new CardGateway();
                case "UPI" -> new UpiGateway();
                default -> throw new IllegalArgumentException("Unsupported payment method: " + paymentMethod);
            };
        }
    }
}
