# Streams Learning Kit

## Problem

This chapter teaches one interview-relevant decision: when does a stream make data work clearer than a loop?

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Both habits create different problems:
- loop-heavy code can hide the transformation steps inside mutable variables
- stream-heavy code becomes hard to read when the logic is stateful or awkward

## Fix

Run the topics in this order:

1. Run [Collectors](topics/collectors/Collectors.java)
2. Run [Parallel Streams](topics/parallel_streams/ParallelStreams.java)
3. Run [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java)

What to observe:

- Which topic shows the failure first: [Collectors](topics/collectors/Collectors.java).
- Which topic narrows the rule: [Parallel Streams](topics/parallel_streams/ParallelStreams.java).
- Which topic shows the cleaner abstraction: [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java).

## Improvement

After this chapter, you can explain the rule behind streams and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Streams exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Collectors](topics/collectors/Collectors.java) and note the first thing that breaks.
- Run [Parallel Streams](topics/parallel_streams/ParallelStreams.java) and write down what the rule becomes.
- Run [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java) and compare the result with the naive approach.
