---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# Search Autocomplete Design

## The Problem

This is a strong Google or Meta-style backend question because it mixes:

- data retrieval
- ranking
- caching
- latency metrics

## Run This Code

Run the example and notice that the second identical prefix lookup comes from cache.

## Expected Output

- top matches for `pa`
- the same top matches again from cache

## Company Lens

- Google: explain candidate retrieval, ranking, and metrics clearly
- Meta: connect relevance and low-latency behavior to user experience

## Use This When

- search suggestions are read-heavy
- popularity can guide ranking
- a small hot set of prefixes repeats often

## Watch Out

Do not answer autocomplete with "use a trie" and stop there.
You still need ranking, freshness, and measurable latency.

## Next Topic

Read `IdempotentReservations` next. It is the retry-safety half of common product backend interviews.
