# Streams Learning Kit

## Why This Chapter Exists

This chapter teaches one interview-relevant decision: when does a stream make data work clearer than a loop?

## The Pain Before It

A lot of business code does the same sequence again and again:

- keep only matching records
- reshape the data
- produce a grouped, counted, or summed result

Without a clear model, people either write noisy loops for transformation-heavy work or force everything into streams, even when a loop is simpler.

## Java Creator Mindset

Streams are not "modern loops". They are a way to declare a data pipeline:

- source
- intermediate steps
- terminal result

That is why they work best when the business rule is really "transform this data into that answer."

## How You Might Invent It

Imagine repeated reporting code:

- first filter the useful rows
- then map each row to the field you need
- then collect, count, or sum

At that point, you want a pipeline that reads in the same order as the business rule.

## Naive Attempt

Two weak habits show up here:

- writing manual loops even when the job is obviously filter -> map -> result
- switching to streams everywhere because the syntax looks cleaner

## Why It Breaks

Both habits create different problems:

- loop-heavy code can hide the transformation steps inside mutable variables
- stream-heavy code becomes hard to read when the logic is stateful or awkward
- parallel streams can produce correct output and still be a bad engineering choice

## Final Java Direction

Use this chapter as a three-part decision path:

- `StreamPipeline` for readable data flow
- `Collectors` for choosing the final shape of the answer
- `ParallelStreams` for understanding that parallelism is an optimization decision, not a style upgrade

## Study Order

1. Run [StreamPipeline.java](topics/stream_pipeline/StreamPipeline.java)
2. Run [Collectors.java](topics/collectors/Collectors.java)
3. Run [ParallelStreams.java](topics/parallel_streams/ParallelStreams.java)

## What To Notice

- `StreamPipeline` shows filter -> transform -> answer with priority orders and names
- `Collectors` shows how the final result can become a `List`, `Set`, grouped `Map`, partitioned `Map`, or summary
- `ParallelStreams` shows that matching output does not automatically justify parallel execution

## Mental Model

Use this simple rule:

- if the work is "take data, reshape it, produce an answer", a stream may clarify it
- if the work is stateful, branch-heavy, or easier to explain step by step, a loop is usually better

The stream itself is not the goal. Clear reasoning is the goal.

## Common Mistakes

- forgetting that intermediate operations are lazy until a terminal operation runs
- confusing `groupingBy` with `toMap`
- using parallel streams before understanding the sequential version
- mutating external state inside `map`, `filter`, or `forEach`
- keeping a long pipeline that is harder to debug than a straightforward loop

## Tradeoffs

| Choice | Gain | Cost |
| --- | --- | --- |
| Sequential stream | readable transformation pipeline | can feel indirect for stateful logic |
| Collectors | explicit final result shape | more API surface to learn |
| Parallel stream | possible speedup on the right workload | overhead, coordination cost, and easier misuse |
| Plain loop | direct control and simple debugging | can bury the higher-level business rule in mutation |

## Use / Avoid

### Use It When

- the code is mostly filtering, mapping, grouping, counting, or summarizing
- you want the business steps to read in order
- the final answer is a collection, map, statistic, or joined string

### Avoid

- the logic depends on shared mutable state
- a plain loop is shorter and easier to explain
- you are reaching for parallel streams before measuring the sequential version

## Practice

Rerun each example with one changed assumption:

- change the filter in `StreamPipeline`
- change the collector shape in `Collectors`
- increase the input size in `ParallelStreams`

Then explain whether the stream still makes the code clearer than a loop.

## Summary

- streams are best for transformation-shaped work
- collectors decide the final answer shape
- parallel streams are a performance tool, not a readability tool
- a strong interview answer compares streams with loops instead of treating one as always better

## Sources

- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042

## Next Chapter

Move to `ch02_functional_interfaces` so passing behavior into stream-style code stops feeling magical.
