---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# ReentrantLock Vs Synchronized

## ReentrantLock Vs Synchronized

**Concept**

Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose. synchronized example = monitor-based mutual exclusion

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock lock = new ReentrantLock(true);
        CountDownLatch started = new CountDownLatch(1);

        Thread holder = new Thread(() -> {
            lock.lock();
            try {
                started.countDown();
                sleep(100);
            } finally {
                lock.unlock();
            }
        });

        Thread contender = new Thread(() -> {
            try {
                started.await();
                boolean acquired = lock.tryLock(30, TimeUnit.MILLISECONDS);
                System.out.println("tryLock acquired = " + acquired);
                if (acquired) {
                    lock.unlock();
                }
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        });

        holder.start();
        contender.start();
        holder.join();
        contender.join();

        synchronizedExample();
        System.out.println("Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

**Try this**

- synchronized example = monitor-based mutual exclusion
