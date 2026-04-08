# Apple, Coinbase, Jane Street

## Problem

This chapter mixes three interview styles that push on correctness and thought quality from different angles.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [running median prices](topics/running_median_prices/RunningMedianPrices.java)
2. Run [safe API design](topics/safe_api_design/SafeApiDesign.java)
3. Run [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java)

What to observe:

- Which topic shows the failure first: [running median prices](topics/running_median_prices/RunningMedianPrices.java).
- Which topic narrows the rule: [safe API design](topics/safe_api_design/SafeApiDesign.java).
- Which topic shows the cleaner abstraction: [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java).

## Improvement

Read the chapter as a small set of related ideas around apple, Coinbase, Jane Street, not as isolated trivia.

After this chapter, you should be able to explain why Apple Coinbase Jane Street exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around apple, Coinbase, Jane Street, not as isolated trivia.

## Try this

- Run [running median prices](topics/running_median_prices/RunningMedianPrices.java) and note the first thing that breaks.
- Run [safe API design](topics/safe_api_design/SafeApiDesign.java) and write down what the rule becomes.
- Run [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java) and compare the result with the naive approach.
