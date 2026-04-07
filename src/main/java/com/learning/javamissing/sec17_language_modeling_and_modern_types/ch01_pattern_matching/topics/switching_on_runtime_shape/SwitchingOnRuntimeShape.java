package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.switching_on_runtime_shape;

public class SwitchingOnRuntimeShape {
    public static void main(String[] args) {
        explainWhy();
        runNotificationExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- switch patterns let one branching point describe several runtime shapes");
        System.out.println("- guards add more precise decisions");
        System.out.println("- readable modeling matters more than fancy syntax");
    }

    private static void explainWhy() {
        System.out.println("Concept: pattern matching inside switch");
        System.out.println("Real-world problem: a notification handler receives different payload types.");
        System.out.println("Mental model: use one switch to describe what happens for each supported shape.");
        System.out.println();
    }

    private static void runNotificationExample() {
        Object input = 42;
        String description = switch (input) {
            case Integer value when value > 40 -> "large integer";
            case Integer value -> "small integer";
            case String text -> "text of length " + text.length();
            default -> "something else";
        };

        // Expected output:
        // description = large integer
        System.out.println("description = " + description);
        System.out.println("Why it works: the guard narrows the Integer case before choosing the result.");
    }
}
