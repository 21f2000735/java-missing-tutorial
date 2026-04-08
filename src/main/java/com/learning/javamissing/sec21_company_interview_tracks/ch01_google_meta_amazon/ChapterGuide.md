# Google, Meta, Amazon

## Problem

This chapter groups the most common backend interview pressure from Google, Meta, and Amazon.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java)
2. Run [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java)
3. Run [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java)

What to observe:

- Which topic shows the failure first: [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java).
- Which topic narrows the rule: [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java).
- Which topic shows the cleaner abstraction: [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java).

## Improvement

Read the chapter as a small set of related ideas around google, Meta, Amazon, not as isolated trivia.

After this chapter, you should be able to explain why Google Meta Amazon exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Read the chapter as a small set of related ideas around google, Meta, Amazon, not as isolated trivia.

## Try this

- Run [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java) and note the first thing that breaks.
- Run [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) and write down what the rule becomes.
- Run [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java) and compare the result with the naive approach.
