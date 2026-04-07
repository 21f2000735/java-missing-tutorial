# Apple, Coinbase, Jane Street

## Why This Chapter Matters

This chapter mixes three interview styles that push on correctness and thought quality from different angles.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

- Apple pushes for safe APIs and high-quality engineering judgment
- Coinbase pushes for correctness in money movement and retry handling
- Jane Street pushes for precise reasoning and algorithm clarity

## Core Ideas

Read the chapter as a small set of related ideas around apple, Coinbase, Jane Street, not as isolated trivia.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [SafeApiDesign.java](topics/safe_api_design/SafeApiDesign.java)
2. Run [TransferIdempotency.java](topics/transfer_idempotency/TransferIdempotency.java)
3. Run [RunningMedianPrices.java](topics/running_median_prices/RunningMedianPrices.java)

## What To Notice

- API design is about making misuse harder
- transfer correctness is about idempotency and source of truth
- running median is about invariants, not only code syntax

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind apple, coinbase, jane street and connect them back to the runnable examples.

## The Problem

- Apple pushes for safe APIs and high-quality engineering judgment
- Coinbase pushes for correctness in money movement and retry handling
- Jane Street pushes for precise reasoning and algorithm clarity

## Run This First

1. Run [SafeApiDesign.java](topics/safe_api_design/SafeApiDesign.java)
2. Run [TransferIdempotency.java](topics/transfer_idempotency/TransferIdempotency.java)
3. Run [RunningMedianPrices.java](topics/running_median_prices/RunningMedianPrices.java)

## What To Look For

- API design is about making misuse harder
- transfer correctness is about idempotency and source of truth
- running median is about invariants, not only code syntax

## Company Lens

| Company | Strong signal |
| --- | --- |
| Apple | API safety and correctness |
| Coinbase | financial integrity and idempotency |
| Jane Street | precise reasoning and clean invariants |

## Next Chapter

Go next to `ch03_netflix_makemytrip_hoteltrader` for resilience, caching, and travel-platform design.
