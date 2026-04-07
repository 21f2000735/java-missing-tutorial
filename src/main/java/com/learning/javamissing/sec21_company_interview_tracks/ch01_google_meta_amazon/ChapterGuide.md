# Google, Meta, Amazon

This chapter groups the most common backend interview pressure from Google, Meta, and Amazon.

## The Problem

These companies rarely care about Java syntax in isolation.
They care whether you can:

- model the problem clearly
- choose the right data structure
- design safe retry behavior
- debug regressions methodically

## Run This First

1. Run [SearchAutocompleteDesign.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/topics/search_autocomplete_design/SearchAutocompleteDesign.java)
2. Run [IdempotentReservations.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/topics/idempotent_reservations/IdempotentReservations.java)
3. Run [LatencyDebugPlaybook.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/topics/latency_debug_playbook/LatencyDebugPlaybook.java)

## What To Look For

- autocomplete is about retrieval, ranking, and hot-prefix caching
- reservations are about retry safety and business invariants
- latency debugging is about narrowing the blast radius before guessing

## Company Lens

| Company | Strong signal |
| --- | --- |
| Google | clear problem decomposition and measurement |
| Meta | practical product-scale judgment |
| Amazon | idempotency, ownership, customer impact |

## Interview Focus

Q: What makes an answer strong here?  
A: A strong answer explains the business risk, the data structure choice, the failure mode, and the metric you would watch.

## Next Chapter

Go next to `ch02_apple_coinbase_jane_street` if you want stronger API design, correctness, and algorithm pressure.
