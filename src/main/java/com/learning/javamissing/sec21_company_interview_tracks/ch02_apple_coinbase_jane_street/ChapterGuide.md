# Apple, Coinbase, Jane Street

This chapter mixes three interview styles that push on correctness and thought quality from different angles.

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
