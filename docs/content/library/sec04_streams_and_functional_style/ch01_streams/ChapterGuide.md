# Streams Learning Kit

## Why This Chapter Matters

This chapter answers one question first: when is a stream a clearer way to express data work than a loop?

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Business code often needs to:

- keep only the matching records
- reshape those records into another form
- group or summarize the result

If the code is really “take data, transform it, produce an answer,” streams can be clearer than manual loops. If the code is stateful or awkward in a pipeline, a loop is usually better.

## Core Ideas

Read the chapter as a small set of related ideas around streams, not as isolated trivia.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [StreamPipeline.java](topics/stream_pipeline/StreamPipeline.java)
2. Run [Collectors.java](topics/collectors/Collectors.java)
3. Run [ParallelStreams.java](topics/parallel_streams/ParallelStreams.java)

## What To Notice

- a stream pipeline reads like a chain of data steps
- collectors define the final shape of the answer
- parallel streams are a performance decision, not a style upgrade

## Common Mistakes

- streams do not execute until a terminal operation runs
- `groupingBy` and `toMap` do not solve the same problem
- parallel streams can give correct output and still be the wrong choice

- a simple loop is shorter and clearer
- the logic depends on mutation or complicated state across steps
- you are thinking about parallel before understanding the sequential version

## When To Use / When Not To Use

### Use It When

- the work is mostly filtering, mapping, grouping, or counting
- you want the transformation steps to read directly in the code
- the final result is a list, set, map, summary, or joined string

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind streams and connect them back to the runnable examples.

## The Problem

Business code often needs to:

- keep only the matching records
- reshape those records into another form
- group or summarize the result

If the code is really “take data, transform it, produce an answer,” streams can be clearer than manual loops. If the code is stateful or awkward in a pipeline, a loop is usually better.

## Run This First

1. Run [StreamPipeline.java](topics/stream_pipeline/StreamPipeline.java)
2. Run [Collectors.java](topics/collectors/Collectors.java)
3. Run [ParallelStreams.java](topics/parallel_streams/ParallelStreams.java)

## What To Look For

- a stream pipeline reads like a chain of data steps
- collectors define the final shape of the answer
- parallel streams are a performance decision, not a style upgrade

## Use This Chapter When

- the work is mostly filtering, mapping, grouping, or counting
- you want the transformation steps to read directly in the code
- the final result is a list, set, map, summary, or joined string

## Avoid This Approach When

- a simple loop is shorter and clearer
- the logic depends on mutation or complicated state across steps
- you are thinking about parallel before understanding the sequential version

## Common Confusion

- streams do not execute until a terminal operation runs
- `groupingBy` and `toMap` do not solve the same problem
- parallel streams can give correct output and still be the wrong choice

## Next Chapter

Move to `ch02_functional_interfaces` so passing behavior into stream-style code stops feeling abstract.

## Sources

- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
