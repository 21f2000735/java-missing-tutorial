# Concurrency Basics Learning Kit

## Why This Chapter Exists

Concurrency becomes clear when you separate three questions: how work starts, how shared state stays correct, and who owns the worker lifecycle.

## The Pain Before It

As soon as two tasks overlap, the design has to answer three things:

- how work starts
- how you wait for it
- what happens when both tasks touch the same mutable state

## Java Creator Mindset

Make the safe path obvious: start work explicitly, protect shared state explicitly, and hand off worker management when the codebase grows.

## How You Might Invent It

1. Start with one task that runs on its own.
2. Share state and watch the bug appear.
3. Move coordination into a tool that owns the workers.

## Naive Attempt

Create a thread whenever you need work and let each task touch shared data directly.

## Why It Breaks

- `run()` does not create a new thread
- `count++` is not safe when two threads share the same field
- raw threads make ownership and cleanup hard to scale

## Final Java Direction

`Threads` shows how work starts, `Synchronization` shows how shared state stays correct, and `Executors` show how task submission and worker management separate cleanly.

## Study Order

1. Run [Executors](topics/executors/Executors.java)
2. Run [Synchronization](topics/synchronization/Synchronization.java)
3. Run [Threads](topics/threads/Threads.java)

## What To Notice

- `start()` creates a new thread while `run()` stays on the current one
- a tiny counter can still fail when two threads share it
- executors keep task code cleaner by owning worker reuse

## Mental Model

Think in layers: thread creation answers "how does work begin?", synchronization answers "how does shared state stay correct?", and executors answer "who manages the workers?"

## Common Mistakes

- treating concurrency as only "faster code"
- reading the API name without the ownership model
- expecting raw threads to solve shared-state problems automatically

## Tradeoffs

Raw threads are direct but fragile; synchronization protects correctness but adds coordination; executors improve structure but add an abstraction layer.

## Use / Avoid

### Use It When

- you need the foundation before virtual threads or structured concurrency
- you want to see how overlapping work actually fails
- you are deciding whether state should be shared at all

## Practice

Pick one topic in this chapter, change one line in its example, and write down what behavior changed and why.

## Summary

After this chapter, you should be able to explain how work starts, how shared state stays correct, and why executors are usually the cleaner production choice.

## Next Chapter

Move to [Virtual Threads Learning Kit](../ch02_virtual_threads/ChapterGuide.md) after this chapter.
