package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.map_tradeoffs;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

public class MapTradeoffs {
    public static void main(String[] args) {
        System.out.println("Concept: different Map implementations optimize for different guarantees.");
        System.out.println("Real-world problem: a dashboard needs fast lookup, one report needs insertion order, and one admin screen needs sorted keys.");
        System.out.println();

        Map<String, Integer> scores = new HashMap<>();
        scores.put("charlie", 72);
        scores.put("alice", 95);
        scores.put("bob", 88);

        Map<String, Integer> insertionOrder = new LinkedHashMap<>(scores);
        Map<String, Integer> sortedOrder = new TreeMap<>(scores);

        // Expected output:
        // lookup alice = 95
        // insertion order keys = [charlie, alice, bob]
        // sorted order keys = [alice, bob, charlie]
        System.out.println("lookup alice = " + scores.get("alice"));
        System.out.println("insertion order keys = " + insertionOrder.keySet());
        System.out.println("sorted order keys = " + sortedOrder.keySet());
        System.out.println("Why it works: HashMap focuses on general lookup, LinkedHashMap remembers insertion order, and TreeMap keeps keys sorted.");
    }
}
