---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## Why This Exists

Concept: creating a thread. `start()` creates a new thread, while `run()` just calls a method on the current thread.

## The Pain Before It

Calling `run()` looks like concurrency, but it keeps the work on the current thread. That is the first thing beginners need to observe.

## Java Creator Mindset

Use `start()` when you want the JVM to schedule a new thread and give the task its own execution path.

## How You Might Invent It

Start with one task, move it to a worker, and then check whether the output order stays the same.

## Naive Attempt

```java
Thread t = new Thread(() ->
    System.out.println("worker: " + Thread.currentThread().getName())
);
t.run();
```

`t.run()` looks like a thread start, but it still runs on the calling thread.

## Why It Breaks

- the work does not move off the current thread
- the thread name does not change the way you expect
- concurrency bugs stay hidden because nothing actually ran concurrently

## Final Java Solution

Call `start()` when you want a new thread and then wait with `join()` if you need the result before continuing.

## Code

### Run It

```java
Thread t = new Thread(() -> {
    System.out.println("worker: " + Thread.currentThread().getName());
}, "report-worker");

t.start();
System.out.println("main: " + Thread.currentThread().getName());
t.join();
```

### Expected Result

You should see both thread names print, and the order may change from run to run.

## Walkthrough

- `start()` creates a separate call stack
- the worker and main thread can print in either order
- `join()` keeps the main flow from exiting too early

## Mental Model

`start()` gives the task its own execution path. `run()` does not. If you want concurrency, the thread has to be started, not just called.

## Mistakes

- calling `run()` and expecting a new thread
- assuming print order proves thread order
- forgetting that shared state becomes the next problem after `start()`

## Tradeoffs

Raw `Thread` is the simplest way to learn the model, but it is not the best production orchestration tool. Executors and virtual threads reduce the amount of manual lifecycle code.

## Use / Avoid

### Use It When

- you want to learn how a new thread actually starts
- you need a tiny one-off concurrency demo
- you are about to learn executors or virtual threads

### Avoid It When

- production task orchestration needs clearer ownership
- you need a pool of managed tasks
- shared mutable state is already hard to reason about

## Practice

Replace `start()` with `run()`, rerun the example, and write down what changed.

## Summary

Key takeaway: `start()` creates a thread, `run()` does not. Once you see that difference, the rest of the chapter makes sense.
