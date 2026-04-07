package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.pluggable_implementations;

import java.util.List;
import java.util.stream.Collectors;

public class PluggableImplementations {
    public static void main(String[] args) {
        explainWhy();
        runDiscountProviderExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- services support pluggable implementations behind one abstraction");
        System.out.println("- consumers depend on the contract, not the concrete class");
        System.out.println("- this is a boundary and extensibility tool");
    }

    private static void explainWhy() {
        System.out.println("Concept: service-style modular extension");
        System.out.println("Real-world problem: a checkout module may use different discount providers for different business rules.");
        System.out.println("Mental model: the consumer knows the interface, the runtime can choose the implementation.");
        System.out.println();
    }

    private static void runDiscountProviderExample() {
        List<DiscountService> services = availableServices();
        for (DiscountService service : services) {
            System.out.println(service.name() + " => " + service.discountPercent());
        }
        System.out.println("Why it matters: one consumer can work with multiple implementations without hard-coding one class.");
    }

    static List<DiscountService> availableServices() {
        return List.of(new FestivalDiscount(), new StudentDiscount());
    }

    static List<Integer> availableDiscountPercentages() {
        return availableServices().stream()
                .map(DiscountService::discountPercent)
                .collect(Collectors.toList());
    }

    interface DiscountService {
        String name();
        int discountPercent();
    }

    private static final class FestivalDiscount implements DiscountService {
        public String name() { return "festival"; }
        public int discountPercent() { return 15; }
    }

    private static final class StudentDiscount implements DiscountService {
        public String name() { return "student"; }
        public int discountPercent() { return 10; }
    }
}
