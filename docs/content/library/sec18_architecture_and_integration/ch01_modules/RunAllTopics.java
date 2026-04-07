package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules;

import com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.module_boundaries.ModuleBoundaries;
import com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.declaring_module_boundaries.DeclaringModuleBoundaries;
import com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.pluggable_implementations.PluggableImplementations;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Module Boundaries", () -> ModuleBoundaries.main(args));
        run("Declaring Module Boundaries", () -> DeclaringModuleBoundaries.main(args));
        run("Pluggable Implementations", () -> PluggableImplementations.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
