package com.learning.javamissing.sec08_internal_of_jvm.ch01_memory_and_execution_basics.topics.gc_roots_and_references;

import java.lang.ref.WeakReference;
import java.util.WeakHashMap;

public class GcRootsAndReferences {
    private static final String STATIC_ROOT = "static-root";

    public static void main(String[] args) {
        String localRoot = "local-root";
        WeakHashMap<Object, String> cache = new WeakHashMap<>();
        Object weakKey = new Object();
        cache.put(weakKey, "cached report");

        WeakReference<String> weakReference = new WeakReference<>("ephemeral");

        System.out.println("GC roots = local variable, active thread, static field, and JNI-style references.");
        System.out.println("strong root = " + localRoot);
        System.out.println("static root = " + STATIC_ROOT);
        System.out.println("weak map size = " + cache.size());
        System.out.println("weak reference present = " + (weakReference.get() != null));
        System.out.println("Why it matters: strong, soft, weak, and phantom references control how caches and leaks behave.");
    }
}
