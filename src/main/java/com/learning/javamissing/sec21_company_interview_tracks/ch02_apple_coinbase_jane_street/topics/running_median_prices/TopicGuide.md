---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# Running Median Prices

## The Problem

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## Run This Code

Run the stream of prices and explain why the median stays readable after each insert.

## Strong Interview Answer

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Next Topic

Go to `ch03_netflix_makemytrip_hoteltrader` for reliability and marketplace-style backend design.
