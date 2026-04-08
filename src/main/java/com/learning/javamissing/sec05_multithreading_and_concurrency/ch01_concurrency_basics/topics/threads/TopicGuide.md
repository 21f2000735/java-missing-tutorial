---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## Threads

**Concept**

Concurrency starts with one hard fact: two units of work can overlap in time.

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        exercise();
        solution();
    }
```

**What happens**

- worker thread: prepare report
- safe count = 2

**What stays stable**

- A thread is a unit of execution. Starting work and sharing state are separate concerns.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- It shows how independent work starts and why shared state becomes risky.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concurrency starts with one hard fact: two units of work can overlap in time.

**Rule**

👉 Rule: A thread is a unit of execution.

**Try this**

- Start one background task. 2. Wait with join() when you need the task finished. 3. Notice how shared mutable state changes the design problem.
