---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# ReentrantLock Vs Synchronized

## Why This Exists

Concept: ReentrantLock Vs Synchronized.

## The Pain Before It



## Java Creator Mindset

Make the rule behind reentrantlock vs synchronized obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use reentrantlock vs synchronized without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind reentrantlock vs synchronized, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind reentrantlock vs synchronized explicit and repeatable.

Run [ReentrantLockVsSynchronized.java](ReentrantLockVsSynchronized.java) as the source of truth for the example.

## Code

Run [ReentrantLockVsSynchronized.java](ReentrantLockVsSynchronized.java) and compare the output with the explanation below.

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

## Walkthrough

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

What to observe:

- Check whether the output matches the rule in the comment header.
- Check whether the edge case you changed still behaves as expected.

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading ReentrantLock Vs Synchronized as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ReentrantLockVsSynchronized.java](ReentrantLockVsSynchronized.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why ReentrantLock Vs Synchronized exists, what problem it solves, and what the runnable file proves.
