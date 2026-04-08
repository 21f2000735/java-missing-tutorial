---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# Search Autocomplete Design

## Why This Exists

This is a strong Google or Meta-style backend question because it mixes:

- data retrieval
- ranking
- caching
- latency metrics

## The Pain Before It

This is a strong Google or Meta-style backend question because it mixes:

- data retrieval
- ranking
- caching
- latency metrics

## Java Creator Mindset

### Company Lens

- Google: explain candidate retrieval, ranking, and metrics clearly
- Meta: connect relevance and low-latency behavior to user experience

## How You Might Invent It

Treat search autocomplete design as a practical decision tool, not just a term to memorize.

## Naive Attempt

The first instinct is usually to solve the problem directly with local code and hope the edge cases stay small.

## Why It Breaks

Do not answer autocomplete with "use a trie" and stop there.
You still need ranking, freshness, and measurable latency.

## Final Java Solution

### Company Lens

- Google: explain candidate retrieval, ranking, and metrics clearly
- Meta: connect relevance and low-latency behavior to user experience

## Code

### Run It

Run the example and notice that the second identical prefix lookup comes from cache.

### Expected Result

- top matches for `pa`
- the same top matches again from cache

## Walkthrough

Walk through the example in order: start state, rule application, final result.

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that search autocomplete design should guarantee.

## Mistakes

Do not answer autocomplete with "use a trie" and stop there.
You still need ranking, freshness, and measurable latency.

## Tradeoffs

The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place.

## Use / Avoid

### Use It When

- search suggestions are read-heavy
- popularity can guide ranking
- a small hot set of prefixes repeats often

## Practice

Change one part of the runnable example, rerun it, and explain whether search autocomplete design still behaves the way you expected.

### After That

Read `IdempotentReservations` next. It is the retry-safety half of common product backend interviews.

## Summary

After this topic, you should be able to explain search autocomplete design, run the example, and defend when it helps versus when it adds noise.
