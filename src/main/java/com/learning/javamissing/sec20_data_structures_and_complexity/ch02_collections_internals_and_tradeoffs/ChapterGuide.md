# Collections Internals And Tradeoffs Learning Kit

## Why This Chapter Exists

Many developers know how to use `ArrayList` and `HashMap`, but not what costs appear when data grows:

- `ArrayList` appends usually feel fast, so resize cost gets ignored
- `HashMap` lookups usually feel instant, so collisions get ignored

This chapter turns those hidden costs into visible mental models.

## The Pain Before It

Many developers know how to use `ArrayList` and `HashMap`, but not what costs appear when data grows:

- `ArrayList` appends usually feel fast, so resize cost gets ignored
- `HashMap` lookups usually feel instant, so collisions get ignored

This chapter turns those hidden costs into visible mental models.

## Java Creator Mindset

- `ArrayList` index lookup is fast because elements live in a backing array
- growth is amortized: most appends are cheap, occasional resizes copy old elements
- `HashMap` lookup is fast on average when hashes spread keys well
- collisions do not break correctness if `equals` and `hashCode` are implemented properly, but they affect lookup work

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- `ArrayList` index lookup is fast because elements live in a backing array
- growth is amortized: most appends are cheap, occasional resizes copy old elements
- `HashMap` lookup is fast on average when hashes spread keys well
- collisions do not break correctness if `equals` and `hashCode` are implemented properly, but they affect lookup work

## Study Order

1. Run [ArrayList growth and lookup](topics/arraylist_growth_and_lookup/ArrayListGrowthAndLookup.java)
2. Run [HashMap buckets and collisions](topics/hashmap_buckets_and_collisions/HashMapBucketsAndCollisions.java)

## What To Notice

### Interview Focus

Q: Why is `ArrayList` append called amortized `O(1)`?  
A: Because most appends are cheap, but occasional growth resizes and copies old elements.

Q: Why can `HashMap` performance degrade?  
A: Because collisions increase the amount of work inside buckets when many keys land together.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

### Mini Case Study

Imagine an order dashboard.

- new orders arrive at the end of a list
- the UI often reads by index for pagination
- user sessions are stored by ID in a map

This looks simple until scale increases. Then growth cost and collision behavior start mattering.

## Summary

- `ArrayList` index lookup is fast because elements live in a backing array
- growth is amortized: most appends are cheap, occasional resizes copy old elements
- `HashMap` lookup is fast on average when hashes spread keys well
- collisions do not break correctness if `equals` and `hashCode` are implemented properly, but they affect lookup work

## Next Chapter

Move to [Sorting Searching And Binary Search Learning Kit](../ch03_sorting_searching_and_binary_search/ChapterGuide.md) after this chapter.
