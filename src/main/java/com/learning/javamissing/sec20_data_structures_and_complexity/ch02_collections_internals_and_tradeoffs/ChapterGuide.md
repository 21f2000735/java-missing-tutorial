# Collections Internals And Tradeoffs Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

ArrayList feels simple on the surface, but its backing-array behavior explains why some operations are cheap and some are not.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- ArrayList growth and lookup: ArrayList feels simple on the surface, but its backing-array behavior explains why some operations are cheap and some are not.
- HashMap buckets and collisions: HashMap looks like instant lookup until collisions and hashing quality become relevant.

## Fix

Run the topics in this order:

1. Run [ArrayList growth and lookup](topics/arraylist_growth_and_lookup/ArrayListGrowthAndLookup.java)
2. Run [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java)

Example:

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

What happens:

- Problem: fast lookup depends on good key distribution, not on magic.
- Why it works: collisions do not break lookup when equals/hashCode are implemented correctly.
- Common mistake: assuming HashMap is always O(1) without thinking about collision patterns.

Why it matters:

HashMap looks like instant lookup until collisions and hashing quality become relevant.

## Improvement

Example:

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

What happens:

- Problem: fast lookup depends on good key distribution, not on magic.
- Why it works: collisions do not break lookup when equals/hashCode are implemented correctly.
- Common mistake: assuming HashMap is always O(1) without thinking about collision patterns.

Why it matters:

HashMap looks like instant lookup until collisions and hashing quality become relevant.

After this chapter, you should be able to explain why Collections Internals And Tradeoffs exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [ArrayList growth and lookup](topics/arraylist_growth_and_lookup/ArrayListGrowthAndLookup.java), [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java), and [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [ArrayList growth and lookup](topics/arraylist_growth_and_lookup/ArrayListGrowthAndLookup.java) starts with the raw behavior, [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java) adds the safety rule, and [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java) moves to the cleaner abstraction.

## Rule

👉 Rule: HashMap spreads keys across buckets; collisions mean multiple keys share one bucket and more work happens there.

## Try this

- Run [ArrayList growth and lookup](topics/arraylist_growth_and_lookup/ArrayListGrowthAndLookup.java) and note the first thing that breaks.
- Run [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java) and remove the safety rule or coordination step.
- Run [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java) and compare the result with the naive approach.
