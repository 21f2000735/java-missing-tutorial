package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.hashmap_buckets_and_collisions;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HashMapBucketsAndCollisionsTest {
    @Test
    void retrievesValueEvenWhenKeysCollide() {
        Map<HashMapBucketsAndCollisions.CollidingKey, String> values = new HashMap<>();
        values.put(new HashMapBucketsAndCollisions.CollidingKey("A"), "ACTIVE");
        values.put(new HashMapBucketsAndCollisions.CollidingKey("B"), "BLOCKED");

        assertEquals("BLOCKED", values.get(new HashMapBucketsAndCollisions.CollidingKey("B")));
    }
}
