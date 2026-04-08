package com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection;

import com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.gc_algorithms_comparison.GcAlgorithmsComparison;
import com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.jit_and_tiered_compilation.JitAndTieredCompilation;
import com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.gc_strategies.GcStrategies;
import com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.jit_basics.JitBasics;

public class RunAllTopics {
    public static void main(String[] args) {
        run("JIT Basics", () -> JitBasics.main(args));
        run("GC Strategies", () -> GcStrategies.main(args));
        run("GC Algorithms Comparison", () -> GcAlgorithmsComparison.main(args));
        run("JIT And Tiered Compilation", () -> JitAndTieredCompilation.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
