package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.concurrent_hash_map_internals;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapInternals {
    public static void main(String[] args) throws InterruptedException {
        Map<String, Integer> stock = new ConcurrentHashMap<>();
        stock.putIfAbsent("sku-1", 0);

        Thread first = new Thread(() -> addUnits(stock, "sku-1"));
        Thread second = new Thread(() -> addUnits(stock, "sku-1"));
        first.start();
        second.start();
        first.join();
        second.join();

        stock.computeIfAbsent("sku-2", key -> 50);
        System.out.println("sku-1 = " + stock.get("sku-1"));
        System.out.println("sku-2 = " + stock.get("sku-2"));
        System.out.println("Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.");
    }

    private static void addUnits(Map<String, Integer> stock, String sku) {
        for (int i = 0; i < 1000; i++) {
            stock.merge(sku, 1, Integer::sum);
        }
    }
}
