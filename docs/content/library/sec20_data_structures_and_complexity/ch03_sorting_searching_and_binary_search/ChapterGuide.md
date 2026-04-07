# Sorting Searching And Binary Search Learning Kit

This chapter teaches a simple but important tradeoff: sometimes you spend work upfront so future operations become cheaper and clearer.

## What Problem This Chapter Solves

Real systems often need repeated lookups and ordered output:

- sort invoices by amount
- search a sorted list of IDs
- answer range questions quickly

Without a sorting/searching model, code either stays brute-force or uses binary search incorrectly on unsorted data.

## Study Order

1. Run [SortingTradeoffs.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch03_sorting_searching_and_binary_search/topics/sorting_tradeoffs/SortingTradeoffs.java)
2. Run [UsingBinarySearchCorrectly.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch03_sorting_searching_and_binary_search/topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java)

## Quick Summary

- sorting costs work now so later operations can become easier
- binary search only works on sorted data
- the value of sorting depends on how often you search or compare later

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| unsorted scan | you search once or the data is tiny | you search repeatedly and can justify sorting first |
| sort now | later lookups, paging, or ranking matter | the data is one-off and sorting adds unnecessary cost |
| binary search | the data is sorted and random-access lookup is available | the data is unsorted or the structure does not support practical indexed access |

## Mini Case Study

Think about invoice data.

- finance wants the cheapest invoices first
- support wants to check whether one invoice ID exists
- search operations happen repeatedly

This is when paying an upfront sort cost can make later operations simpler and faster.

## Sources

- Grokking Algorithms: https://www.manning.com/books/grokking-algorithms-second-edition
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
