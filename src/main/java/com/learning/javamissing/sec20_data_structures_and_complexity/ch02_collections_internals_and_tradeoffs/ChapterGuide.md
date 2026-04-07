# Collections Internals And Tradeoffs Learning Kit

This chapter connects Java collection usage to the costs hidden underneath.

## Study Order

1. Run [UnderstandingArrayListGrowthAndLookup.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/understanding_arraylist_growth_and_lookup/UnderstandingArrayListGrowthAndLookup.java)
2. Run [UnderstandingHashMapBucketsAndCollisions.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/understanding_hashmap_buckets_and_collisions/UnderstandingHashMapBucketsAndCollisions.java)

## What You Learn

- why `ArrayList` appends are usually fast but resizing still costs work
- why `HashMap` lookups are usually fast but collisions still matter
- why complexity discussions should stay approximate and practical

## Quick Compare Table

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| `ArrayList` append vs middle insert | most new items go to the end | you genuinely need frequent middle inserts and can justify a different structure |
| direct index lookup vs repeated scan | the data is stored in an index-based structure | the data shape forces sequential traversal |
| average `HashMap` lookup vs collision-heavy lookup | hashes spread keys well | many keys collide and the bucket must do more work |

## Sources

- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
- Java Performance, 2nd Edition: https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/
