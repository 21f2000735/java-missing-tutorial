package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.modeling_immutable_data_with_records;

public class ModelingImmutableDataWithRecords {
    public static void main(String[] args) {
        explainWhy();
        runInvoiceExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- records fit transparent immutable data");
        System.out.println("- the main value is clearer modeling, not only fewer lines");
        System.out.println("- record components become the natural API of the value");
    }

    private static void explainWhy() {
        System.out.println("Concept: record as a value-focused data type");
        System.out.println("Real-world problem: an invoice summary has stable fields and no custom identity lifecycle.");
        System.out.println("Mental model: when the data is the main point of the type, a record is a strong fit.");
        System.out.println();
    }

    private static void runInvoiceExample() {
        Order order = new Order("INV-2026", 2499);

        // Expected output:
        // orderId = INV-2026
        // amountInCents = 2499
        // printable = Order[id=INV-2026, amountInCents=2499]
        System.out.println("orderId = " + order.id());
        System.out.println("amountInCents = " + order.amountInCents());
        System.out.println("printable = " + order);
        System.out.println("Why it works: the record exposes its components directly and provides a useful value-style toString.");
    }

    private record Order(String id, int amountInCents) {}
}
