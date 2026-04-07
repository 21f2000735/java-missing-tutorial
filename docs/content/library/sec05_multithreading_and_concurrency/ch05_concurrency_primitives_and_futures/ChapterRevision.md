# Concurrency Primitives And Futures Revision Sheet

## Remember

- `volatile` helps visibility, not compound atomic updates
- `ReentrantLock` gives explicit lock control beyond `synchronized`
- `CountDownLatch` waits for tasks to finish
- `Semaphore` limits concurrent permits
- `CyclicBarrier` lets a group meet before continuing
- `CompletableFuture` composes async steps

## Interview Questions

1. What does `volatile` guarantee and what does it not guarantee?
2. When would you choose `ReentrantLock` over `synchronized`?
3. How do `CountDownLatch`, `Semaphore`, and `CyclicBarrier` differ?
