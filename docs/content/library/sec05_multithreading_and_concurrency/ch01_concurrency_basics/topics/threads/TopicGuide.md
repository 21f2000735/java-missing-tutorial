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

## Run This Code

Run the example and watch the main flow and worker flow both print output.

## Expected Output

You should see work happening from more than one thread, but not necessarily in the same order every time.

That non-deterministic order is part of the lesson.

## Wrong Example First

A very common beginner mistake is to call `run()` directly and think a new thread started.

It did not.  
That just ran the method on the current thread.

## Better Example

Call `start()` when you want the JVM to schedule a new thread.

## Why This Works

Threads let the JVM schedule separate units of execution.  
That gives you concurrency, but it also introduces coordination and shared-state risks.

## Use This When

- you are learning the basic mental model of concurrency
- you need to understand what executors and virtual threads build on top of

## Avoid This When

- production task orchestration would be clearer with executors or structured concurrency
- shared mutable state is not well controlled

## Version Notes

The thread concept is old, but it still matters because newer concurrency tools build on the same core ideas: scheduling, coordination, visibility, and shared state.

## Next Topic

Move to executors after this one. That is the practical next step for most production code.
