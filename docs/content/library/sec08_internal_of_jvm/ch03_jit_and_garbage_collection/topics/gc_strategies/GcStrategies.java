package com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.gc_strategies;

import java.util.List;

public class GcStrategies {
    public static void main(String[] args) {
        System.out.println("Concept: different garbage collectors optimize for different tradeoffs.");
        List<String> collectors = List.of("G1", "ZGC", "Shenandoah");

        // Expected output:
        // G1 -> balanced default for many server workloads
        // ZGC -> very low pause time focus
        // Shenandoah -> low pause time with concurrent compaction focus
        System.out.println("G1 -> balanced default for many server workloads");
        System.out.println("ZGC -> very low pause time focus");
        System.out.println("Shenandoah -> low pause time with concurrent compaction focus");
        System.out.println("collector count = " + collectors.size());
        System.out.println("Use this when: you need a first mental model before reading deeper GC tuning material.");
    }
}
