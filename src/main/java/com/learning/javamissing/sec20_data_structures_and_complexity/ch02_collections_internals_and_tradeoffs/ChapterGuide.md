# Collections Internals And Tradeoffs Learning Kit

This chapter connects everyday Java collection usage to the hidden work underneath.

## What Problem This Chapter Solves

Many developers know how to use `ArrayList` and `HashMap`, but not what costs appear when data grows:

- `ArrayList` appends usually feel fast, so resize cost gets ignored
- `HashMap` lookups usually feel instant, so collisions get ignored

This chapter turns those hidden costs into visible mental models.

## Study Order

1. Run [UnderstandingArrayListGrowthAndLookup.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/understanding_arraylist_growth_and_lookup/UnderstandingArrayListGrowthAndLookup.java)
2. Run [UnderstandingHashMapBucketsAndCollisions.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/understanding_hashmap_buckets_and_collisions/UnderstandingHashMapBucketsAndCollisions.java)

## Quick Summary

- `ArrayList` index lookup is fast because elements live in a backing array
- growth is amortized: most appends are cheap, occasional resizes copy old elements
- `HashMap` lookup is fast on average when hashes spread keys well
- collisions do not break correctness if `equals` and `hashCode` are implemented properly, but they affect lookup work

## Quick Compare Table

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| `ArrayList` append vs middle insert | most items are added at the end | middle changes are dominant and another structure is justified |
| direct index lookup vs repeated scan | the collection is index-based and you know the position | the data shape forces sequential traversal |
| average `HashMap` lookup vs collision-heavy lookup | keys hash well and distribute evenly | collisions concentrate many keys into the same bucket |

## Mini Case Study

Imagine an order dashboard.

- new orders arrive at the end of a list
- the UI often reads by index for pagination
- user sessions are stored by ID in a map

This looks simple until scale increases. Then growth cost and collision behavior start mattering.

## Interview Focus

Q: Why is `ArrayList` append called amortized `O(1)`?  
A: Because most appends are cheap, but occasional growth resizes and copies old elements.

Q: Why can `HashMap` performance degrade?  
A: Because collisions increase the amount of work inside buckets when many keys land together.

## Sources

- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
- Java Performance, 2nd Edition: https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/
