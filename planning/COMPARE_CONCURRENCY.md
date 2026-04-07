# Compare Concurrency

Use this page when you are deciding between raw threads, executors, and virtual threads.

## The Quick Rule

- Use raw `Thread` when you are learning basics or need a tiny direct example.
- Use `ExecutorService` when you want a managed task execution model.
- Use virtual threads when you have many mostly-waiting tasks and a modern JDK setup.

## One-Look Comparison

| Tool | Best for | Strength | Risk |
| --- | --- | --- | --- |
| `Thread` | basic lifecycle understanding | simplest mental model | scales poorly for many tasks |
| `ExecutorService` | controlled task execution | pooling, futures, lifecycle control | can hide task ownership if overused |
| virtual threads | large counts of waiting tasks | simpler request-style code at scale | requires newer JDK understanding |

## Use This When

- Use `Thread` to learn `start()`, `run()`, join, and shared-state basics.
- Use `ExecutorService` when you want task submission, shutdown control, and reusable worker management.
- Use virtual threads for I/O-heavy workloads where you want one task per request without complex callback flow.

## Watch Out

- Do not manage many long-lived raw threads for request-style server work.
- Do not treat executors as a dumping ground with unclear ownership and shutdown rules.
- Do not assume virtual threads remove the need to understand shared state, locking, or blocking behavior.

## Performance Lens

- Platform threads are expensive enough that unbounded growth becomes a problem.
- Executors improve control and reuse, but pool sizing still matters.
- Virtual threads drastically reduce the cost of parked waiting tasks, but correctness still matters more than raw thread counts.

## Read Next

- [Concurrency section](src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/SectionGuide.md)
- [Threads topic](src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/threads/TopicGuide.md)
- [Why virtual threads matter](src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch02_virtual_threads/topics/why_virtual_threads_matter/TopicGuide.md)
