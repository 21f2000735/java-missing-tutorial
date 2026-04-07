package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_hashmap_buckets_and_collisions;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UnderstandingHashMapBucketsAndCollisionsTest {
    @Test
    void retrievesValueEvenWhenKeysCollide() {
        Map<UnderstandingHashMapBucketsAndCollisions.CollidingKey, String> values = new HashMap<>();
        values.put(new UnderstandingHashMapBucketsAndCollisions.CollidingKey("A"), "ACTIVE");
        values.put(new UnderstandingHashMapBucketsAndCollisions.CollidingKey("B"), "BLOCKED");

        assertEquals("BLOCKED", values.get(new UnderstandingHashMapBucketsAndCollisions.CollidingKey("B")));
    }
}
