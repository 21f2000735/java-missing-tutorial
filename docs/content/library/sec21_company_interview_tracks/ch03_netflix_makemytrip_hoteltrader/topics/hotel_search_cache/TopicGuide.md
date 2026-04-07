---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Hotel Search Cache

## The Problem

Travel search is a classic marketplace caching question because speed helps, but stale data harms trust.

## Run This Code

Run the same request twice and see how the cache helps the read path.

## Strong Interview Answer

Mention:

- cache key design
- TTL or freshness window
- static versus volatile data
- cache hit rate and stale-result incidents

## Next Topic

Read `AvailabilityFreshness` next for the partner-platform side of the same problem.
