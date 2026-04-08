package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.hashmap_internals;

import java.util.HashMap;
import java.util.Map;

public class HashMapInternals {
    public static void main(String[] args) {
        Map<OrderKey, String> orders = new HashMap<>();
        OrderKey paid = new OrderKey("ORD-101");
        OrderKey packed = new OrderKey("ORD-202");

        orders.put(paid, "paid");
        orders.put(packed, "packed");

        System.out.println("Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.");
        System.out.println("get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("collision lookup = " + orders.get(new OrderKey("ORD-202")));

        paid.id = "ORD-999";
        System.out.println("after mutating the key, get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.");
    }

    static final class OrderKey {
        String id;

        OrderKey(String id) {
            this.id = id;
        }

        @Override
        public int hashCode() {
            return 42;
        }

        @Override
        public boolean equals(Object other) {
            return other instanceof OrderKey key && id.equals(key.id);
        }
    }
}
