# Virtual Threads Learning Kit

## Why This Chapter Exists

This chapter is about one practical question: what changes when Java can afford a much cheaper thread-per-task model for waiting-heavy work?

## The Pain Before It

Traditional platform threads become expensive when you need huge numbers of tasks that mostly wait:

- remote service calls
- database waits
- socket waits
- file waits

Virtual threads help when the work is mostly waiting. They do not repair bad locking, CPU-heavy algorithms, or poor resource design.

## Java Creator Mindset

Read the chapter as a small set of related ideas around virtual Threads, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

- virtual threads are not “automatic performance mode”
- they do not make CPU-bound work faster
- they do not justify long blocking inside synchronized code

## Final Java Direction

Read the chapter as a small set of related ideas around virtual Threads, not as isolated trivia.

## Study Order

1. Run [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java)
2. Run [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java)
3. Run [Why Virtual Threads Matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java)

## What To Notice

- a virtual thread is still a `Thread`
- the coding style can stay direct and blocking
- the main win is the cost model for waiting-heavy tasks
- poor locking and poor design still hurt

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- virtual threads are not “automatic performance mode”
- they do not make CPU-bound work faster
- they do not justify long blocking inside synchronized code

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

### Use It When

- you are handling many blocking tasks
- callback-heavy code is hurting readability
- you want a clearer request-per-task style

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind virtual threads and connect them back to the runnable examples.

## Next Chapter

Move to [Structured Concurrency Learning Kit](../ch03_structured_concurrency/ChapterGuide.md) after this chapter.
