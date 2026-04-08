---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 9 min
---

# HashMap buckets and collisions

## Why This Exists

Concept: HashMap buckets and collisions.

HashMap looks like instant lookup until collisions and hashing quality become relevant.

## The Pain Before It

It explains why average lookup is fast, what collisions mean, and why equals/hashCode correctness matters.

A session store keeps statuses by user ID in a map.

## Java Creator Mindset

HashMap spreads keys across buckets; collisions mean multiple keys share one bucket and more work happens there.

## How You Might Invent It

1. Store several keys with the same hash.
2. Read one value back.
3. See that correctness still depends on equals/hashCode, even when collisions exist.

## Naive Attempt

The naive version is to use hashmap buckets and collisions without checking what rule it is supposed to protect.

## Why It Breaks

It explains why average lookup is fast, what collisions mean, and why equals/hashCode correctness matters.

Edge cases usually show the bug first.

## Final Java Solution

HashMap spreads keys across buckets; collisions mean multiple keys share one bucket and more work happens there.

Run [HashMapBucketsAndCollisions.java](HashMapBucketsAndCollisions.java) as the source of truth for the example.

## Code

Run [HashMapBucketsAndCollisions.java](HashMapBucketsAndCollisions.java) and compare the output with the explanation below.

```java
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
```

## Walkthrough

1. Store several keys with the same hash.
2. Read one value back.
3. See that correctness still depends on equals/hashCode, even when collisions exist.

What to observe:

- status = EXPIRED
- sameBucketCount = 3

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading HashMap buckets and collisions as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [HashMapBucketsAndCollisions.java](HashMapBucketsAndCollisions.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why HashMap buckets and collisions exists, what problem it solves, and what the runnable file proves.
