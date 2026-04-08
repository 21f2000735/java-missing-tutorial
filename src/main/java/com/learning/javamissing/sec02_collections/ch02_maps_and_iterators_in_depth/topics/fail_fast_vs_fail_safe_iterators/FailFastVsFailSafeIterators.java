package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.fail_fast_vs_fail_safe_iterators;

import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class FailFastVsFailSafeIterators {
    public static void main(String[] args) {
        List<String> failFast = new ArrayList<>(List.of("apple", "banana", "cherry"));
        System.out.println("Concept: ArrayList iterators are fail-fast.");
        try {
            for (String item : failFast) {
                if (item.equals("banana")) {
                    failFast.remove(item);
                }
            }
        } catch (ConcurrentModificationException exception) {
            System.out.println("fail-fast exception = " + exception.getClass().getSimpleName());
        }

        List<String> failSafe = new CopyOnWriteArrayList<>(List.of("order-1", "order-2"));
        for (String item : failSafe) {
            if (item.equals("order-1")) {
                failSafe.add("order-3");
            }
        }
        System.out.println("CopyOnWriteArrayList after iteration = " + failSafe);

        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("sku-1", 10);
        for (String key : concurrentMap.keySet()) {
            concurrentMap.put("sku-2", 20);
        }
        System.out.println("ConcurrentHashMap keys = " + concurrentMap.keySet());
        System.out.println("Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.");
    }
}
