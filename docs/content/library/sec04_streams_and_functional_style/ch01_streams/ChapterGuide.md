# Streams Learning Kit

This chapter answers one question first: when is a stream a clearer way to express data work than a loop?

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
