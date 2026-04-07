package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_hashmap_buckets_and_collisions;

import java.util.HashMap;
import java.util.Map;

public class UnderstandingHashMapBucketsAndCollisions {
    public static void main(String[] args) {
        Map<CollidingKey, String> sessions = new HashMap<>();
        sessions.put(new CollidingKey("user-101"), "ACTIVE");
        sessions.put(new CollidingKey("user-205"), "EXPIRED");
        sessions.put(new CollidingKey("user-309"), "LOCKED");

        // Expected output:
        // status = EXPIRED
        // sameBucketCount = 3
        System.out.println("status = " + sessions.get(new CollidingKey("user-205")));
        System.out.println("sameBucketCount = " + sessions.size());
        System.out.println("After reading this example, you should know:");
        System.out.println("- HashMap lookup is usually O(1) on average");
        System.out.println("- collisions mean multiple keys land in the same bucket");
        System.out.println("- correct equals/hashCode keeps lookups correct even when collisions happen");
    }

    static final class CollidingKey {
        private final String value;

        CollidingKey(String value) {
            this.value = value;
        }

        @Override
        public boolean equals(Object other) {
            return other instanceof CollidingKey key && value.equals(key.value);
        }

        @Override
        public int hashCode() {
            return 7;
        }
    }
}
