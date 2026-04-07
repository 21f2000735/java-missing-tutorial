# Concurrency Basics Learning Kit

This chapter exists for one reason: before virtual threads or modern APIs make sense, you need to understand what goes wrong when work overlaps in time.

## The Problem

As soon as two tasks run concurrently, three things become important:

- how work starts
- how you wait for it
- what happens when both tasks touch the same mutable state

If that model is unclear, every later concurrency feature feels like extra syntax instead of clearer design.

## Run This First

1. Run [Threads.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/threads/Threads.java)
2. Run [Synchronization.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/synchronization/Synchronization.java)
3. Run [Executors.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/executors/Executors.java)

## What To Look For

- `start()` and `run()` are not the same thing
- shared mutable state is where correctness starts to break
- executors improve structure by separating task submission from thread management

## Use This Chapter When

- you are new to Java concurrency
- concurrency still feels invisible or mysterious
- you need the foundation before learning virtual threads or structured concurrency

## Avoid Jumping Ahead When

- raw thread behavior is still unclear
- race conditions still feel theoretical instead of concrete

## Next Chapter

Move to `ch02_virtual_threads` after this chapter so you can compare “what a thread is” with “what changes when threads become much cheaper.”
