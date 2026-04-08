# Apple, Coinbase, Jane Street

## Why This Chapter Exists

This chapter mixes three interview styles that push on correctness and thought quality from different angles.

## The Pain Before It

- Apple pushes for safe APIs and high-quality engineering judgment
- Coinbase pushes for correctness in money movement and retry handling
- Jane Street pushes for precise reasoning and algorithm clarity

## Java Creator Mindset

Read the chapter as a small set of related ideas around apple, Coinbase, Jane Street, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

Read the chapter as a small set of related ideas around apple, Coinbase, Jane Street, not as isolated trivia.

## Study Order

1. Run [running median prices](topics/running_median_prices/RunningMedianPrices.java)
2. Run [safe API design](topics/safe_api_design/SafeApiDesign.java)
3. Run [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java)

## What To Notice

- API design is about making misuse harder
- transfer correctness is about idempotency and source of truth
- running median is about invariants, not only code syntax

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind apple, coinbase, jane street and connect them back to the runnable examples.

## Next Chapter

Move to [Netflix, MakeMyTrip, HotelTrader](../ch03_netflix_makemytrip_hoteltrader/ChapterGuide.md) after this chapter.
