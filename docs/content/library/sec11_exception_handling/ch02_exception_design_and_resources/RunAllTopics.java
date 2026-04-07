package com.learning.javamissing.sec11_exception_handling.ch02_exception_design_and_resources;

import com.learning.javamissing.sec11_exception_handling.ch02_exception_design_and_resources.topics.checked_unchecked_and_custom.CheckedUncheckedAndCustom;
import com.learning.javamissing.sec11_exception_handling.ch02_exception_design_and_resources.topics.try_with_resources_and_chaining.TryWithResourcesAndChaining;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Checked, Unchecked, And Custom", () -> CheckedUncheckedAndCustom.main(args));
        run("Try-With-Resources And Chaining", () -> TryWithResourcesAndChaining.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
