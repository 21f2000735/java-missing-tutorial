# Virtual Threads Learning Kit

This chapter is about one practical question: what changes when Java can afford a much cheaper thread-per-task model for waiting-heavy work?

## The Problem

Traditional platform threads become expensive when you need huge numbers of tasks that mostly wait:

- remote service calls
- database waits
- socket waits
- file waits

Virtual threads help when the work is mostly waiting. They do not repair bad locking, CPU-heavy algorithms, or poor resource design.

## Run This First

1. Run [WhyVirtualThreadsMatter.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch02_virtual_threads/topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java)
2. Run [RunningTasksWithVirtualThreadExecutor.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch02_virtual_threads/topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java)
3. Run [AvoidingVirtualThreadMisuse.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch02_virtual_threads/topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java)

## What To Look For

- a virtual thread is still a `Thread`
- the coding style can stay direct and blocking
- the main win is the cost model for waiting-heavy tasks
- poor locking and poor design still hurt

## Use This Chapter When

- you are handling many blocking tasks
- callback-heavy code is hurting readability
- you want a clearer request-per-task style

## Avoid Wrong Expectations

- virtual threads are not “automatic performance mode”
- they do not make CPU-bound work faster
- they do not justify long blocking inside synchronized code

## Next Chapter

Move to `ch03_structured_concurrency` to see how related tasks should be owned, awaited, and cancelled together instead of just started cheaply.
