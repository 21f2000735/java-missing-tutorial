package com.learning.javamissing.sec07_principles_and_solid.ch02_immutability_and_value_objects;

import com.learning.javamissing.sec07_principles_and_solid.ch02_immutability_and_value_objects.topics.protecting_invoice_data.ProtectingInvoiceData;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Protecting Invoice Data", () -> ProtectingInvoiceData.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
