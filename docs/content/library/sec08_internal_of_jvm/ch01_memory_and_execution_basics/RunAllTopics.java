package com.learning.javamissing.sec08_internal_of_jvm.ch01_memory_and_execution_basics;

import com.learning.javamissing.sec08_internal_of_jvm.ch01_memory_and_execution_basics.topics.gc_roots_and_references.GcRootsAndReferences;
import com.learning.javamissing.sec08_internal_of_jvm.ch01_memory_and_execution_basics.topics.understanding_stack_heap_and_references.UnderstandingStackHeapAndReferences;

public class RunAllTopics {
    public static void main(String[] args) {
        System.out.println("=== GC Roots And References ===");
        GcRootsAndReferences.main(args);
        System.out.println();
        System.out.println("=== Understanding Stack Heap And References ===");
        UnderstandingStackHeapAndReferences.main(args);
    }
}
