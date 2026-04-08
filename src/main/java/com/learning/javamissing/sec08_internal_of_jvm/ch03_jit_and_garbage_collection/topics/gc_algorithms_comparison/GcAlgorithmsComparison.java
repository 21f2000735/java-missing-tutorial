package com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.gc_algorithms_comparison;

public class GcAlgorithmsComparison {
    public static void main(String[] args) {
        System.out.println("Concept: different GC algorithms optimize different tradeoffs.");
        System.out.println("Serial GC = single-threaded, simple, small heaps");
        System.out.println("Parallel GC = throughput focused, multi-threaded");
        System.out.println("G1 GC = region based, predictable pauses");
        System.out.println("ZGC = concurrent compaction, sub-10ms pauses");
        System.out.println("Shenandoah = concurrent evacuation");
        System.out.println("Flags: -XX:+UseG1GC, -XX:+UseZGC");
        System.out.println("Why it matters: the best GC depends on latency target, heap size, and throughput needs.");
    }
}
