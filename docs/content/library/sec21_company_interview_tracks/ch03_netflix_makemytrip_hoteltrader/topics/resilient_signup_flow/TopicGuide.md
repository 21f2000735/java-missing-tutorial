---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Resilient Signup Flow

## The Problem

Netflix-style systems questions usually test whether you can fail in a controlled way.

## Run This Code

Run the flow and notice that a non-critical dependency fails without destroying the whole user action.

## Strong Interview Answer

Mention:

- critical versus non-critical dependencies
- fallback or deferred recovery
- visibility into degraded outcomes

## Next Topic

Read `HotelSearchCache` next to move from resilience into travel search performance.
