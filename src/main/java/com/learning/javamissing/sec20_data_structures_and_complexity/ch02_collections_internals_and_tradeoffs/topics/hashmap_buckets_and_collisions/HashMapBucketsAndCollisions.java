package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_hashmap_buckets_and_collisions;

import java.util.HashMap;
import java.util.Map;

/**
 * Concept: HashMap buckets and collisions
 * Why this concept is needed:
 * HashMap looks like instant lookup until collisions and hashing quality become relevant.
 *
 * What problem this solves:
 * It explains why average lookup is fast, what collisions mean, and why equals/hashCode correctness matters.
 *
 * Real-world setup:
 * A session store keeps statuses by user ID in a map.
 *
 * How to think about it:
 * HashMap spreads keys across buckets; collisions mean multiple keys share one bucket and more work happens there.
 *
 * How to code it:
 * 1. Store several keys with the same hash.
 * 2. Read one value back.
 * 3. See that correctness still depends on equals/hashCode, even when collisions exist.
 *
 * Expected output:
 * status = EXPIRED
 * sameBucketCount = 3
 */
public class UnderstandingHashMapBucketsAndCollisions {
    public static void main(String[] args) {
        System.out.println("Concept: HashMap collisions");
        System.out.println("Problem: fast lookup depends on good key distribution, not on magic.");
        System.out.println();

        Map<CollidingKey, String> sessions = new HashMap<>();
        sessions.put(new CollidingKey("user-101"), "ACTIVE");
        sessions.put(new CollidingKey("user-205"), "EXPIRED");
        sessions.put(new CollidingKey("user-309"), "LOCKED");

        // Expected output:
        // status = EXPIRED
        // sameBucketCount = 3
        System.out.println("status = " + sessions.get(new CollidingKey("user-205")));
        System.out.println("sameBucketCount = " + sessions.size());
        System.out.println("Why it works: collisions do not break lookup when equals/hashCode are implemented correctly.");
        System.out.println("Common mistake: assuming HashMap is always O(1) without thinking about collision patterns.");
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
