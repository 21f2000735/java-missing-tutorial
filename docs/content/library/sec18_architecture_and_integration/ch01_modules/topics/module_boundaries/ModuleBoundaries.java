package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.module_boundaries;

public class ModuleBoundaries {
    public static void main(String[] args) {
        explainWhy();
        showStoreModuleExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- requires declares what this module needs");
        System.out.println("- exports declares what other modules may use");
        System.out.println("- good modular design exposes less, not more");
    }

    private static void explainWhy() {
        System.out.println("Concept: dependency side and visibility side of a module");
        System.out.println("Real-world problem: a store module depends on SQL but should expose only its API package.");
        System.out.println("Mental model: one keyword talks about incoming dependency, the other about outgoing visibility.");
        System.out.println();
    }

    private static void showStoreModuleExample() {
        String moduleInfo = storeModuleDescriptor();

        System.out.println(moduleInfo);
        System.out.println("Why it matters: database access is needed internally, but only the API package is public to other modules.");
    }

    static String storeModuleDescriptor() {
        return """
                module com.learning.store {
                    requires java.sql;
                    exports com.learning.store.api;
                }
                """;
    }
}
