---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# hotel search cache

## Why This Exists

Concept: hotel search cache.

Travel search is read-heavy, but stale prices and stale availability can hurt trust.

## The Pain Before It

It caches expensive search responses while keeping a short freshness window.

A hotel search page repeatedly asks for the same city and dates.

## Java Creator Mindset

Cache the hot read, but separate stable search shape from freshness policy.

## How You Might Invent It

1. Build a cache key from search input.
2. Return cached results when still fresh.
3. Refresh after the freshness window expires.

## Naive Attempt

The naive version is to use hotel search cache without checking what rule it is supposed to protect.

## Why It Breaks

It caches expensive search responses while keeping a short freshness window.

Edge cases usually show the bug first.

## Final Java Solution

Cache the hot read, but separate stable search shape from freshness policy.

Run [HotelSearchCache.java](HotelSearchCache.java) as the source of truth for the example.

## Code

Run [HotelSearchCache.java](HotelSearchCache.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        SearchCache cache = new SearchCache(60);
        List<String> hotels = cache.search("goa|2026-05-10|2026-05-12");
        boolean cacheHit = cache.search("goa|2026-05-10|2026-05-12").equals(hotels);

        // Expected output:
        // cacheHit = true
        // hotels = [Sea View, Central Stay]
        System.out.println("cacheHit = " + cacheHit);
        System.out.println("hotels = " + hotels);
        System.out.println("Company lens: MakeMyTrip answers should mention cache hit rate and stale-result risk together.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- cache keys should reflect the search shape");
        System.out.println("- short freshness windows are often safer for travel data");
        System.out.println("- latency improvement is not enough if correctness degrades");
    }
```

## Walkthrough

1. Build a cache key from search input.
2. Return cached results when still fresh.
3. Refresh after the freshness window expires.

What to observe:

- cacheHit = true
- hotels = [Sea View, Central Stay]

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading hotel search cache as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [HotelSearchCache.java](HotelSearchCache.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why hotel search cache exists, what problem it solves, and what the runnable file proves.
