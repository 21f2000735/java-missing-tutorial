---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Transfer Idempotency

## The Problem

Financial systems cannot treat duplicate requests as harmless noise.

## Run This Code

Run the same transfer twice and notice that the system keeps one ledger entry.

## Company Lens

- Coinbase: correctness first
- Apple: boundary contracts still matter here too

## Strong Interview Answer

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

## Next Topic

Read `RunningMedianPrices` next for the algorithm and invariant side of high-bar interviews.
