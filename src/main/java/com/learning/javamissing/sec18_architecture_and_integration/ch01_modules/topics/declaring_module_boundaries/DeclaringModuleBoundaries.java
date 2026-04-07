package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.declaring_module_boundaries;

public class DeclaringModuleBoundaries {
    public static void main(String[] args) {
        explainWhy();
        showDescriptorExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- module-info.java declares the module boundary");
        System.out.println("- it is the first place to read dependencies and exposed packages");
        System.out.println("- module design is about boundaries, not syntax memorization");
    }

    private static void explainWhy() {
        System.out.println("Concept: module descriptor");
        System.out.println("Real-world problem: a growing analytics system must make its public API and dependencies explicit.");
        System.out.println("Mental model: module-info is the contract at the module boundary.");
        System.out.println();
    }

    private static void showDescriptorExample() {
        String descriptor = descriptorText();

        // Expected output:
        // module com.learning.analytics {
        //     requires java.net.http;
        //     exports com.learning.analytics.api;
        // }
        System.out.println(descriptor);
        System.out.println("Why it matters: consumers can see the intended API package and required dependency clearly.");
    }

    static String descriptorText() {
        return """
                module com.learning.analytics {
                    requires java.net.http;
                    exports com.learning.analytics.api;
                }
                """;
    }
}
