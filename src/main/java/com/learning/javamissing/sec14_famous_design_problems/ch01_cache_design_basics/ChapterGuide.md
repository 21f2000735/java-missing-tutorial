# Cache Design Basics Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

This chapter shows what breaks when cache design basics is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: keep the most recently used entries and evict older ones");
        System.out.println("Real-world problem: a product service repeatedly looks up hot product details.");
        System.out.println();

        Map<String, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                return size() > 2;
            }
        };

        cache.put("P1", "Laptop");
        cache.put("P2", "Mouse");
        cache.get("P1");
        cache.put("P3", "Keyboard");

        // Expected output:
        // keys = [P1, P3]
        System.out.println("keys = " + cache.keySet());
        System.out.println("Why it works: access-order LinkedHashMap can remove the least recently used entry.");
    }
```

What happens:

- Real-world problem: a product service repeatedly looks up hot product details.
- Why it works: access-order LinkedHashMap can remove the least recently used entry.

Why it matters:

After this chapter, you can explain the rule behind cache design basics and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: keep the most recently used entries and evict older ones");
        System.out.println("Real-world problem: a product service repeatedly looks up hot product details.");
        System.out.println();

        Map<String, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                return size() > 2;
            }
        };

        cache.put("P1", "Laptop");
        cache.put("P2", "Mouse");
        cache.get("P1");
        cache.put("P3", "Keyboard");

        // Expected output:
        // keys = [P1, P3]
        System.out.println("keys = " + cache.keySet());
        System.out.println("Why it works: access-order LinkedHashMap can remove the least recently used entry.");
    }
```

What happens:

- Real-world problem: a product service repeatedly looks up hot product details.
- Why it works: access-order LinkedHashMap can remove the least recently used entry.

Why it matters:

After this chapter, you can explain the rule behind cache design basics and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Cache Design Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java), [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java), and [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) starts with the raw behavior, [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) adds the safety rule, and [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) and note the first thing that breaks.
- Run [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) and remove the safety rule or coordination step.
- Run [Building ASimple Lru Cache](topics/building_a_simple_lru_cache/BuildingASimpleLruCache.java) and compare the result with the naive approach.
