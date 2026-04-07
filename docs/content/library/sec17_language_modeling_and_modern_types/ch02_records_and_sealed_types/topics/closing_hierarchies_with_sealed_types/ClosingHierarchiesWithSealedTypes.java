package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.closing_hierarchies_with_sealed_types;

public class ClosingHierarchiesWithSealedTypes {
    public static void main(String[] args) {
        explainWhy();
        runDeliveryStatusExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- sealed types define a closed family of allowed implementations");
        System.out.println("- this improves domain clarity");
        System.out.println("- a closed hierarchy helps downstream branching stay complete");
    }

    private static void explainWhy() {
        System.out.println("Concept: close a hierarchy on purpose");
        System.out.println("Real-world problem: delivery status should only have known business states.");
        System.out.println("Mental model: if outside code must not invent new variants, seal the hierarchy.");
        System.out.println();
    }

    private static void runDeliveryStatusExample() {
        DeliveryStatus status = new Delivered();

        // Expected output:
        // statusText = delivered
        System.out.println("statusText = " + describe(status));
        System.out.println("Why it works: the sealed interface limits valid states to the permitted classes.");
    }

    private static String describe(DeliveryStatus status) {
        return switch (status) {
            case Pending ignored -> "awaiting dispatch";
            case Shipped ignored -> "on the way";
            case Delivered ignored -> "delivered";
        };
    }

    private sealed interface DeliveryStatus permits Pending, Shipped, Delivered {}
    private static final class Pending implements DeliveryStatus {}
    private static final class Shipped implements DeliveryStatus {}
    private static final class Delivered implements DeliveryStatus {}
}
