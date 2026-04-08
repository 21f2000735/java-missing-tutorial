# Netflix, MakeMyTrip, HotelTrader

## Problem

Marketplace and partner systems need to know whether what they show is still trustworthy.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- availability freshness: Marketplace and partner systems need to know whether what they show is still trustworthy.
- hotel search cache: Travel search is read-heavy, but stale prices and stale availability can hurt trust.
- resilient signup flow: Distributed systems fail in pieces, not all at once.

## Fix

Run the topics in this order:

1. Run [availability freshness](topics/availability_freshness/AvailabilityFreshness.java)
2. Run [hotel search cache](topics/hotel_search_cache/HotelSearchCache.java)
3. Run [resilient signup flow](topics/resilient_signup_flow/ResilientSignupFlow.java)

Example:

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

What happens:

Why it matters:

Travel search is read-heavy, but stale prices and stale availability can hurt trust.

## Improvement

Example:

```java
    public static void main(String[] args) {
        SignupResult result = signup();

        // Expected output:
        // signupStatus = PARTIAL_SUCCESS
        System.out.println("signupStatus = " + result.status());
        System.out.println("deferredActions = " + result.deferredActions());
        System.out.println("Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- not every dependency deserves the same failure boundary");
        System.out.println("- degraded success can be better than total failure");
        System.out.println("- reliability answers need explicit recovery plans");
    }
```

What happens:

Why it matters:

Distributed systems fail in pieces, not all at once.

After this chapter, you should be able to explain why Netflix Makemytrip Hoteltrader exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [availability freshness](topics/availability_freshness/AvailabilityFreshness.java), [hotel search cache](topics/hotel_search_cache/HotelSearchCache.java), and [resilient signup flow](topics/resilient_signup_flow/ResilientSignupFlow.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [availability freshness](topics/availability_freshness/AvailabilityFreshness.java) starts with the raw behavior, [hotel search cache](topics/hotel_search_cache/HotelSearchCache.java) adds the safety rule, and [resilient signup flow](topics/resilient_signup_flow/ResilientSignupFlow.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Cache the hot read, but separate stable search shape from freshness policy.

## Try this

- Run [availability freshness](topics/availability_freshness/AvailabilityFreshness.java) and note the first thing that breaks.
- Run [hotel search cache](topics/hotel_search_cache/HotelSearchCache.java) and remove the safety rule or coordination step.
- Run [resilient signup flow](topics/resilient_signup_flow/ResilientSignupFlow.java) and compare the result with the naive approach.
