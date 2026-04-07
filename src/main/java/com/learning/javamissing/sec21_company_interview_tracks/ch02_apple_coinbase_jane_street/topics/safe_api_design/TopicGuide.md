---
introduced: Java 16
status: stable
runner: embedded
estimated: 6 min
---

# Safe API Design

## The Problem

Apple-style platform questions often reward APIs that are hard to misuse.

## Run This Code

Run the request factory and notice that validation happens before bad requests can spread.

## Strong Interview Answer

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Next Topic

Read `TransferIdempotency` next to switch from API safety to money safety.
