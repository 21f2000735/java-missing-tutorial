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

Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

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

- Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

**What stays stable**

- Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

**Rule**

👉 Rule: Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.

**Try this**

- Why it matters: ReentrantLock adds timeout, fairness, and interruptible waiting that synchronized does not expose.
