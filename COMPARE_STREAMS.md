# Compare Streams

Use this page when you are deciding between a loop and a stream pipeline.

## The Quick Rule

- Use a loop when step-by-step control is the important thing.
- Use a stream when the job is clearly transform, filter, group, or aggregate.

## One-Look Comparison

| Style | Best for | Strength | Risk |
| --- | --- | --- | --- |
| `for` loop | explicit control flow | easiest to debug line by line | can become noisy and mutation-heavy |
| stream pipeline | data transformation | expresses intent clearly | can become hard to read if over-chained |
| parallel stream | CPU-heavy, independent work | can speed up some workloads | easy to misuse and hard to reason about |

## Use This When

- Use loops when you need early exits, multi-step mutation, or stateful logic.
- Use streams when the code reads as "take data, filter it, map it, collect it".
- Use collectors when the output is grouped, counted, partitioned, or summarized.

## Watch Out

- Do not force streams into code that is really command-style or side-effect-heavy.
- Do not use parallel streams just because the dataset looks large.
- Do not hide important branching inside dense lambdas.

## Performance Lens

- Streams are usually about readability first, not raw speed.
- Simple loops can outperform streams in tight hotspots, but the difference often matters less than clarity until profiling says otherwise.
- Parallel streams add scheduling and merge overhead, so they only pay off on the right workload.

## Read Next

- [Streams section](src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/SectionGuide.md)
- [Stream pipeline topic](src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/ch01_streams/topics/stream_pipeline/TopicGuide.md)
- [Collectors topic](src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/ch01_streams/topics/collectors/Collectors.java)
