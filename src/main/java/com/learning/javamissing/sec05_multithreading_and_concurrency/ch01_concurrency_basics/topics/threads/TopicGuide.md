---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## Why This Exists

Concept: start a new thread for a task that should run independently.

## The Pain Before It

```java
Thread t = new Thread(() -> System.out.println(Thread.currentThread().getName()));
t.run();
```

This looks like concurrency, but it still runs on the current thread.

## Java Creator Mindset

Use `start()` when you want the JVM to create a new execution path.

## How You Might Invent It

1. Create one task.
2. Run it with `run()` and notice that nothing new happens.
3. Replace `run()` with `start()` and compare the thread name.

## Naive Attempt

```java
Thread t = new Thread(() ->
    System.out.println("worker: " + Thread.currentThread().getName())
);
t.run();
```

`run()` is just a method call on the current thread.

## Why It Breaks

- the code stays on the caller thread
- the thread name does not change the way you expect
- there is no concurrency yet, so any later bug is hidden

## Final Java Solution

Use `start()` to launch a new thread, then `join()` when the main flow must wait for it.

## Code

```java
Thread t = new Thread(() -> {
    System.out.println("worker: " + Thread.currentThread().getName());
}, "report-worker");

t.start();
System.out.println("main: " + Thread.currentThread().getName());
t.join();
```

## Walkthrough

What happens:

- `start()` creates a new thread named `report-worker`
- the worker prints its own thread name
- the main thread keeps running until `join()` waits for the worker

Why it matters:

- `run()` does not create concurrency
- `start()` does
- thread order is not guaranteed, so the output can appear in a different order

## Mental Model

`start()` means "create a new place where this task can run." `run()` means "call this method here."

## Mistakes

- calling `run()` and expecting a new thread
- assuming print order proves thread order
- forgetting that the next problem is shared state, not thread creation

## Tradeoffs

Raw threads are the clearest way to see the model, but they are not the best way to manage many tasks in production.

## Use / Avoid

Use it when you need to understand how a thread begins. Avoid it when your goal is task orchestration instead of learning the base model.

## Practice

1. Replace `start()` with `run()` and note what changes.
2. Remove `join()` and observe whether the main flow can finish first.
3. Change the thread name and confirm the output uses it.

## Summary

Key takeaway: `start()` creates a new thread, `run()` does not.
