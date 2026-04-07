# Netflix, MakeMyTrip, HotelTrader

This chapter is about resilience, caching, and freshness in systems that serve users and partners continuously.

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
