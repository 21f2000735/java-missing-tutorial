package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.exhaustive_sealed_branching;

public class ExhaustiveSealedBranching {
    public static void main(String[] args) {
        explainWhy();
        runPaymentExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- closed hierarchies make switch logic safer");
        System.out.println("- exhaustive branching is a modeling benefit");
        System.out.println("- this reduces the chance of silently missing a valid variant");
    }

    private static void explainWhy() {
        System.out.println("Concept: exhaustive branching over a sealed hierarchy");
        System.out.println("Real-world problem: checkout logic must handle every supported payment type.");
        System.out.println("Mental model: if the business allows only known variants, the switch should cover them all.");
        System.out.println();
    }

    private static void runPaymentExample() {
        Payment payment = new CardPayment();
        String result = switch (payment) {
            case CardPayment ignored -> "pay by card";
            case CashPayment ignored -> "pay by cash";
        };

        // Expected output:
        // paymentInstruction = pay by card
        System.out.println("paymentInstruction = " + result);
        System.out.println("Why it works: the sealed hierarchy tells Java the complete set of valid variants.");
    }

    private sealed interface Payment permits CardPayment, CashPayment {}
    private static final class CardPayment implements Payment {}
    private static final class CashPayment implements Payment {}
}
