# Netflix, MakeMyTrip, HotelTrader

## Why This Chapter Matters

This chapter is about resilience, caching, and freshness in systems that serve users and partners continuously.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

- Netflix-style questions care about resilience and graceful degradation
- MakeMyTrip-style questions care about search, booking, pricing, and cache safety
- HotelTrader-style questions care about hotel availability, partner APIs, and freshness

## Core Ideas

Read the chapter as a small set of related ideas around netflix, MakeMyTrip, HotelTrader, not as isolated trivia.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [ResilientSignupFlow.java](topics/resilient_signup_flow/ResilientSignupFlow.java)
2. Run [HotelSearchCache.java](topics/hotel_search_cache/HotelSearchCache.java)
3. Run [AvailabilityFreshness.java](topics/availability_freshness/AvailabilityFreshness.java)

## What To Notice

- resilience starts with explicit fallback boundaries
- caching is powerful only when freshness rules are honest
- marketplace APIs need metrics around mismatch and lag, not only latency

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind netflix, makemytrip, hoteltrader and connect them back to the runnable examples.

## The Problem

- Netflix-style questions care about resilience and graceful degradation
- MakeMyTrip-style questions care about search, booking, pricing, and cache safety
- HotelTrader-style questions care about hotel availability, partner APIs, and freshness

## Run This First

1. Run [ResilientSignupFlow.java](topics/resilient_signup_flow/ResilientSignupFlow.java)
2. Run [HotelSearchCache.java](topics/hotel_search_cache/HotelSearchCache.java)
3. Run [AvailabilityFreshness.java](topics/availability_freshness/AvailabilityFreshness.java)

## What To Look For

- resilience starts with explicit fallback boundaries
- caching is powerful only when freshness rules are honest
- marketplace APIs need metrics around mismatch and lag, not only latency

## Company Lens

| Company | Strong signal |
| --- | --- |
| Netflix | controlled failure handling |
| MakeMyTrip | cache and booking correctness |
| HotelTrader | inventory freshness and partner reliability |

## Next Step

Go back to the top-level company resource after this chapter and use it as a revision map instead of your main lesson page.
