---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## The Problem

Sometimes one flow of work is not enough.

Examples:

- send a report while the main request continues
- process many independent tasks
- keep the UI or API responsive

Threads are the oldest Java tool for that problem.

## Quick Visual

![Threads single-look visual](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/threads/ThreadsVisual.svg)

At one glance:

- the main thread keeps moving
- a worker thread handles a separate task
- as soon as both touch shared state, design risk appears

## Run This Code

Run the example and watch the main flow and worker flow both print output.

## Expected Output

You should see work happening from more than one thread, but not necessarily in the same order every time.

That non-deterministic order is part of the lesson.

## ❌ Bad Code

A very common beginner mistake is to call `run()` directly and think a new thread started.

It did not.  
That just ran the method on the current thread.

## ✅ Better Code

Call `start()` when you want the JVM to schedule a new thread.

## Why This Works

Threads let the JVM schedule separate units of execution.  
That gives you concurrency, but it also introduces coordination and shared-state risks.

## Comparison Snapshot

| Need | Raw `Thread` | `ExecutorService` | Virtual thread |
| --- | --- | --- | --- |
| Learn the mental model | best starting point | hides some basics | builds on thread mental model |
| Run many managed tasks | weak fit | strong fit | strong fit for waiting-heavy work |
| One-off demo | simple | more setup | needs newer JDK |
| Production task orchestration | usually not ideal | common choice | increasingly useful |

## Performance Lens

Do not benchmark threads only by "time to print".

The real costs are:

- thread creation
- waiting and blocking
- coordination
- contention on shared state

For tiny demos the cost looks invisible.  
For real systems the hidden cost appears when you create many threads, wait on slow I/O, or lock shared objects too often.

## Watch The Right Metric

When concurrency examples become real services, track:

- response time
- throughput
- queue growth
- blocked time
- error rate under load

## Use This When

- you are learning the basic mental model of concurrency
- you need to understand what executors and virtual threads build on top of

## Avoid This When

- production task orchestration would be clearer with executors or structured concurrency
- shared mutable state is not well controlled

## Version Notes

The thread concept is old, but it still matters because newer concurrency tools build on the same core ideas: scheduling, coordination, visibility, and shared state.

## After Reading This, You Should Know

- `start()` and `run()` are not interchangeable
- thread ordering is not guaranteed just because the source code has one order
- concurrency problems usually begin when multiple threads share mutable state

## Next Topic

Move to executors after this one. That is the practical next step for most production code.
